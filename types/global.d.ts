export {};

type MarkdownType = 'bold' | 'italic' | 'strikethrough' | 'emoji' | 'mention-here' | 'mention-user' | 'link' | 'code' | 'pre' | 'blockquote' | 'h1' | 'syntax';

type Range = {
  type: MarkdownType;
  start: number;
  length: number;
  depth?: number;
};

declare global {
  // eslint-disable-next-line no-var
  var parseExpensiMarkToRanges: (markdown: string) => Range[];
}
