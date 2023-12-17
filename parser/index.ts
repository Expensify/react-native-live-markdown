import ExpensiMark from 'expensify-common/lib/ExpensiMark';
import _ from 'underscore';
import type { ReactNode } from 'react';

type Token = [string, string];

function parseMarkdownToHTML(markdown: string): string {
  const parser = new ExpensiMark;
  const html = parser.replace(markdown, {
    // TODO ask Tomek about it
    // @ts-ignore
    shouldKeepWhitespace: true,
  });
  return html;
}

function parseHTMLToTokens(html: string): Token[] {
  const tokens: Token[] = [];
  let left = 0;
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

type StackItem = {tag: string, children: Array<string | StackItem>};

function parseTokensToTree(tokens: Token[]): StackItem | undefined {
  const stack: StackItem[] = [{ tag: '<>', children: [] }];
  tokens.forEach(([type, payload]) => {
    if (type === 'TEXT') {
      const text = _.unescape(payload);
      const top = stack[stack.length - 1];
      if (top) top.children.push(text);
    } else if (type === 'HTML') {
      if (payload.startsWith('</')) {
        // closing tag
        const child = stack.pop();
        const top = stack[stack.length - 1];
        if (top && child) top.children.push(child);
      } else {
        // opening tag
        stack.push({ tag: payload, children: [] });
      }
    } else {
      throw new Error(`Unknown token type: ${type}`);
    }
  });
  if (stack.length !== 1) {
    throw new Error('Invalid HTML: unclosed tags');
  }
  return stack[0];
}

type Range = [string, number, number];

function parseTreeToTextAndRanges(tree: StackItem): [string, Range[]] {
  let text = '';

  function processChildren(node: ReactNode) {
    if (typeof node === 'string') {
      text += node;
    } else {
      // TODO - figure out a way to have the same type for all nodes in this file
      node.children.forEach(dfs);
    }
  }

  function appendSyntax(syntax: string) {
    addChildrenWithStyle(syntax, 'syntax');
  }

  function addChildrenWithStyle(node: string, style: string) {
    const start = text.length;
    processChildren(node);
    const end = text.length;
    ranges.push([style, start, end - start]);
  }

  const ranges: Range[] = [];
  function dfs(node) {
    if (typeof node === 'string') {
      text += node;
    } else {
      if (node.tag === '<>') {
        processChildren(node);
      } else if (node.tag === '<strong>') {
        appendSyntax('*', 'syntax');
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
        addChildrenWithStyle(node, 'mention');
      } else if (node.tag === '<mention-user>') {
        addChildrenWithStyle(node, 'mention-user');
      } else if (node.tag === '<blockquote>') {
        appendSyntax('>');
        addChildrenWithStyle(node, 'blockquote');
        // compensate for "> " at the beginning
        const curr = ranges?.[ranges.length -1];
        if (curr) {
          curr[1] -= 1;
          curr[2] += 1;
        }
      } else if (node.tag === '<h1>') {
        appendSyntax('# ');
        addChildrenWithStyle(node, 'h1');
      } else if (node.tag === '<pre>') {
        appendSyntax('```');
        text += '\n';
        if (!node.children.every((child: ReactNode) => typeof child === 'string')) {
          throw new Error('Invalid HTML: <pre> must contain only text');
        }
        const content = node.children.join('').replaceAll('&#32;', ' ');
        addChildrenWithStyle(content, 'pre');
        appendSyntax('```');
      } else if (node.tag.startsWith('<a href="')) {
        const href = _.unescape(node.tag.match(/href="([^"]*)"/)[1]);
        if (
          node.children.length === 1 &&
          typeof node.children[0] === 'string' &&
          (node.children[0] === href || `mailto:${node.children[0]}` === href)
        ) {
          addChildrenWithStyle(node.children[0], 'link');
        } else {
          appendSyntax('[');
          processChildren(node);
          appendSyntax('](');
          addChildrenWithStyle(href, 'link');
          appendSyntax(')');
        }
      } else {
        throw new Error('Unknown tag: ' + node.tag);
      }
    }
  }
  dfs(tree);
  return [text, ranges];
}

function parseMarkdownToTextAndRanges(markdown: string): [string, Range[]] | undefined {
  const html = parseMarkdownToHTML(markdown);
  const tokens = parseHTMLToTokens(html);
  const tree = parseTokensToTree(tokens);
  if (!tree) return;
  const [text, ranges] = parseTreeToTextAndRanges(tree);
  ranges.sort((a, b) => a[1] - b[1]); // sort by location to properly handle bold+italic
  return [text, ranges];
}

// eslint-disable-next-line no-undef
globalThis.parseMarkdownToTextAndRanges = parseMarkdownToTextAndRanges;
