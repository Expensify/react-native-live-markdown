import * as CursorUtils from './cursorUtils';
import type * as StyleUtilsTypes from '../styleUtils';

type PartialMarkdownStyle = StyleUtilsTypes.PartialMarkdownStyle;

type MarkdownType = 'bold' | 'italic' | 'strikethrough' | 'link' | 'code' | 'pre' | 'blockquote' | 'h1' | 'syntax' | 'mention-here' | 'mention-user';

type MarkdownRange = {
  type: MarkdownType;
  start: number;
  length: number;
  depth?: number;
};

type NestedNode = {
  node: HTMLElement;
  endIndex: number;
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
    case 'mention-here':
      Object.assign(node.style, markdownStyle.mentionHere);
      break;
    case 'mention-user':
      Object.assign(node.style, markdownStyle.mentionUser);
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

function addSubstringAsTextNode(root: HTMLElement, text: string, startIndex: number, endIndex: number) {
  const substring = text.substring(startIndex, endIndex);
  if (substring.length > 0) {
    root.appendChild(document.createTextNode(substring));
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

function parseRangesToHTMLNodes(text: string, ranges: MarkdownRange[], markdownStyle: PartialMarkdownStyle = {}, disableInlineStyles = false): HTMLElement {
  const root: HTMLElement = document.createElement('span');
  root.className = 'root';
  const textLength = text.length;
  if (ranges.length === 0) {
    addSubstringAsTextNode(root, text, 0, textLength);
    return root;
  }

  const stack = ungroupRanges(ranges);
  const nestedStack: NestedNode[] = [{node: root, endIndex: textLength}];
  let lastRangeEndIndex = 0;
  while (stack.length > 0) {
    const range = stack.shift();
    if (!range) {
      break;
    }
    let currentRoot = nestedStack[nestedStack.length - 1];
    if (!currentRoot) {
      break;
    }

    const endOfCurrentRange = range.start + range.length;
    const nextRangeStartIndex = stack.length > 0 && !!stack[0] ? stack[0].start || 0 : textLength;

    addSubstringAsTextNode(currentRoot.node, text, lastRangeEndIndex, range.start); // add text with newlines before current range

    const span = document.createElement('span');
    if (disableInlineStyles) {
      span.className = range.type;
    } else {
      addStyling(span, range.type, markdownStyle);
    }

    if (stack.length > 0 && nextRangeStartIndex < endOfCurrentRange && range.type !== 'syntax') {
      // tag nesting
      currentRoot.node.appendChild(span);
      nestedStack.push({node: span, endIndex: endOfCurrentRange});
      lastRangeEndIndex = range.start;
    } else {
      addSubstringAsTextNode(span, text, range.start, endOfCurrentRange);
      currentRoot.node.appendChild(span);
      lastRangeEndIndex = endOfCurrentRange;

      // end of tag nesting
      while (nestedStack.length - 1 > 0 && nextRangeStartIndex >= currentRoot.endIndex) {
        addSubstringAsTextNode(currentRoot.node, text, lastRangeEndIndex, currentRoot.endIndex);
        const prevRoot = nestedStack.pop();
        if (!prevRoot) {
          break;
        }
        lastRangeEndIndex = prevRoot.endIndex;
        currentRoot = nestedStack[nestedStack.length - 1] || currentRoot;
      }
    }
  }

  if (nestedStack.length > 1) {
    const lastNestedNode = nestedStack[nestedStack.length - 1];
    if (lastNestedNode) {
      root.appendChild(lastNestedNode.node);
    }
  }

  addSubstringAsTextNode(root, text, lastRangeEndIndex, textLength);
  return root;
}

function parseText(
  target: HTMLElement,
  text: string,
  curosrPositionIndex: number | null,
  markdownStyle: PartialMarkdownStyle = {},
  disableNewLinesInCursorPositioning = false,
  alwaysMoveCursorToTheEnd = false,
) {
  const targetElement = target;

  let cursorPosition: number | null = curosrPositionIndex;
  const isFocused = document.activeElement === target;
  if (isFocused && curosrPositionIndex === null) {
    cursorPosition = CursorUtils.getCurrentCursorPosition(target).start;
  }
  const ranges = global.parseExpensiMarkToRanges(text);

  const markdownRanges: MarkdownRange[] = ranges as MarkdownRange[];

  targetElement.innerHTML = '';
  targetElement.innerText = '';

  // We don't want to parse text with single '\n', because contentEditable represents it as invisible <br />
  if (!!text && text !== '\n') {
    const dom = parseRangesToHTMLNodes(text, markdownRanges, markdownStyle);
    target.appendChild(dom);
  }

  if (alwaysMoveCursorToTheEnd) {
    CursorUtils.moveCursorToEnd(target);
  } else if (isFocused && cursorPosition !== null) {
    CursorUtils.setCursorPosition(target, cursorPosition, disableNewLinesInCursorPositioning);
  }

  return {text: target.innerText, cursorPosition: cursorPosition || 0};
}

export {parseText, parseRangesToHTMLNodes};

export type {MarkdownRange, MarkdownType};
