import * as CursorUtils from './cursorUtils';
import type * as StyleUtilsTypes from '../styleUtils';
import * as StyleUtils from '../styleUtils';
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

function addStyling(targetElement: HTMLElement, type: MarkdownType, markdownStyle: PartialMarkdownStyle) {
  const node = targetElement;
  Object.assign(node.dataset, {
    type,
  });
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
      Object.assign(node.style, markdownStyle.emoji);
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
      Object.assign(node.style, {...markdownStyle.code, lineHeight: 1.4});
      break;
    case 'pre':
      Object.assign(node.style, {
        ...{...markdownStyle.pre, borderStyle: undefined, padding: undefined, backgroundColor: undefined},
        position: 'relative',
        boxSizing: 'border-box',
      });
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

function hidePreBlockBackgrounds(target: HTMLElement) {
  const preBlocks = [...target.querySelectorAll('*[data-type="pre"]')];
  const preBlockBackgrounds = [...target.querySelectorAll('.pre-block-background')];
  for (let i = preBlocks.length - 1; i <= preBlockBackgrounds.length - 1; i++) {
    preBlockBackgrounds[i]?.remove();
  }

  return [preBlocks, preBlockBackgrounds] as [Element[], Element[]];
}

function handlePreBlockBackground(target: HTMLElement, markdownStyle: PartialMarkdownStyle = {}) {
  const [preBlocks, preBlockBackgrounds] = hidePreBlockBackgrounds(target);
  if (!preBlocks) return;

  preBlocks.forEach((pre) => {
    const preRects = [...pre.getClientRects()];
    preRects.shift();

    let width = 0;
    let height = 0;
    let top = 0;
    let left = 0;
    preRects.forEach((preRect) => {
      if (width < preRect.width) width = preRect.width;
      if (!top || top > preRect.top) top = preRect.top;
      height = preRect.bottom - top;
      if (!left || left > preRect.left) left = preRect.left;
    });
    const {top: divTop, left: divLeft} = target.getBoundingClientRect();

    const span = (preBlockBackgrounds?.[preBlocks.indexOf(pre)] as HTMLSpanElement | null) ?? document.createElement('span');
    const {pre: preStyle} = markdownStyle;
    // eslint-disable-next-line
    const transform = StyleUtils.getStyleNumericValue(preStyle?.padding?.toString() ?? '2') + StyleUtils.getStyleNumericValue(preStyle?.borderWidth?.toString() ?? '1') + 'px';
    span.classList.add('pre-block-background');
    Object.assign(span.style, {
      width: `${width}px`,
      height: `${height}px`,
      padding: preStyle?.padding ?? '2px',
      border: `${preStyle?.borderWidth ?? '1px'} solid gray`,
      borderRadius: '4px',
      backgroundColor: 'lightgray',
      display: `block`,
      position: 'absolute',
      top: `${top - (divTop - target.scrollTop)}px`,
      left: `${left - divLeft}px`,
      transform: `translate(-${transform}, -${transform})`,
      zIndex: '-1',
      pointerEvents: 'none',
      userSelect: 'none',
      caretColor: 'transparent',
    });
    span.contentEditable = 'false';
    span.spellcheck = false;
    span.ariaAutoComplete = 'false';

    target.appendChild(span);
  });
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

    if (!rootSpan || rootSpan.innerHTML !== dom.innerHTML) {
      targetElement.innerHTML = '';
      targetElement.innerText = '';
      target.appendChild(dom);

      if (BrowserUtils.isChromium) {
        moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
      }
    }
    // Update pre block backgrounds
    handlePreBlockBackground(target, markdownStyle);

    if (!BrowserUtils.isChromium) {
      moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
    }
  }

  CursorUtils.setPrevText(target);

  return {text: target.innerText, cursorPosition: cursorPosition || 0};
}

export {parseText, parseRangesToHTMLNodes, handlePreBlockBackground};

export type {MarkdownRange, MarkdownType};
