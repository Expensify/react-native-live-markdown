import type {MarkdownRange, MarkdownType} from './commonTypes';

function splitRangesOnEmojis(ranges: MarkdownRange[], type: MarkdownType): MarkdownRange[] {
  const emojiRanges: MarkdownRange[] = ranges.filter((range) => range.type === 'emoji');
  const newRanges: MarkdownRange[] = [];

  let i = 0;
  let j = 0;
  while (i < ranges.length) {
    const currentRange = ranges[i];
    if (!currentRange) {
      break;
    }

    if (currentRange.type !== type) {
      newRanges.push(currentRange);
      i++;
    } else {
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
            newRanges.push(newRange);
          }
        }
        j++;
      }

      if (currentRange.length > 0) {
        newRanges.push(currentRange);
      }
      i++;
    }
  }
  return newRanges;
}

// eslint-disable-next-line import/prefer-default-export
export {splitRangesOnEmojis};
