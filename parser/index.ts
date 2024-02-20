// @ts-expect-error - to review how it's implemented in ExpensiMark
// eslint-disable-next-line import/no-unresolved
import {ExpensiMark} from 'expensify-common/lib/ExpensiMark';
import _ from 'underscore';

// type Range = [string, number, number];
type Range = {
  style: string;
  start: number;
  length: number;
  depth?: number;
};
type Token = ['TEXT' | 'HTML', string, number?];
type StackItem = {tag: string; children: Array<StackItem | string>};

function parseMarkdownToHTML(markdown: string): string {
  const parser = ExpensiMark;
  const html = parser.replace(markdown, {
    shouldKeepRawInput: true,
  });
  return html as string;
}

function parseHTMLToTokens(html: string): Token[] {
  const tokens: Token[] = [];
  let left = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const open = html.indexOf('<', left);
    if (open === -1) {
      if (left < html.length) {
        tokens.push(['TEXT', html.substring(left)]);
      }
      break;
    }
    if (open !== left) {
      tokens.push(['TEXT', html.substring(left, open)]);
    }
    const close = html.indexOf('>', open);
    if (close === -1) {
      throw new Error('Invalid HTML: no matching ">"');
    }
    tokens.push(['HTML', html.substring(open, close + 1)]);
    left = close + 1;
  }
  return tokens;
}

function parseTokensToTree(tokens: Token[]): StackItem {
  const stack: StackItem[] = [{tag: '<>', children: []}];
  tokens.forEach(([type, payload]) => {
    if (type === 'TEXT') {
      const text = _.unescape(payload);
      const top = stack[stack.length - 1];
      top!.children.push(text);
    } else if (type === 'HTML') {
      if (payload.startsWith('</')) {
        // closing tag
        const child = stack.pop();
        const top = stack[stack.length - 1];
        top!.children.push(child!);
      } else {
        // opening tag
        stack.push({tag: payload, children: []});
      }
    } else {
      throw new Error(`Unknown token type: ${type as string}`);
    }
  });
  if (stack.length !== 1) {
    throw new Error('Invalid HTML: unclosed tags');
  }
  return stack[0]!;
}

function parseTreeToTextAndRanges(tree: StackItem): [string, Range[]] {
  let text = '';

  function processChildren(node: StackItem | string) {
    if (typeof node === 'string') {
      text += node;
    } else {
      node.children.forEach(dfs);
    }
  }

  function appendSyntax(syntax: string) {
    addChildrenWithStyle(syntax, 'syntax');
  }

  function addChildrenWithStyle(node: StackItem | string, style: string) {
    const start = text.length;
    processChildren(node);
    const end = text.length;
    ranges.push({style, start, length: end - start});
  }

  const ranges: Range[] = [];
  function dfs(node: StackItem | string) {
    if (typeof node === 'string') {
      text += node;
    } else {
      // eslint-disable-next-line no-lonely-if
      if (node.tag === '<>') {
        processChildren(node);
      } else if (node.tag === '<strong>') {
        appendSyntax('*');
        addChildrenWithStyle(node, 'bold');
        appendSyntax('*');
      } else if (node.tag === '<em>') {
        appendSyntax('_');
        addChildrenWithStyle(node, 'italic');
        appendSyntax('_');
      } else if (node.tag === '<del>') {
        appendSyntax('~');
        addChildrenWithStyle(node, 'strikethrough');
        appendSyntax('~');
      } else if (node.tag === '<code>') {
        appendSyntax('`');
        addChildrenWithStyle(node, 'code');
        appendSyntax('`');
      } else if (node.tag === '<mention-here>') {
        addChildrenWithStyle(node, 'mention-here');
      } else if (node.tag === '<mention-user>') {
        addChildrenWithStyle(node, 'mention-user');
      } else if (node.tag === '<blockquote>') {
        appendSyntax('>');
        addChildrenWithStyle(node, 'blockquote');
        // compensate for "> " at the beginning
        if (ranges.length > 0) {
          const curr = ranges[ranges.length - 1];
          curr!.start -= 1;
          curr!.length += 1;
        }
      } else if (node.tag === '<h1>') {
        appendSyntax('# ');
        addChildrenWithStyle(node, 'h1');
      } else if (node.tag.startsWith('<pre')) {
        const content = _.unescape(node.tag.match(/data-code-raw="([^"]*)"/)![1]!); // always present

        appendSyntax('```');
        addChildrenWithStyle(content, 'pre');
        appendSyntax('```');
      } else if (node.tag.startsWith('<a href="')) {
        const rawHref = node.tag.match(/href="([^"]*)"/)![1]!; // always present
        const href = _.unescape(rawHref);
        const isLabeledLink = node.tag.match(/link-variant="([^"]*)"/)![1] === 'labeled';
        const dataRawHref = node.tag.match(/data-raw-href="([^"]*)"/);
        const matchString = dataRawHref ? _.unescape(dataRawHref[1]!) : href;
        if (!isLabeledLink && node.children.length === 1 && typeof node.children[0] === 'string' && (node.children[0] === matchString || `mailto:${node.children[0]}` === href)) {
          addChildrenWithStyle(node.children[0], 'link');
        } else {
          appendSyntax('[');
          processChildren(node);
          appendSyntax('](');
          addChildrenWithStyle(matchString, 'link');
          appendSyntax(')');
        }
      } else {
        throw new Error(`Unknown tag: {node.tag}`);
      }
    }
  }
  dfs(tree);
  return [text, ranges];
}

// getTagPriority returns a priority for a tag, higher priority means the tag should be processed first
function getTagPriority(tag: string) {
  switch (tag) {
    case 'blockquote':
      return 2;
    case 'h1':
      return 1;
    default:
      return 0;
  }
}

function sortRanges(ranges: Range[]) {
  // sort ranges by start position, then by length, then by tag hierarchy
  return ranges.sort((a, b) => a.start - b.start || b.length - a.length || getTagPriority(b.style) - getTagPriority(a.style) || 0);
}

function groupRanges(ranges: Range[]) {
  return ranges.reduce((acc, range) => {
    const start = range.start;
    const end = range.start + range.length;

    const lastRangeWithSameStyle = acc.findLast((r) => r.style === range.style);

    // Perform necessary operations with 'start', 'end', and 'last'
    if (lastRangeWithSameStyle && lastRangeWithSameStyle.start <= start && lastRangeWithSameStyle.start + lastRangeWithSameStyle.length <= end && range.length > 1) {
      // increment depth of overlapping range
      lastRangeWithSameStyle.depth = (lastRangeWithSameStyle.depth || 1) + 1;
    } else {
      acc.push(range);
    }

    return acc; // Return the updated accumulator
  }, [] as Range[]);
}

function parseExpensiMarkToRanges(markdown: string): Range[] {
  const html = parseMarkdownToHTML(markdown);
  const tokens = parseHTMLToTokens(html);
  const tree = parseTokensToTree(tokens);
  const [text, ranges] = parseTreeToTextAndRanges(tree);
  if (text !== markdown) {
    // text mismatch, don't return any ranges
    return [];
  }
  const sortedRanges = sortRanges(ranges);
  const gruppedRanges = groupRanges(sortedRanges);
  return gruppedRanges;
}

globalThis.parseExpensiMarkToRanges = parseExpensiMarkToRanges;
