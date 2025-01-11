'worklet';

import type {MarkdownRange, MarkdownType} from './commonTypes';

class MarkdownRangeQueue {
  items: Record<number, MarkdownRange>;

  frontIndex: number;

  backIndex: number;

  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(item: MarkdownRange) {
    this.items[this.backIndex] = item;
    this.backIndex += 1;
  }

  dequeue() {
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex += 1;
    return item;
  }

  peek() {
    return this.items[this.frontIndex];
  }

  isEmpty() {
    return this.frontIndex === this.backIndex;
  }

  get printQueue() {
    return this.items;
  }
}

// getTagPriority returns a priority for a tag, higher priority means the tag should be processed first
function getTagPriority(tag: string) {
  switch (tag) {
    case 'blockquote':
      return 2;
    case 'h1':
      return 1;
    default:
      return 0;
  }
}

function sortRanges(ranges: MarkdownRange[]) {
  // sort ranges by start position, then by length, then by tag hierarchy
  return ranges.sort((a, b) => a.start - b.start || b.length - a.length || getTagPriority(b.type) - getTagPriority(a.type) || 0);
}

function groupRanges(ranges: MarkdownRange[]) {
  const lastVisibleRangeIndex: {[key in MarkdownType]?: number} = {};

  return ranges.reduce((acc, range) => {
    const start = range.start;
    const end = range.start + range.length;

    const rangeWithSameStyleIndex = lastVisibleRangeIndex[range.type];
    const sameStyleRange = rangeWithSameStyleIndex !== undefined ? acc[rangeWithSameStyleIndex] : undefined;

    if (sameStyleRange && sameStyleRange.start <= start && sameStyleRange.start + sameStyleRange.length >= end && range.length > 1) {
      // increment depth of overlapping range
      sameStyleRange.depth = (sameStyleRange.depth || 1) + 1;
    } else {
      lastVisibleRangeIndex[range.type] = acc.length;
      acc.push(range);
    }

    return acc;
  }, [] as MarkdownRange[]);
}

function ungroupRanges(ranges: MarkdownRange[]): MarkdownRange[] {
  const ungroupedRanges: MarkdownRange[] = [];
  ranges.forEach((range) => {
    if (!range.depth) {
      ungroupedRanges.push(range);
    }
    const {depth, ...rangeWithoutDepth} = range;
    Array.from({length: depth!}).forEach(() => {
      ungroupedRanges.push(rangeWithoutDepth);
    });
  });
  return ungroupedRanges;
}

function compareRanges(a: MarkdownRange | undefined, b: MarkdownRange | undefined) {
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  return a.start - b.start || b.length - a.length || getTagPriority(b.type) - getTagPriority(a.type) || 0;
}

function splitRangesOnEmojis(ranges: MarkdownRange[], type: MarkdownType): MarkdownRange[] {
  const emojiRanges: MarkdownRange[] = ranges.filter((range) => range.type === 'emoji');
  const newRanges: MarkdownRange[] = [];
  const queue = new MarkdownRangeQueue();

  let i = 0;
  let j = 0;
  while (i < ranges.length) {
    const currentRange = ranges[i];
    if (!currentRange) {
      break;
    }

    if (currentRange.type !== type) {
      if (queue.isEmpty() || compareRanges(currentRange, queue.peek()) < 0) {
        newRanges.push(currentRange);
        i++;
      } else {
        const newRange = queue.dequeue();
        if (newRange) {
          newRanges.push(newRange);
        }
      }
    } else {
      let firstTimeEntry = true;
      // Iterate through all emoji ranges before the end of the current range, splitting the current range at each intersection.
      while (j < emojiRanges.length) {
        const emojiRange = emojiRanges[j];
        if (!emojiRange || emojiRange.start > currentRange.start + currentRange.length) {
          break;
        }

        const currentStart: number = currentRange.start;
        const currentEnd: number = currentRange.start + currentRange.length;
        const emojiStart: number = emojiRange.start;
        const emojiEnd: number = emojiRange.start + emojiRange.length;

        if (emojiStart >= currentStart && emojiEnd <= currentEnd) {
          // Intersection
          const newRange: MarkdownRange = {
            type: currentRange.type,
            start: currentStart,
            length: emojiStart - currentStart,
            ...(currentRange?.depth && {depth: currentRange?.depth}),
          };

          currentRange.start = emojiEnd;
          currentRange.length = currentEnd - emojiEnd;

          if (newRange.length > 0) {
            if (firstTimeEntry) {
              while (!queue.isEmpty() && compareRanges(newRange, queue.peek()) >= 0) {
                const dequeuedRange = queue.dequeue();
                if (dequeuedRange) {
                  newRanges.push(dequeuedRange);
                }
              }
              newRanges.push(newRange);
            } else {
              queue.enqueue(newRange);
            }
          }
          firstTimeEntry = false;
        }
        j++;
      }

      if (currentRange.length > 0) {
        if (firstTimeEntry) {
          while (!queue.isEmpty() && compareRanges(currentRange, queue.peek()) >= 0) {
            const newRange = queue.dequeue();
            if (newRange) {
              newRanges.push(newRange);
            }
          }
          newRanges.push(currentRange);
        } else {
          queue.enqueue(currentRange);
        }
      }
      i++;
    }
  }
  while (!queue.isEmpty()) {
    const newRange = queue.dequeue();
    if (newRange) {
      newRanges.push(newRange);
    }
  }
  return newRanges;
}

export {sortRanges, groupRanges, ungroupRanges, splitRangesOnEmojis};
