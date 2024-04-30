import * as CursorUtils from './cursorUtils';
import type * as StyleUtilsTypes from '../styleUtils';
import * as BrowserUtils from './browserUtils';

type PartialMarkdownStyle = StyleUtilsTypes.PartialMarkdownStyle;

type MarkdownType = 'bold' | 'italic' | 'strikethrough' | 'link' | 'code' | 'pre' | 'blockquote' | 'h1' | 'syntax' | 'mention-here' | 'mention-user' | 'emoji' | 'p';

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

function addSubstringAsTextNode(root: HTMLElement, text: string, startIndex: number, endIndex: number, rawText = true) {
  let substring = text.substring(startIndex, endIndex);
  substring = substring.replaceAll('\n', '');
  // console.log('%%%%%\n', 'root', root);
  // console.log('%%%%%\n', 'substring', JSON.stringify(substring));
  if (substring !== '') {
    if (rawText) {
      const span = document.createElement('span');
      span.textContent = substring;
      root.appendChild(span);
    } else {
      root.appendChild(document.createTextNode(substring));
    }
  }
  // console.log('%%%%%\n', 'root', JSON.stringify(root.innerHTML));
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
  console.log('%%%%%\n', JSON.stringify(stack));
  while (stack.length > 0) {
    console.log('%%%%%\n', JSON.stringify(nestedStack));
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

    addSubstringAsTextNode(currentRoot.node, text, lastRangeEndIndex, range.start, true); // add text with newlines before current range

    let span = document.createElement('span');
    if (range.type === 'p') {
      span = document.createElement('p');
    }

    if (disableInlineStyles) {
      span.className = range.type;
    } else {
      addStyling(span, range.type, markdownStyle);
    }

    if (stack.length > 0 && nextRangeStartIndex < endOfCurrentRange && range.type !== 'syntax') {
      // if (!span.hasChildNodes()) {
      //   span.appendChild(document.createElement('br'));
      // }
      // tag nesting
      currentRoot.node.appendChild(span);
      nestedStack.push({node: span, endIndex: endOfCurrentRange});
      lastRangeEndIndex = range.start;
    } else {
      addSubstringAsTextNode(span, text, range.start, endOfCurrentRange);
      // if (!span.hasChildNodes()) {
      //   span.appendChild(document.createElement('br'));
      // }
      currentRoot.node.appendChild(span);
      lastRangeEndIndex = endOfCurrentRange;

      // end of tag nesting
      while (nestedStack.length - 1 > 0 && nextRangeStartIndex >= currentRoot.endIndex) {
        addSubstringAsTextNode(currentRoot.node, text, lastRangeEndIndex, currentRoot.endIndex, true);
        const prevRoot = nestedStack.pop();
        if (!prevRoot) {
          break;
        }
        lastRangeEndIndex = prevRoot.endIndex;
        currentRoot = nestedStack[nestedStack.length - 1] || currentRoot;
      }
    }

    // if (!span.hasChildNodes()) {
    //   span.appendChild(document.createElement('br'));
    // }
  }

  if (nestedStack.length > 1) {
    console.log('%%%%%\n', 'true-----------------');
    const lastNestedNode = nestedStack[nestedStack.length - 1];
    console.log('%%%%%\n', 'lastNestedNode', lastNestedNode);
    if (lastNestedNode) {
      root.appendChild(lastNestedNode.node);
    }
  }

  // console.log('%%%%%\n', 'root.innerText', JSON.stringify(root.innerText));
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

function parseRanges(ranges: MarkdownRange[], text: string): MarkdownRange[] {
  const lines = text.split('\n');
  if (lines.length === 1) {
    return [{type: 'p', start: 0, length: text.length}, ...ranges];
  }

  const rangesStack = [...ranges];
  const res: MarkdownRange[] = [];
  let currentIndex = 0;

  while (lines.length > 0 && (lines[0] === '' || lines[0])) {
    res.push({type: 'p', start: currentIndex, length: lines[0].length + 1});

    currentIndex += lines[0].length + 1;

    while (rangesStack[0] && rangesStack[0].start < currentIndex) {
      res.push(rangesStack.shift() as MarkdownRange);
    }
    lines.shift();
  }

  return res;
}

function parseText(target: HTMLElement, text: string, curosrPositionIndex: number | null, markdownStyle: PartialMarkdownStyle = {}, alwaysMoveCursorToTheEnd = false) {
  const targetElement = target;
  console.log('%%%%%\n', 'text', JSON.stringify(text));

  let cursorPosition: number | null = curosrPositionIndex;
  const isFocused = document.activeElement === target;
  if (isFocused && curosrPositionIndex === null) {
    const selection = CursorUtils.getCurrentCursorPosition(target);
    cursorPosition = selection ? selection.end : null;
  }
  const ranges = global.parseExpensiMarkToRanges(text);

  const markdownRanges: MarkdownRange[] = ranges as MarkdownRange[];
  console.log('%%%%%\n', 'markdownRanges', markdownRanges);
  console.log('%%%%%\n', 'parseRanges(markdownRanges, text)', parseRanges(markdownRanges, text));
  const rootSpan = targetElement.firstChild as HTMLElement | null;

  if (!text || targetElement.innerHTML === '<br>' || (rootSpan && rootSpan.innerHTML === '\n')) {
    targetElement.innerHTML = '';
    targetElement.innerText = '';
  }

  // We don't want to parse text with single '\n', because contentEditable represents it as invisible <br />
  if (text) {
    const dom = parseRangesToHTMLNodes(text, parseRanges(markdownRanges, text), markdownStyle);
    // const dom = parseRangesToHTMLNodes(text, markdownRanges, markdownStyle);

    if (!rootSpan || rootSpan.innerHTML !== dom.innerHTML) {
      targetElement.innerHTML = '';
      targetElement.innerText = '';
      console.log('%%%%%\n', 'JSON.stringify(dom.innerText)', JSON.stringify(dom.innerText));
      target.appendChild(dom);

      if (BrowserUtils.isChromium) {
        moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
      }
    }

    if (!BrowserUtils.isChromium) {
      moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, target);
    }
  }

  console.log('%%%%%\n', 'target.innerText', JSON.stringify(target.innerText));

  return {text: target.innerText, cursorPosition: cursorPosition || 0};
}

export {parseText, parseRangesToHTMLNodes};

export type {MarkdownRange, MarkdownType};
