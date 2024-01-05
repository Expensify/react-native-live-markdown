export {};

type Range = [string, number, number];

declare global {
  // eslint-disable-next-line no-var
  var parseMarkdownToTextAndRanges: (markdown: string) => [string, Range[]];
}
