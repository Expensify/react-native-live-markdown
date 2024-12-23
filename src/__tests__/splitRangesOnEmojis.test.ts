import type {MarkdownRange} from '../commonTypes';
import {splitRangesOnEmojis} from '../rangeUtils';

test('No Overlap', () => {
  const markdownRanges: MarkdownRange[] = [
    {type: 'strikethrough', start: 0, length: 10, depth: 1},
    {type: 'emoji', start: 12, length: 2, depth: 1},
  ];

  const splittedRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');
  expect(splittedRanges).toEqual([
    {type: 'strikethrough', start: 0, length: 10, depth: 1},
    {type: 'emoji', start: 12, length: 2, depth: 1},
  ]);
});

test('Overlap Different Type', () => {
  const markdownRanges: MarkdownRange[] = [
    {type: 'strikethrough', start: 0, length: 10, depth: 1},
    {type: 'emoji', start: 3, length: 4, depth: 1},
  ];

  const splittedRanges = splitRangesOnEmojis(markdownRanges, 'italic');
  expect(splittedRanges).toEqual(markdownRanges);
});

test('Single Overlap', () => {
  let markdownRanges: MarkdownRange[] = [
    {type: 'strikethrough', start: 0, length: 10, depth: 1},
    {type: 'emoji', start: 3, length: 4, depth: 1},
  ];

  markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');
  markdownRanges.sort((a, b) => a.start - b.start);

  expect(markdownRanges).toEqual([
    {type: 'strikethrough', start: 0, length: 3, depth: 1},
    {type: 'emoji', start: 3, length: 4, depth: 1},
    {type: 'strikethrough', start: 7, length: 3, depth: 1},
  ]);
});

test('Multiple Overlaps Multiple Types', () => {
  let markdownRanges: MarkdownRange[] = [
    {type: 'italic', start: 0, length: 20, depth: 1},
    {type: 'strikethrough', start: 2, length: 12, depth: 1},
    {type: 'emoji', start: 3, length: 1, depth: 1},
    {type: 'emoji', start: 8, length: 2, depth: 1},
    {type: 'strikethrough', start: 22, length: 5, depth: 1},
  ];

  markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');
  markdownRanges.sort((a, b) => a.start - b.start);

  expect(markdownRanges).toEqual([
    {type: 'italic', start: 0, length: 20, depth: 1},
    {type: 'strikethrough', start: 2, length: 1, depth: 1},
    {type: 'emoji', start: 3, length: 1, depth: 1},
    {type: 'strikethrough', start: 4, length: 4, depth: 1},
    {type: 'emoji', start: 8, length: 2, depth: 1},
    {type: 'strikethrough', start: 10, length: 4, depth: 1},
    {type: 'strikethrough', start: 22, length: 5, depth: 1},
  ]);
});
