import type {MarkdownRange} from '../commonTypes';
import {excludeRangeTypesFromFormatting, getRangesToExcludeFormatting} from '../rangeUtils';

const sortRanges = (ranges: MarkdownRange[]) => {
  return ranges.sort((a, b) => a.start - b.start);
};

test('no overlap', () => {
  const markdownRanges: MarkdownRange[] = [
    {type: 'strikethrough', start: 0, length: 10},
    {type: 'emoji', start: 12, length: 2},
  ];

  const splittedRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
  expect(splittedRanges).toEqual([
    {type: 'strikethrough', start: 0, length: 10},
    {type: 'emoji', start: 12, length: 2},
  ]);
});

test('overlap different type', () => {
  const markdownRanges: MarkdownRange[] = [
    {type: 'strikethrough', start: 0, length: 10},
    {type: 'emoji', start: 3, length: 4},
  ];

  const splittedRanges = excludeRangeTypesFromFormatting(markdownRanges, 'italic', getRangesToExcludeFormatting(markdownRanges));
  expect(splittedRanges).toEqual(markdownRanges);
});

describe('single overlap', () => {
  test('emoji at the beginning', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'strikethrough', start: 0, length: 10},
      {type: 'emoji', start: 0, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'emoji', start: 0, length: 2},
      {type: 'strikethrough', start: 2, length: 8},
    ]);
  });

  test('emoji in the middle', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'strikethrough', start: 0, length: 10},
      {type: 'emoji', start: 3, length: 4},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'strikethrough', start: 0, length: 3},
      {type: 'emoji', start: 3, length: 4},
      {type: 'strikethrough', start: 7, length: 3},
    ]);
  });

  test('emoji at the end', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'strikethrough', start: 0, length: 10},
      {type: 'emoji', start: 8, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'strikethrough', start: 0, length: 8},
      {type: 'emoji', start: 8, length: 2},
    ]);
  });

  test('multiple emojis in the middle', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'strikethrough', start: 0, length: 10},
      {type: 'emoji', start: 3, length: 2},
      {type: 'emoji', start: 5, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'strikethrough', start: 0, length: 3},
      {type: 'emoji', start: 3, length: 2},
      {type: 'emoji', start: 5, length: 2},
      {type: 'strikethrough', start: 7, length: 3},
    ]);
  });

  test('just emojis', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'strikethrough', start: 0, length: 6},
      {type: 'emoji', start: 0, length: 2},
      {type: 'emoji', start: 2, length: 2},
      {type: 'emoji', start: 4, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));

    expect(markdownRanges).toEqual([
      {type: 'emoji', start: 0, length: 2},
      {type: 'emoji', start: 2, length: 2},
      {type: 'emoji', start: 4, length: 2},
    ]);
  });

  test('bold with emoji in the middle', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'bold', start: 0, length: 10},
      {type: 'emoji', start: 3, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'bold', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'bold', start: 0, length: 3},
      {type: 'emoji', start: 3, length: 2},
      {type: 'bold', start: 5, length: 5},
    ]);
  });

  test('bold with multiple emojis', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'bold', start: 0, length: 10},
      {type: 'emoji', start: 2, length: 2},
      {type: 'emoji', start: 6, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'bold', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'bold', start: 0, length: 2},
      {type: 'emoji', start: 2, length: 2},
      {type: 'bold', start: 4, length: 2},
      {type: 'emoji', start: 6, length: 2},
      {type: 'bold', start: 8, length: 2},
    ]);
  });
});

describe('multiple overlaps', () => {
  test('splitting on one type', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'italic', start: 0, length: 20},
      {type: 'strikethrough', start: 2, length: 12},
      {type: 'emoji', start: 3, length: 1},
      {type: 'emoji', start: 8, length: 2},
      {type: 'strikethrough', start: 22, length: 5},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'italic', start: 0, length: 20},
      {type: 'strikethrough', start: 2, length: 1},
      {type: 'emoji', start: 3, length: 1},
      {type: 'strikethrough', start: 4, length: 4},
      {type: 'emoji', start: 8, length: 2},
      {type: 'strikethrough', start: 10, length: 4},
      {type: 'strikethrough', start: 22, length: 5},
    ]);
  });

  test('splitting on two types', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'italic', start: 0, length: 20},
      {type: 'strikethrough', start: 2, length: 12},
      {type: 'emoji', start: 3, length: 1},
      {type: 'emoji', start: 8, length: 2},
      {type: 'strikethrough', start: 22, length: 5},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'italic', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'italic', start: 0, length: 3},
      {type: 'strikethrough', start: 2, length: 1},
      {type: 'emoji', start: 3, length: 1},
      {type: 'italic', start: 4, length: 4},
      {type: 'strikethrough', start: 4, length: 4},
      {type: 'emoji', start: 8, length: 2},
      {type: 'italic', start: 10, length: 10},
      {type: 'strikethrough', start: 10, length: 4},
      {type: 'strikethrough', start: 22, length: 5},
    ]);
  });

  test('splitting on three types', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'italic', start: 0, length: 20},
      {type: 'bold', start: 2, length: 12},
      {type: 'strikethrough', start: 4, length: 8},
      {type: 'emoji', start: 6, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'italic', getRangesToExcludeFormatting(markdownRanges));
    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'bold', getRangesToExcludeFormatting(markdownRanges));
    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'italic', start: 0, length: 6},
      {type: 'bold', start: 2, length: 4},
      {type: 'strikethrough', start: 4, length: 2},
      {type: 'emoji', start: 6, length: 2},
      {type: 'italic', start: 8, length: 12},
      {type: 'bold', start: 8, length: 6},
      {type: 'strikethrough', start: 8, length: 4},
    ]);
  });

  test('nested ranges with emoji', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'italic', start: 1, length: 15},
      {type: 'bold', start: 5, length: 7},
      {type: 'emoji', start: 10, length: 2},
    ];

    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'italic', getRangesToExcludeFormatting(markdownRanges));
    markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'bold', getRangesToExcludeFormatting(markdownRanges));
    sortRanges(markdownRanges);

    expect(markdownRanges).toEqual([
      {type: 'italic', start: 1, length: 9},
      {type: 'bold', start: 5, length: 5},
      {type: 'emoji', start: 10, length: 2},
      {type: 'italic', start: 12, length: 4},
    ]);
  });
});
