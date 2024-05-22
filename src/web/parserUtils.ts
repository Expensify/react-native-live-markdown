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

function parseText(target: HTMLElement, text: string, curosrPositionIndex: number | null, markdownStyle: PartialMarkdownStyle = {}, alwaysMoveCursorToTheEnd = false) {
  const targetElement = target;

  let cursorPosition: number | null = curosrPositionIndex;
  const isFocused = document.activeElement === target;
  if (isFocused && curosrPositionIndex === null) {
    const selection = CursorUtils.getCurrentCursorPosition(target);
    cursorPosition = selection ? selection.end : null;
  }
  const ranges = global.parseExpensiMarkToRanges(text);

  console.log(text.replaceAll('\n', '\\n'));

  const markdownRanges: MarkdownRange[] = ranges as MarkdownRange[];
  const rootSpan = targetElement.firstChild as HTMLElement | null;

  // if (!text || targetElement.innerHTML === '<br>' || (rootSpan && rootSpan.innerHTML === '\n')) {
  targetElement.innerHTML = '';
  targetElement.innerText = '';
  // }

  // // We don't want to parse text with single '\n', because contentEditable represents it as invisible <br />
  // if (text) {
  //   const dom = parseRangesToHTMLNodes(text, markdownRanges, markdownStyle);

  //   if (!rootSpan || rootSpan.innerHTML !== dom.innerHTML) {
  //     targetElement.innerHTML = '';
  //     targetElement.innerText = '';
  //     target.appendChild(dom);

  //     if (BrowserUtils.isChromium) {
  //       moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
  //     }
  //   }

  //   if (!BrowserUtils.isChromium) {
  //     moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
  //   }
  // }

  const lines = text.split('\n');
  lines.forEach((line, index) => {
    const p = document.createElement('p');
    Object.assign(p.style, {
      margin: '0',
      padding: '0',
      display: 'block',
    });

    if (line === '') {
      p.appendChild(document.createElement('br'));
    } else {
      p.appendChild(document.createTextNode(line));
    }

    targetElement.appendChild(p);
  });

  moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);

  CursorUtils.setPrevText(target);

  return {text, cursorPosition: cursorPosition || 0};
}

export {parseText, parseRangesToHTMLNodes};

export type {MarkdownRange, MarkdownType};
