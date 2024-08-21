import * as CursorUtils from './cursorUtils';
import type * as StyleUtilsTypes from '../styleUtils';
import * as BrowserUtils from './browserUtils';

type PartialMarkdownStyle = StyleUtilsTypes.PartialMarkdownStyle;

type MarkdownType = 'bold' | 'italic' | 'strikethrough' | 'emoji' | 'link' | 'code' | 'pre' | 'blockquote' | 'h1' | 'syntax' | 'mention-here' | 'mention-user' | 'mention-report';

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

type TextChangeMetrics = {
  /**
   * The start index in the provided string where the repalcement started from.
   */
  start: number;
  /**
   * The amount of characters that have been added.
   */
  count: number;
  /**
   * The amount of characters replaced.
   */
  before: number;
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
    cursorPosition = selection ? selection.end : null;
  }
  const ranges = global.parseExpensiMarkToRanges(text);

  const markdownRanges: MarkdownRange[] = ranges as MarkdownRange[];
  const rootSpan = targetElement.firstChild as HTMLElement | null;

  if (!text || targetElement.innerHTML === '<br>' || (rootSpan && rootSpan.innerHTML === '\n')) {
    targetElement.innerHTML = '';
    targetElement.innerText = '';
  }

  // We don't want to parse text with single '\n', because contentEditable represents it as invisible <br />
  if (text) {
    const dom = parseRangesToHTMLNodes(text, markdownRanges, markdownStyle);

    if (!rootSpan || !rootSpan?.classList?.contains('root') || rootSpan.innerHTML !== dom.innerHTML) {
      targetElement.innerHTML = '';
      targetElement.innerText = '';
      target.appendChild(dom);

      if (BrowserUtils.isChromium) {
        moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
      }
    }

    if (!BrowserUtils.isChromium) {
      moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
    }
  }

  CursorUtils.setPrevText(target);

  return {text: target.innerText, cursorPosition: cursorPosition || 0};
}

/**
 * Calculates start, count and before values. Whenever the text is being changed you can think of it as a replacement operation,
 * where parts of the string get replaced with new content.
 *
 * This is to align the onChange event with the native counter part:
 * - https://github.com/facebook/react-native/pull/45248
 */
function calculateInputMetrics(inputType: string, prevSelection: CursorUtils.Selection, prevTextLength: number, normalizedText: string, cursorPosition: number | null): TextChangeMetrics {
  // The new text is between the prev start selection and the new end selection, can be empty
  const addedText = normalizedText.slice(prevSelection.start, cursorPosition ?? 0);
  // The length of the text that replaced the "before" text
  const count = addedText.length;
  // The start index of the replacement operation
  let start = prevSelection.start;
  // Before is by default the length of the previous selection
  let before = prevSelection.end - prevSelection.start;

  // For some events start and before need to be adjusted
  if (inputType === 'historyUndo') {
    // wip: not working yet
    before = Math.abs(prevText.length - normalizedText.length);

    count = 0;
    let startFound = false;
    let charIndex = newCursorPosition - 1;
    while (!startFound) {
      const newChar = normalizedText[charIndex];
      const prevChar = prevText[charIndex];
      charIndex--;

      if (newChar !== prevChar) {
        count++;
      } else {
        startFound = count > 0 || charIndex === 0;
      }
    }
    start = newCursorPosition - count;
  } else if (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') {
    if (before === 0) {
      // Its possible the user pressed a delete key without a selection range (before = 0),
      // so we need to adjust the before value to have the length of the deleted text
      before = prevTextLength - normalizedText.length;
    }
    if (inputType === 'deleteContentBackward') {
      // When the user does a backspace delete he expects the content before the cursor to be removed.
      // For this the start value needs to be adjusted (its as if the selection was before the text that we want to delete)
      start = Math.max(start - before, 0);
    }
  }

  return {start, before, count};
}

export {parseText, parseRangesToHTMLNodes, calculateInputMetrics};

export type {MarkdownRange, MarkdownType};
