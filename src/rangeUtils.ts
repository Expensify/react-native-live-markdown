'worklet';

import type {MarkdownRange, MarkdownType} from './commonTypes';

// getTagPriority returns a priority for a tag, higher priority means the tag should be processed first
function getTagPriority(tag: string) {
  switch (tag) {
    case 'blockquote':
      return 2;
    case 'h1':
      return 1;
    case 'emoji':
      return -1;
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

/**
 * Splits ranges of a specific type from being formatted by specified markdown types (e.g., 'emoji', 'syntax').
 * @param ranges - The array of MarkdownRange objects to process.
 * @param baseMarkdownType - The base markdown type to exclude formatting from (e.g., 'italic').
 * @param rangesToExclude - The array of MarkdownRange objects representing the ranges to exclude from formatting.
 */
function excludeRangeTypesFromFormatting(ranges: MarkdownRange[], baseMarkdownType: MarkdownType, rangesToExclude: MarkdownRange[]): MarkdownRange[] {
  const newRanges: MarkdownRange[] = [];

  let i = 0;
  let j = 0;
  while (i < ranges.length) {
    const currentRange = ranges[i];
    if (!currentRange) {
      break;
    }

    if (currentRange.type !== baseMarkdownType) {
      newRanges.push(currentRange);
      i++;
    } else {
      // Iterate through all emoji ranges before the end of the current range, splitting the current range at each intersection.
      while (j < rangesToExclude.length) {
        const excludeRange = rangesToExclude[j];
        if (!excludeRange || excludeRange.start > currentRange.start + currentRange.length) {
          break;
        }

        const currentStart: number = currentRange.start;
        const currentEnd: number = currentRange.start + currentRange.length;
        const excludeRangeStart: number = excludeRange.start;
        const excludeRangeEnd: number = excludeRange.start + excludeRange.length;

        if (excludeRangeStart >= currentStart && excludeRangeEnd <= currentEnd) {
          // Intersection
          const newRange: MarkdownRange = {
            type: currentRange.type,
            start: currentStart,
            length: excludeRangeStart - currentStart,
            ...(currentRange?.depth && {depth: currentRange?.depth}),
          };

          currentRange.start = excludeRangeEnd;
          currentRange.length = currentEnd - excludeRangeEnd;

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

export {sortRanges, groupRanges, ungroupRanges, excludeRangeTypesFromFormatting};
