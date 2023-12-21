export {};

type Range = [string, number, number];

declare global {
  var parseMarkdownToTextAndRanges: (markdown: string) => [string, Range[]];
}
