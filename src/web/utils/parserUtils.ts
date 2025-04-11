import type {HTMLMarkdownElement, MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import {addNodeToTree, createRootTreeNode, updateTreeElementRefs} from './treeUtils';
import type {NodeType, TreeNode} from './treeUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';
import {getCurrentCursorPosition, moveCursorToEnd, setCursorPosition} from './cursorUtils';
import {handleCustomStyles} from './webStyleUtils';
import {addStyleToBlock, extendBlockStructure, getFirstBlockMarkdownRange, isBlockMarkdownType} from './blockUtils';
import type {InlineImagesInputProps, MarkdownRange} from '../../commonTypes';
import {getAnimationCurrentTimes, updateAnimationsTime} from './animationUtils';
import {sortRanges, ungroupRanges} from '../../rangeUtils';

type Paragraph = {
  text: string;
  start: number;
  length: number;
  markdownRanges: MarkdownRange[];
};

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

/** Merges lines that contain multiline markdown tags into one line */
function mergeLinesWithMultilineTags(lines: Paragraph[], ranges: MarkdownRange[]) {
  let mergedLines = [...lines];
  const lineIndexes = mergedLines.map((_line, index) => index);

  ranges.forEach((range) => {
    const beginLineIndex = mergedLines.findLastIndex((line) => line.start <= range.start);
    const endLineIndex = mergedLines.findIndex((line) => line.start + line.length >= range.start + range.length);
    const correspondingLineIndexes = lineIndexes.slice(beginLineIndex, endLineIndex + 1);

    if (correspondingLineIndexes.length > 0) {
      const mainLineIndex = correspondingLineIndexes[0] as number;
      const mainLine = mergedLines[mainLineIndex] as Paragraph;

      mainLine.markdownRanges.push(range);

      const otherLineIndexes = correspondingLineIndexes.slice(1);
      otherLineIndexes.forEach((lineIndex) => {
        const otherLine = mergedLines[lineIndex] as Paragraph;

        mainLine.text += `\n${otherLine.text}`;
        mainLine.length += otherLine.length + 1;
        mainLine.markdownRanges.push(...otherLine.markdownRanges);
      });
      if (otherLineIndexes.length > 0) {
        mergedLines = mergedLines.filter((_line, index) => !otherLineIndexes.includes(index));
      }
    }
  });

  return mergedLines;
}

/** Adds a value prop to the element and appends the value to the parent node element */
function appendValueToElement(element: HTMLMarkdownElement, parentTreeNode: TreeNode, value: string) {
  const targetElement = element;
  const parentNode = parentTreeNode;
  targetElement.value = value;
  parentNode.element.value = (parentNode.element.value || '') + value;
}

function appendNode(element: HTMLMarkdownElement, parentTreeNode: TreeNode, type: NodeType, length: number) {
  const node = addNodeToTree(element, parentTreeNode, type, length);
  parentTreeNode.element.appendChild(element);
  return node;
}

function addBrElement(node: TreeNode) {
  const span = document.createElement('span') as HTMLMarkdownElement;
  span.setAttribute('data-type', 'br');
  appendValueToElement(span, node, '\n');
  const spanNode = appendNode(span, node, 'br', 1);
  appendNode(document.createElement('br') as unknown as HTMLMarkdownElement, spanNode, 'br', 1);
  return spanNode;
}

function addTextToElement(node: TreeNode, text: string, isMultiline = true) {
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (line !== '') {
      const span = document.createElement('span') as HTMLMarkdownElement;
      appendValueToElement(span, node, line);
      span.setAttribute('data-type', 'text');
      span.appendChild(document.createTextNode(line));
      appendNode(span, node, 'text', line.length);

      const parentType = span.parentElement?.dataset.type;
      if (!isMultiline && parentType && ['pre', 'code', 'mention-here', 'mention-user', 'mention-report'].includes(parentType)) {
        // this is a fix to background colors being shifted downwards in a singleline input
        addStyleToBlock(span, 'text', {}, false);
      }
    }

    if (index < lines.length - 1 || (index === 0 && line === '')) {
      addBrElement(node);
    }
  });
}

function addParagraph(node: TreeNode, text: string | null, length: number, disableInlineStyles = false) {
  const p = document.createElement('p');
  p.setAttribute('data-type', 'line');
  if (!disableInlineStyles) {
    addStyleToBlock(p, 'line', {});
  }

  const pNode = appendNode(p as unknown as HTMLMarkdownElement, node, 'line', length);

  if (text === '') {
    // If the line is empty, we still need to add a br element to keep the line height
    addBrElement(pNode);
  } else if (text) {
    addTextToElement(pNode, text);
  }

  return pNode;
}

function addBlockWrapper(targetNode: TreeNode, length: number, markdownStyle: PartialMarkdownStyle) {
  const span = document.createElement('span') as HTMLMarkdownElement;
  span.setAttribute('data-type', 'block');
  addStyleToBlock(span, 'block', markdownStyle);
  return appendNode(span, targetNode, 'block', length);
}

/** Builds HTML DOM structure based on passed text and markdown ranges */
function parseRangesToHTMLNodes(
  text: string,
  ranges: MarkdownRange[],
  isMultiline = true,
  markdownStyle: PartialMarkdownStyle = {},
  disableInlineStyles = false,
  currentInput: MarkdownTextInputElement | null = null,
  inlineImagesProps: InlineImagesInputProps = {},
) {
  const rootElement: HTMLMarkdownElement = document.createElement('span') as HTMLMarkdownElement;
  const textLength = text.length;
  const rootNode: TreeNode = createRootTreeNode(rootElement, textLength);

  let currentParentNode: TreeNode = rootNode;
  let lines = splitTextIntoLines(text);

  if (ranges.length === 0) {
    lines.forEach((line) => {
      addParagraph(rootNode, line.text, line.length, disableInlineStyles);
    });
    return {dom: rootElement, tree: rootNode};
  }

  // Sort all ranges by start position, length, and by tag hierarchy so the styles and text are applied in correct order
  const sortedRanges = sortRanges(ranges);
  const markdownRanges = ungroupRanges(sortedRanges);
  lines = mergeLinesWithMultilineTags(lines, markdownRanges);

  let lastRangeEndIndex = 0;
  while (lines.length > 0) {
    const line = lines.shift();
    if (!line) {
      break;
    }

    // preparing line paragraph element for markdown text
    currentParentNode = addParagraph(rootNode, null, line.length, disableInlineStyles);
    rootElement.value = (rootElement.value || '') + line.text;
    if (lines.length > 0) {
      rootElement.value = `${rootElement.value || ''}\n`;
    }

    if (line.markdownRanges.length === 0) {
      addTextToElement(currentParentNode, line.text);
    }

    let wasBlockGenerated = false;

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

      // wrap all elements before the first block type markdown range with a span element
      const blockRange = getFirstBlockMarkdownRange([range, ...lineMarkdownRanges]);
      if (!wasBlockGenerated && blockRange) {
        currentParentNode = addBlockWrapper(currentParentNode, line.text.substring(lastRangeEndIndex - line.start, blockRange.start + blockRange.length - line.start).length, markdownStyle);
        wasBlockGenerated = true;
      }
      // add text before the markdown range
      const textBeforeRange = line.text.substring(lastRangeEndIndex - line.start, range.start - line.start);
      if (textBeforeRange) {
        addTextToElement(currentParentNode, textBeforeRange);
      }

      // create markdown span element
      const span = document.createElement('span') as HTMLMarkdownElement;
      span.setAttribute('data-type', range.type);
      const spanNode = appendNode(span, currentParentNode, range.type, range.length);

      if (!disableInlineStyles) {
        addStyleToBlock(span, range.type, markdownStyle, isMultiline);
      }

      if (isMultiline && !disableInlineStyles && currentInput) {
        currentParentNode = extendBlockStructure(currentInput, currentParentNode, range, lineMarkdownRanges, text, markdownStyle, inlineImagesProps);
      }

      if (lineMarkdownRanges.length > 0 && nextRangeStartIndex < endOfCurrentRange && range.type !== 'syntax') {
        // tag nesting
        currentParentNode = spanNode;
        lastRangeEndIndex = range.start;
      } else {
        // adding markdown tag
        addTextToElement(spanNode, text.substring(range.start, endOfCurrentRange), isMultiline);
        currentParentNode.element.value = (currentParentNode.element.value || '') + (spanNode.element.value || '');
        lastRangeEndIndex = endOfCurrentRange;
        // tag unnesting and adding text after the tag
        while (currentParentNode.parentNode !== null && nextRangeStartIndex >= currentParentNode.start + currentParentNode.length) {
          const textAfterRange = line.text.substring(lastRangeEndIndex - line.start, currentParentNode.start - line.start + currentParentNode.length);
          if (textAfterRange) {
            addTextToElement(currentParentNode, textAfterRange);
          }
          lastRangeEndIndex = currentParentNode.start + currentParentNode.length;
          if (currentParentNode.parentNode.type !== 'root') {
            currentParentNode.parentNode.element.value = currentParentNode.element.value || '';
          }
          if (isBlockMarkdownType(currentParentNode.type)) {
            wasBlockGenerated = false;
          }
          currentParentNode = currentParentNode.parentNode || rootNode;
        }
      }
    }
  }

  return {dom: rootElement, tree: rootNode};
}

function moveCursor(isFocused: boolean, alwaysMoveCursorToTheEnd: boolean, cursorPosition: number | null, target: MarkdownTextInputElement, shouldScrollIntoView = false) {
  if (!isFocused) {
    return;
  }

  if (alwaysMoveCursorToTheEnd || cursorPosition === null) {
    moveCursorToEnd(target);
  } else if (cursorPosition !== null) {
    setCursorPosition(target, cursorPosition, null, shouldScrollIntoView);
  }
}

function updateInputStructure(
  parserFunction: (input: string) => MarkdownRange[],
  target: MarkdownTextInputElement,
  text: string,
  cursorPositionIndex: number | null,
  isMultiline = true,
  markdownStyle: PartialMarkdownStyle = {},
  alwaysMoveCursorToTheEnd = false,
  shouldForceDOMUpdate = false,
  shouldScrollIntoView = false,
  inlineImagesProps: InlineImagesInputProps = {},
) {
  const targetElement = target;

  // in case the cursorPositionIndex is larger than text length, cursorPosition will be null, i.e: move the caret to the end
  let cursorPosition: number | null = cursorPositionIndex !== null && cursorPositionIndex <= text.length ? cursorPositionIndex : null;
  const isFocused = document.activeElement === target;
  if (isFocused && cursorPositionIndex === null) {
    const selection = getCurrentCursorPosition(target);
    cursorPosition = selection ? selection.start : null;
  }
  const markdownRanges = parserFunction(text);
  if (!text || targetElement.innerHTML === '<br>' || (targetElement && targetElement.innerHTML === '\n')) {
    targetElement.innerHTML = '';
    targetElement.innerText = '';
  }

  // We don't want to parse text with single '\n', because contentEditable represents it as invisible <br />
  if (text) {
    const {dom, tree} = parseRangesToHTMLNodes(text, markdownRanges, isMultiline, markdownStyle, false, targetElement, inlineImagesProps);

    if (shouldForceDOMUpdate || targetElement.innerHTML.replaceAll(/ data-content="([^"]*)"/g, '') !== dom.innerHTML) {
      const animationTimes = getAnimationCurrentTimes(targetElement);
      targetElement.innerHTML = '';
      targetElement.innerText = '';
      targetElement.innerHTML = dom.innerHTML;
      updateAnimationsTime(targetElement, animationTimes);
    }

    updateTreeElementRefs(tree, targetElement);
    targetElement.tree = tree;

    moveCursor(isFocused, alwaysMoveCursorToTheEnd, cursorPosition, targetElement, shouldScrollIntoView);
  } else {
    targetElement.tree = createRootTreeNode(targetElement);
  }

  handleCustomStyles(target, markdownStyle);
  return {text, cursorPosition: cursorPosition || 0};
}

export {updateInputStructure, parseRangesToHTMLNodes};
