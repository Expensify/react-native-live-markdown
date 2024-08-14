export {};

type MarkdownType =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'emoji'
  | 'mention-here'
  | 'mention-user'
  | 'mention-report'
  | 'link'
  | 'code'
  | 'pre'
  | 'blockquote'
  | 'h1'
  | 'syntax'
  | 'inline-image';

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
