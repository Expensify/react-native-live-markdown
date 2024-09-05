import type {MarkdownRange} from '../src/commonTypes';

export {};

declare global {
  // eslint-disable-next-line no-var
  var parseExpensiMarkToRanges: (markdown: string) => MarkdownRange[];
}
