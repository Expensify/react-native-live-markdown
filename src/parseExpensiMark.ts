'worklet';

import {Platform} from 'react-native';
import {ExpensiMark} from 'expensify-common';
import {unescapeText} from 'expensify-common/dist/utils';
import {decode} from 'html-entities';
import type {WorkletFunction} from 'react-native-reanimated/lib/typescript/commonTypes';
import type {MarkdownType, MarkdownRange} from './commonTypes';
import {groupRanges, sortRanges, splitRangesOnEmojis} from './rangeUtils';

function isWeb() {
  return Platform.OS === 'web';
}

function isJest() {
  return !!global.process.env.JEST_WORKER_ID;
}

// eslint-disable-next-line no-underscore-dangle
if (__DEV__ && !isWeb() && !isJest() && (decode as WorkletFunction).__workletHash === undefined) {
  throw new Error(
    "[react-native-live-markdown] `parseExpensiMark` requires `html-entities` package to be workletized. Please add `'worklet';` directive at the top of `node_modules/html-entities/lib/index.js` using patch-package.",
  );
}

const MAX_PARSABLE_LENGTH = 4000;

type Token = ['TEXT' | 'HTML', string];
type StackItem = {tag: string; children: Array<StackItem | string>};

function parseMarkdownToHTML(markdown: string): string {
  const parser = new ExpensiMark();
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
      throw new Error('[react-native-live-markdown] Error in function parseHTMLToTokens: Invalid HTML: no matching ">"');
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
      const text = unescapeText(payload);
      const top = stack[stack.length - 1];
      top!.children.push(text);
    } else if (type === 'HTML') {
      if (payload.startsWith('</')) {
        // closing tag
        const child = stack.pop();
        const top = stack[stack.length - 1];
        top!.children.push(child!);
      } else if (payload.endsWith('/>')) {
        // self-closing tag
        const top = stack[stack.length - 1];
        top!.children.push({tag: payload, children: []});
      } else {
        // opening tag
        stack.push({tag: payload, children: []});
      }
    } else {
      throw new Error(
        `[react-native-live-markdown] Error in function parseTokensToTree: Unknown token type: ${type as string}. Expected 'TEXT' or 'HTML'. Please ensure tokens only contain these types.`,
      );
    }
  });
  if (stack.length !== 1) {
    const unclosedTags =
      stack.length > 0
        ? stack
            .slice(1)
            .map((item) => item.tag)
            .join(', ')
        : '';
    throw new Error(
      `[react-native-live-markdown] Invalid HTML structure: the following tags are not properly closed: ${unclosedTags}. Ensure each opening tag has a corresponding closing tag.`,
    );
  }
  return stack[0]!;
}

function parseTreeToTextAndRanges(tree: StackItem): [string, MarkdownRange[]] {
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

  function addChildrenWithStyle(node: StackItem | string, type: MarkdownType) {
    const start = text.length;
    processChildren(node);
    const end = text.length;
    ranges.push({type, start, length: end - start});
  }

  const ranges: MarkdownRange[] = [];
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
      } else if (node.tag === '<emoji>') {
        addChildrenWithStyle(node, 'emoji');
      } else if (node.tag === '<code>') {
        appendSyntax('`');
        addChildrenWithStyle(node, 'code');
        appendSyntax('`');
      } else if (node.tag === '<mention-here>') {
        addChildrenWithStyle(node, 'mention-here');
      } else if (node.tag === '<mention-user>') {
        addChildrenWithStyle(node, 'mention-user');
      } else if (node.tag === '<mention-short>') {
        addChildrenWithStyle(node, 'mention-short');
      } else if (node.tag === '<mention-report>') {
        addChildrenWithStyle(node, 'mention-report');
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
      } else if (node.tag === '<br />') {
        text += '\n';
      } else if (node.tag.startsWith('<pre')) {
        appendSyntax('```');
        const content = node.children.join('');
        addChildrenWithStyle(content, 'pre');
        appendSyntax('```');
      } else if (node.tag.startsWith('<a href="')) {
        const rawHref = node.tag.match(/href="([^"]*)"/)![1]!; // always present
        const href = unescapeText(rawHref);
        const isLabeledLink = node.tag.match(/data-link-variant="([^"]*)"/)![1] === 'labeled';
        const dataRawHref = node.tag.match(/data-raw-href="([^"]*)"/);
        const matchString = dataRawHref ? unescapeText(dataRawHref[1]!) : href;
        if (!isLabeledLink && node.children.length === 1 && typeof node.children[0] === 'string' && (node.children[0] === matchString || `mailto:${node.children[0]}` === href)) {
          addChildrenWithStyle(node.children[0], 'link');
        } else {
          appendSyntax('[');
          processChildren(node);
          appendSyntax('](');
          addChildrenWithStyle(matchString, 'link');
          appendSyntax(')');
        }
      } else if (node.tag.startsWith('<img src="')) {
        const src = node.tag.match(/src="([^"]*)"/)![1]!; // always present
        const alt = node.tag.match(/alt="([^"]*)"/);
        const hasAlt = node.tag.match(/data-link-variant="([^"]*)"/)![1] === 'labeled';
        const rawLink = node.tag.match(/data-raw-href="([^"]*)"/);
        const linkString = rawLink ? unescapeText(rawLink[1]!) : src;

        const start = text.length;
        const length = 3 + (hasAlt ? 2 + unescapeText(alt?.[1] || '').length : 0) + linkString.length;
        ranges.push({type: 'inline-image', start, length});

        appendSyntax('!');
        if (hasAlt) {
          appendSyntax('[');
          processChildren(unescapeText(alt?.[1] || ''));
          appendSyntax(']');
        }
        appendSyntax('(');
        addChildrenWithStyle(linkString, 'link');
        appendSyntax(')');
      } else if (node.tag.startsWith('<video data-expensify-source="')) {
        const src = node.tag.match(/data-expensify-source="([^"]*)"/)![1]!; // always present
        const rawLink = node.tag.match(/data-raw-href="([^"]*)"/);
        const hasAlt = node.tag.match(/data-link-variant="([^"]*)"/)![1] === 'labeled';
        const linkString = rawLink ? unescapeText(rawLink[1]!) : src;
        appendSyntax('!');
        if (hasAlt) {
          appendSyntax('[');
          node.children.forEach((child) => processChildren(child));
          appendSyntax(']');
        }
        appendSyntax('(');
        addChildrenWithStyle(linkString, 'link');
        appendSyntax(')');
      } else {
        throw new Error(`[react-native-live-markdown] Error in function parseTreeToTextAndRanges: Unknown tag '${node.tag}'. This tag is not supported in this function's logic.`);
      }
    }
  }
  dfs(tree);
  return [text, ranges];
}

const isAndroid = Platform.OS === 'android';

function parseExpensiMark(markdown: string): MarkdownRange[] {
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
  if (isAndroid) {
    // Blocks applying italic and strikethrough styles to emojis on Android
    // TODO: Remove this condition when splitting emojis inside the inline code block will be fixed on the web
    markdownRanges = splitRangesOnEmojis(markdownRanges, 'italic');
    markdownRanges = splitRangesOnEmojis(markdownRanges, 'strikethrough');
  }

  const groupedRanges = groupRanges(markdownRanges);
  return groupedRanges;
}

export default parseExpensiMark;
