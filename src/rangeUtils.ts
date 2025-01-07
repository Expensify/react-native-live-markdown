import type {MarkdownRange, MarkdownType} from './commonTypes';

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

export {sortRanges, groupRanges, ungroupRanges};
