import * as CursorUtils from './cursorUtils';
import type * as StyleUtilsTypes from '../styleUtils';
import * as BrowserUtils from './browserUtils';
import * as TreeUtils from './treeUtils';
import type * as TreeUtilsTypes from './treeUtils';

type PartialMarkdownStyle = StyleUtilsTypes.PartialMarkdownStyle;
type TreeNode = TreeUtilsTypes.TreeNode;

type MarkdownType = 'bold' | 'italic' | 'strikethrough' | 'emoji' | 'link' | 'code' | 'pre' | 'blockquote' | 'h1' | 'syntax' | 'mention-here' | 'mention-user' | 'mention-report';

type MarkdownRange = {
  type: MarkdownType;
  start: number;
  length: number;
  depth?: number;
};

type Node = {
  element: HTMLElement;
  start: number;
  length: number;
  parentNode: Node | null;
};

type Paragraph = {
  text: string;
  start: number;
  length: number;
  markdownRanges: MarkdownRange[];
};

function addStyling(targetElement: HTMLElement, type: MarkdownType, markdownStyle: PartialMarkdownStyle) {
  const node = targetElement;
  switch (type) {
    case 'syntax':
      Object.assign(node.style, markdownStyle.syntax);
      break;
    case 'bold':
      node.style.fontWeight = 'bold';
      break;
    case 'italic':
      node.style.fontStyle = 'italic';
      break;
    case 'strikethrough':
      node.style.textDecoration = 'line-through';
      break;
    case 'emoji':
      Object.assign(node.style, {...markdownStyle.emoji, verticalAlign: 'middle'});
      break;
    case 'mention-here':
      Object.assign(node.style, markdownStyle.mentionHere);
      break;
    case 'mention-user':
      Object.assign(node.style, markdownStyle.mentionUser);
      break;
    case 'mention-report':
      Object.assign(node.style, markdownStyle.mentionReport);
      break;
    case 'link':
      Object.assign(node.style, {
        ...markdownStyle.link,
        textDecoration: 'underline',
      });
      break;
    case 'code':
      Object.assign(node.style, markdownStyle.code);
      break;
    case 'pre':
      Object.assign(node.style, markdownStyle.pre);
      break;

    case 'blockquote':
      Object.assign(node.style, {
        ...markdownStyle.blockquote,
        borderLeftStyle: 'solid',
        display: 'inline-block',
        maxWidth: '100%',
        boxSizing: 'border-box',
      });
      break;
    case 'h1':
      Object.assign(node.style, {
        ...markdownStyle.h1,
        fontWeight: 'bold',
      });
      break;
    default:
      break;
  }
}

function ungroupRanges(ranges: MarkdownRange[]): MarkdownRange[] {
  const ungroupedRanges: MarkdownRange[] = [];
  ranges.forEach((range) => {
    if (!range.depth) {
      ungroupedRanges.push(range);
    }
    const {depth, ...rangeWithoutDepth} = range;
    Array.from({length: depth!}).forEach(() => {
      ungroupedRanges.push(rangeWithoutDepth);
    });
  });
  return ungroupedRanges;
}

function splitTextIntoLines(text: string): Paragraph[] {
  let lineStartIndex = 0;
  const lines: Paragraph[] = text.split('\n').map((line) => {
    const lineObject: Paragraph = {
      text: line,
      start: lineStartIndex,
      length: line.length,
      markdownRanges: [],
    };
    lineStartIndex += line.length + 1; // Adding 1 for the newline character
    return lineObject;
  });

  return lines;
}

function mergeLinesWithMultilineTags(lines: Paragraph[]) {
  let multiLineRange: MarkdownRange | null = null;
  let lineWithMultilineTag: Paragraph | null = null;
  let i = 0;
  while (i < lines.length) {
    const currentLine = lines[i];
    if (!currentLine) {
      break;
    }
    // start merging if line contains range that ends in a different line
    if (lineWithMultilineTag && multiLineRange && currentLine.start <= multiLineRange.start + multiLineRange.length) {
      lineWithMultilineTag.text += `\n${currentLine.text}`;
      lineWithMultilineTag.markdownRanges.push(...currentLine.markdownRanges);
      lineWithMultilineTag.length += currentLine.length + 1;
      lines.splice(i, 1);
    } else {
      multiLineRange = currentLine.markdownRanges.find((range) => range.start + range.length > currentLine.start + currentLine.length) || null;
      lineWithMultilineTag = multiLineRange ? currentLine : null;
      i += 1;
    }
  }
}

function groupMarkdownRangesByLine(lines: Paragraph[], ranges: MarkdownRange[]) {
  let lineIndex = 0;
  ranges.forEach((range) => {
    const {start} = range;

    let currentLine = lines[lineIndex];
    while (currentLine && lineIndex < lines.length && start > currentLine.start + currentLine.length) {
      lineIndex += 1;
      currentLine = lines[lineIndex];
    }

    if (currentLine) {
      currentLine.markdownRanges.push(range);
    }
  });
}

function createBrElement() {
  const span = document.createElement('span');
  span.appendChild(document.createElement('br'));
  span.setAttribute('data-type', 'br');
  return span;
}

function addTextToElement(element: HTMLElement, text: string) {
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (line !== '') {
      const span = document.createElement('span');
      span.innerText = line;
      element.appendChild(span);
    }

    if (index < lines.length - 1 || (index === 0 && line === '')) {
      element.appendChild(createBrElement());
    }
  });
}

function createParagraph(text: string | null = null) {
  const p = document.createElement('p');
  Object.assign(p.style, {
    margin: '0',
    padding: '0',
    display: 'block',
  });
  p.setAttribute('data-type', 'line');
  if (text === '') {
    p.appendChild(createBrElement());
  } else if (text) {
    addTextToElement(p, text);
  }

  return p;
}

function parseRangesToHTMLNodes(text: string, ranges: MarkdownRange[], markdownStyle: PartialMarkdownStyle = {}, disableInlineStyles = false) {
  const rootElement: HTMLElement = document.createElement('div');
  const textLength = text.replace(/\n/g, '\\n').length;

  const rootNode: Node = {
    element: rootElement,
    start: 0,
    length: textLength,
    parentNode: null,
  };
  let currentParentNode: Node = {...rootNode};

  const lines = splitTextIntoLines(text);

  if (ranges.length === 0) {
    lines.forEach((line) => {
      currentParentNode.element.appendChild(createParagraph(line.text));
    });
    return rootElement;
  }

  const markdownRanges = ungroupRanges(ranges);

  groupMarkdownRangesByLine(lines, markdownRanges);
  mergeLinesWithMultilineTags(lines);

  let lastRangeEndIndex = 0;
  while (lines.length > 0) {
    const line = lines.shift();
    if (!line) {
      break;
    }

    // preparing line paragraph element for markdown text
    const p = createParagraph(null);
    rootNode.element.appendChild(p);
    currentParentNode = {
      element: p,
      start: line.start,
      length: line.length,
      parentNode: rootNode,
    };
    if (line.markdownRanges.length === 0) {
      addTextToElement(currentParentNode.element, line.text);
    }

    lastRangeEndIndex = line.start;

    const lineMarkdownRanges = line.markdownRanges;
    // go through all markdown ranges in the line
    while (lineMarkdownRanges.length > 0) {
      const range = lineMarkdownRanges.shift();
      if (!range) {
        break;
      }

      const endOfCurrentRange = range.start + range.length;
      const nextRangeStartIndex = lineMarkdownRanges.length > 0 && !!lineMarkdownRanges[0] ? lineMarkdownRanges[0].start || 0 : textLength;

      // add text before the markdown range
      const textBeforeRange = line.text.substring(lastRangeEndIndex - line.start, range.start - line.start);
      if (textBeforeRange) {
        addTextToElement(currentParentNode.element, textBeforeRange);
      }

      // create markdown span element
      const span = document.createElement('span');
      if (disableInlineStyles) {
        span.className = range.type;
      } else {
        addStyling(span, range.type, markdownStyle);
        span.setAttribute('data-type', range.type);
      }

      if (lineMarkdownRanges.length > 0 && nextRangeStartIndex < endOfCurrentRange && range.type !== 'syntax') {
        // tag nesting
        currentParentNode.element.appendChild(span);
        currentParentNode = {
          element: span,
          start: range.start,
          length: range.length,
          parentNode: currentParentNode,
        };
        lastRangeEndIndex = range.start;
      } else {
        // adding markdown tag
        currentParentNode.element.appendChild(span);
        addTextToElement(span, text.substring(range.start, endOfCurrentRange));
        lastRangeEndIndex = endOfCurrentRange;
        // tag unnesting and adding text after the tag
        while (currentParentNode.parentNode !== null && nextRangeStartIndex >= currentParentNode.start + currentParentNode.length) {
          const textAfterRange = line.text.substring(lastRangeEndIndex - line.start, currentParentNode.start - line.start + currentParentNode.length);
          if (textAfterRange) {
            addTextToElement(currentParentNode.element, textAfterRange);
          }
          lastRangeEndIndex = currentParentNode.start + currentParentNode.length;
          currentParentNode = currentParentNode.parentNode || rootNode;
        }
      }
    }
  }

  return rootElement;
}

function moveCursor(isFocused: boolean, alwaysMoveCursorToTheEnd: boolean, cursorPosition: number | null, target: HTMLElement) {
  if (!isFocused) {
    return;
  }

  if (alwaysMoveCursorToTheEnd || cursorPosition === null) {
    CursorUtils.moveCursorToEnd(target);
  } else if (cursorPosition !== null) {
    CursorUtils.setCursorPosition(target, cursorPosition);
  }
}

function parseText(target: HTMLElement, text: string, cursorPositionIndex: number | null, markdownStyle: PartialMarkdownStyle = {}, alwaysMoveCursorToTheEnd = false) {
  const targetElement = target;

  // in case the cursorPositionIndex is larger than text length, cursorPosition will be null, i.e: move the caret to the end
  let cursorPosition: number | null = cursorPositionIndex && cursorPositionIndex <= text.length ? cursorPositionIndex : null;
  const isFocused = document.activeElement === target;
  if (isFocused && cursorPositionIndex === null) {
    const selection = CursorUtils.getCurrentCursorPosition(target);
    cursorPosition = selection ? selection.start : null;
  }
  const ranges = global.parseExpensiMarkToRanges(text);
  const markdownRanges: MarkdownRange[] = ranges as MarkdownRange[];
  let tree: TreeNode | null = null;

  if (!text || targetElement.innerHTML === '<br>' || (targetElement && targetElement.innerHTML === '\n')) {
    targetElement.innerHTML = '';
    targetElement.innerText = '';
  }

  // We don't want to parse text with single '\n', because contentEditable represents it as invisible <br />
  if (text) {
    const dom = parseRangesToHTMLNodes(text, markdownRanges, markdownStyle);
    if (targetElement.innerHTML !== dom.innerHTML) {
      targetElement.innerHTML = '';
      targetElement.innerText = '';
      targetElement.innerHTML = dom.innerHTML || '';

      tree = TreeUtils.buildTree(targetElement, text);
      targetElement.tree = tree;

      if (BrowserUtils.isChromium) {
        moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
      }
    }

    if (!BrowserUtils.isChromium) {
      moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
    }
  }

  return {text, cursorPosition: cursorPosition || 0, tree};
}

export {parseText, parseRangesToHTMLNodes};

export type {MarkdownRange, MarkdownType};
