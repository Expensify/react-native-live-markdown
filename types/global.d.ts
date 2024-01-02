export {};

type Range = [string, number, number]; // style, location, length

declare global {
  var parseMarkdownToTextAndRanges: (markdown: string) => Range[];
}
