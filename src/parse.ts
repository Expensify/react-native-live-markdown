import type {MarkdownRange} from './commonTypes';
import {groupRanges, sortRanges, excludeRangeTypesFromFormatting, getRangesToExcludeFormatting} from './rangeUtils';
import {parseMarkdownToHTML, parseHTMLToTokens, parseTokensToTree, parseTreeToTextAndRanges} from './parseExpensiMark';

const MAX_PARSABLE_LENGTH = 4000;

function parseExpensiMark(markdown: string): MarkdownRange[] {
  'worklet';

  if (markdown.length > MAX_PARSABLE_LENGTH) {
    return [];
  }
  const html = parseMarkdownToHTML(markdown);
  const tokens = parseHTMLToTokens(html);
  const tree = parseTokensToTree(tokens);
  const [text, ranges] = parseTreeToTextAndRanges(tree);
  if (text !== markdown) {
    console.error(
      `[react-native-live-markdown] Parsing error: the processed text does not match the original Markdown input. This may be caused by incorrect parsing functions or invalid input Markdown.\nProcessed input: '${JSON.stringify(
        text,
      )}'\nOriginal input: '${JSON.stringify(markdown)}'`,
    );
    return [];
  }
  let markdownRanges = sortRanges(ranges);

  // Prevent italic, bold and strikethrough formatting inside emojis and inline code blocks
  const rangesToExclude = getRangesToExcludeFormatting(markdownRanges);
  markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'italic', rangesToExclude);
  markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'bold', rangesToExclude);
  markdownRanges = excludeRangeTypesFromFormatting(markdownRanges, 'strikethrough', rangesToExclude);

  const groupedRanges = groupRanges(markdownRanges);
  return groupedRanges;
}

export default parseExpensiMark;
