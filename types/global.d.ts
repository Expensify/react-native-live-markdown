export {};

type Range = [string, number, number]; // style, location, length

declare global {
  // eslint-disable-next-line no-var
  var parseExpensiMarkToRanges: (markdown: string) => Range[];
}
