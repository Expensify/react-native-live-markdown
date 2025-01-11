import type {MarkdownRange} from '../commonTypes';
import {splitRangesOnEmojis} from '../rangeUtils';

test('no overlap', () => {
  const markdownRanges: MarkdownRange[] = [
    {type: 'strikethrough', start: 0, length: 10},
    {type: 'emoji', start: 12, length: 2},
  ];

  const splittedRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');
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

  const splittedRanges = splitRangesOnEmojis(markdownRanges, 'italic');
  expect(splittedRanges).toEqual(markdownRanges);
});

test('overlap with bold and emoji type', () => {
  const markdownRanges: MarkdownRange[] = [
    {type: 'syntax', start: 0, length: 1},
    {type: 'italic', start: 1, length: 4},
    {type: 'syntax', start: 1, length: 1},
    {type: 'bold', start: 2, length: 2},
    {type: 'emoji', start: 2, length: 2},
    {type: 'syntax', start: 4, length: 1},
    {type: 'syntax', start: 5, length: 1},
  ];

  const expectedResult = [
    {type: 'syntax', start: 0, length: 1},
    {type: 'italic', start: 1, length: 1},
    {type: 'syntax', start: 1, length: 1},
    {type: 'bold', start: 2, length: 2},
    {type: 'emoji', start: 2, length: 2},
    {type: 'italic', start: 4, length: 1},
    {type: 'syntax', start: 4, length: 1},
    {type: 'syntax', start: 5, length: 1},
  ];

  const splittedRanges = splitRangesOnEmojis(markdownRanges, 'italic');
  expect(splittedRanges).toEqual(expectedResult);
});

describe('single overlap', () => {
  test('emoji at the beginning', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'strikethrough', start: 0, length: 10},
      {type: 'emoji', start: 0, length: 2},
    ];

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');

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

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');

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

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');

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

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');

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

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');

    expect(markdownRanges).toEqual([
      {type: 'emoji', start: 0, length: 2},
      {type: 'emoji', start: 2, length: 2},
      {type: 'emoji', start: 4, length: 2},
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

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');

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

  test('splitting on one type back to back', () => {
    let markdownRanges: MarkdownRange[] = [
      {type: 'italic', start: 0, length: 20},
      {type: 'strikethrough', start: 2, length: 12},
      {type: 'emoji', start: 3, length: 1},
      {type: 'emoji', start: 8, length: 2},
      {type: 'strikethrough', start: 16, length: 5},
      {type: 'emoji', start: 17, length: 1},
      {type: 'emoji', start: 19, length: 1},
      {type: 'strikethrough', start: 22, length: 5},
    ];

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');

    expect(markdownRanges).toEqual([
      {type: 'italic', start: 0, length: 20},
      {type: 'strikethrough', start: 2, length: 1},
      {type: 'emoji', start: 3, length: 1},
      {type: 'strikethrough', start: 4, length: 4},
      {type: 'emoji', start: 8, length: 2},
      {type: 'strikethrough', start: 10, length: 4},
      {type: 'strikethrough', start: 16, length: 1},
      {type: 'emoji', start: 17, length: 1},
      {type: 'strikethrough', start: 18, length: 1},
      {type: 'emoji', start: 19, length: 1},
      {type: 'strikethrough', start: 20, length: 1},
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

    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');
    markdownRanges = splitRangesOnEmojis(markdownRanges, 'italic');

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
});
