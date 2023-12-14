import { ExpensiMark } from 'expensify-common/lib/ExpensiMark';
import _ from 'underscore';

function parseMarkdownToHTML(markdown) {
  const parser = ExpensiMark;
  const html = parser.replace(markdown, {
    shouldKeepWhitespace: true,
  });
  return html;
}

function parseHTMLToTokens(html) {
  const tokens = [];
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

function parseTokensToTree(tokens) {
  const stack = [{ tag: '<>', children: [] }];
  tokens.forEach(([type, payload]) => {
    if (type === 'TEXT') {
      const text = _.unescape(payload);
      const top = stack[stack.length - 1];
      top.children.push(text);
    } else if (type === 'HTML') {
      if (payload.startsWith('</')) {
        // closing tag
        const child = stack.pop();
        const top = stack[stack.length - 1];
        top.children.push(child);
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

function parseTreeToTextAndRanges(tree) {
  let text = '';

  function processChildren(node) {
    if (typeof node === 'string') {
      text += node;
    } else {
      node.children.forEach(dfs);
    }
  }

  function appendSyntax(syntax) {
    addChildrenWithStyle(syntax, 'syntax');
  }

  function addChildrenWithStyle(node, style) {
    const start = text.length;
    processChildren(node);
    const end = text.length;
    ranges.push([style, start, end - start]);
  }

  const ranges = [];
  function dfs(node, currentNodeIndex, siblingNodes) {
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
        ranges[ranges.length - 1][1] -= 1;
        ranges[ranges.length - 1][2] += 1;
      } else if (node.tag === '<h1>') {
        appendSyntax('# ');
        addChildrenWithStyle(node, 'h1');
      } else if (node.tag === '<pre>') {
        appendSyntax('```');
        text += '\n';
        if (!node.children.every((child) => typeof child === 'string')) {
          throw new Error('Invalid HTML: <pre> must contain only text');
        }
        const content = node.children.join('').replaceAll('&#32;', ' ');
        addChildrenWithStyle(content, 'pre');
        appendSyntax('```');
      } else if (node.tag.startsWith('<a href="')) {
        const href = _.unescape(node.tag.match(/href="([^"]*)"/)[1]); // always present
        const isLabeledLink =
          node.tag.match(/link-variant="([^"]*)"/)[1] === 'labeled';
        const dataRawHref = node.tag.match(/data-raw-href="([^"]*)"/);
        const dataRawLabel = node.tag.match(/data-raw-label="([^"]*)"/);
        const matchString = dataRawHref ? _.unescape(dataRawHref[1]) : href;
        const previousNode = siblingNodes.at(currentNodeIndex - 1);

        // stop processing as link while user is typing labeled link
        if (typeof previousNode === 'string' && previousNode.endsWith('](')) {
          processChildren(node);
        } else if (
          !isLabeledLink &&
          node.children.length === 1 &&
          typeof node.children[0] === 'string' &&
          (node.children[0] === matchString ||
            `mailto:${node.children[0]}` === href)
        ) {
          addChildrenWithStyle(node.children[0], 'link');
        } else {
          appendSyntax('[');
          processChildren(dataRawLabel ? _.unescape(dataRawLabel[1]) : node);
          appendSyntax('](');
          addChildrenWithStyle(matchString, 'link');
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

function parseMarkdownToTextAndRanges(markdown) {
  const html = parseMarkdownToHTML(markdown);
  const tokens = parseHTMLToTokens(html);
  const tree = parseTokensToTree(tokens);
  const [text, ranges] = parseTreeToTextAndRanges(tree);
  ranges.sort((a, b) => a[1] - b[1]); // sort by location to properly handle bold+italic
  return [text, ranges];
}

// eslint-disable-next-line no-undef
globalThis.parseMarkdownToTextAndRanges = parseMarkdownToTextAndRanges;
