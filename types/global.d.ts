export {};

type Range = {
  style: string;
  start: number;
  length: number;
  depth?: number;
}; // style, location, length

declare global {
  // eslint-disable-next-line no-var
  var parseExpensiMarkToRanges: (markdown: string) => Range[];
}
