import type {MarkdownRange} from '../commonTypes';
import {normalizeLines} from '../web/utils/parserUtils';
import type {Paragraph} from '../web/utils/parserUtils';

describe('normalizeLines', () => {
  it('should handle single line markdown with no multi-line ranges', () => {
    const lines: Paragraph[] = [
      {
        text: '*Hello, world!*',
        start: 0,
        length: 13,
        markdownRanges: [],
      },
    ];

    const ranges: MarkdownRange[] = [
      {
        type: 'syntax',
        start: 0,
        length: 1,
      },
      {
        type: 'bold',
        start: 1,
        length: 11,
      },
      {
        type: 'syntax',
        start: 12,
        length: 1,
      },
    ];

    const result = normalizeLines(lines, ranges);
    const paragraph = result[0] as Paragraph;
    expect(paragraph.markdownRanges).toEqual([
      {length: 1, start: 0, type: 'syntax'},
      {length: 11, start: 1, type: 'bold'},
      {length: 1, start: 12, type: 'syntax'},
    ]);
    expect(paragraph.text).toEqual('*Hello, world!*');
  });

  it('should handle multiline line markdown with no multi-line ranges', () => {
    const lines: Paragraph[] = [
      {
        text: '*Hello',
        start: 0,
        length: 6,
        markdownRanges: [],
      },
      {
        text: 'world!*',
        start: 7,
        length: 7,
        markdownRanges: [],
      },
    ];

    const ranges: MarkdownRange[] = [
      {
        type: 'syntax',
        start: 0,
        length: 1,
      },
      {
        type: 'bold',
        start: 0,
        length: 13,
      },
      {
        type: 'syntax',
        start: 13,
        length: 1,
      },
    ];

    const result = normalizeLines(lines, ranges);
    expect(result.length).toBe(2);
    const firstParagraph = result[0] as Paragraph;
    const secondParagraph = result[1] as Paragraph;
    expect(firstParagraph.text).toEqual('*Hello');
    expect(secondParagraph.text).toEqual('world!*');
    expect(firstParagraph.markdownRanges).toContainEqual({type: 'bold', start: 0, length: 6});
    expect(secondParagraph.markdownRanges).toContainEqual({type: 'bold', start: 7, length: 6});
  });

  it('should merge lines when handling multi-line markdown ranges', () => {
    const lines: Paragraph[] = [
      {
        text: 'Here is some code:',
        start: 0,
        length: 18,
        markdownRanges: [],
      },
      {
        text: '```',
        start: 19,
        length: 3,
        markdownRanges: [],
      },
      {
        text: "const text = 'Hello, World!';",
        start: 23,
        length: 29,
        markdownRanges: [],
      },
      {
        text: 'console.log(text);',
        start: 53,
        length: 18,
        markdownRanges: [],
      },
      {
        text: '```',
        start: 72,
        length: 3,
        markdownRanges: [],
      },
    ];

    const ranges: MarkdownRange[] = [
      {
        type: 'syntax',
        start: 19,
        length: 3,
      },
      {
        type: 'pre',
        start: 22,
        length: 50, // This range spans across multiple lines
      },
      {
        type: 'syntax',
        start: 72,
        length: 3,
      },
    ];

    const result = normalizeLines(lines, ranges);

    expect(result.length).toBe(2);
    const paragraph = result[1] as Paragraph;
    expect(paragraph.text).toEqual("```\nconst text = 'Hello, World!';\nconsole.log(text);\n```");
    expect(paragraph.markdownRanges.length).toEqual(3);
    expect((paragraph.markdownRanges[1] as MarkdownRange).type).toEqual('pre');
  });

  it('should correctly handle multiple adjacent ranges', () => {
    const lines: Paragraph[] = [
      {
        text: 'Link: www.example.com',
        start: 0,
        length: 21,
        markdownRanges: [],
      },
    ];

    const ranges: MarkdownRange[] = [{type: 'link', start: 6, length: 15}];

    const result = normalizeLines(lines, ranges);
    const paragraph = result[0] as Paragraph;
    expect(paragraph.markdownRanges).toContainEqual({type: 'link', start: 6, length: 15});
  });
});
