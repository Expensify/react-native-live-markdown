import * as BrowserUtils from './browserUtils';

type Selection = {
  start: number;
  end: number;
};

let prevTextLength: number | undefined;

function getPrevTextLength() {
  return prevTextLength;
}

function findTextNodes(textNodes: Text[], node: ChildNode) {
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node as Text);
  } else {
    for (let i = 0, length = node.childNodes.length; i < length; ++i) {
      const childNode = node.childNodes[i];
      if (childNode) {
        findTextNodes(textNodes, childNode);
      }
    }
  }
}

function setPrevText(target: HTMLElement) {
  let text = [];
  const textNodes: Text[] = [];
  findTextNodes(textNodes, target);
  text = textNodes
    .map((e) => e.nodeValue ?? '')
    ?.join('')
    ?.split('');

  prevTextLength = text.length;
}

function setCursorPosition(target: HTMLElement, start: number, end: number | null = null) {
  // We don't want to move the cursor if the target is not focused
  if (target !== document.activeElement) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(target);

  const textNodes: Text[] = [];
  findTextNodes(textNodes, target);

  // These are utilities for handling the boundary cases (especially onEnter)
  // prevChar & nextChar are characters before & after the target cursor position
  const textCharacters = textNodes
    .map((e) => e.nodeValue ?? '')
    ?.join('')
    ?.split('');
  const prevChar = textCharacters?.[start - 1] ?? '';
  const nextChar = textCharacters?.[start] ?? '';

  let charCount = 0;
  let startNode: Text | null = null;
  let endNode: Text | null = null;
  const n = textNodes.length;
  for (let i = 0; i < n; ++i) {
    const textNode = textNodes[i];
    if (textNode) {
      const nextCharCount = charCount + textNode.length;

      if (!startNode && start >= charCount && (start <= nextCharCount || (start === nextCharCount && i < n - 1))) {
        startNode = textNode;

        // There are 4 cases to consider here:
        // 1. Caret in front of a character, when pressing enter
        // 2. Caret at the end of a line (not last one)
        // 3. Caret at the end of whole input, when pressing enter
        // 4. All other placements
        if (prevChar === '\n' && prevTextLength !== undefined && prevTextLength < textCharacters.length) {
          if (nextChar && nextChar !== '\n' && i !== n - 1) {
            range.setStart(textNodes[i + 1] as Node, 0);
          } else if (i !== textNodes.length - 1) {
            range.setStart(textNodes[i] as Node, 1);
          } else {
            range.setStart(textNode, start - charCount);
          }
        } else {
          range.setStart(textNode, start - charCount);
        }
        if (!end) {
          break;
        }
      }
      if (end && !endNode && end >= charCount && (end <= nextCharCount || (end === nextCharCount && i < n - 1))) {
        endNode = textNode;
        range.setEnd(textNode, end - charCount);
      }
      charCount = nextCharCount;
    }
  }

  if (!end) {
    range.collapse(true);
  }

  const selection = window.getSelection();
  if (selection) {
    selection.setBaseAndExtent(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
  }

  scrollCursorIntoView(target as HTMLInputElement);
}

function moveCursorToEnd(target: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();
  if (selection) {
    range.setStart(target, target.childNodes.length);
    range.collapse(true);
    selection.setBaseAndExtent(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
  }
}

function getCurrentCursorPosition(target: HTMLElement) {
  const selection = window.getSelection();
  if (!selection || (selection && selection.rangeCount === 0)) {
    return null;
  }
  const range = selection.getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(target);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const start = preSelectionRange.toString().length;
  const end = start + range.toString().length;
  return {start, end};
}

function removeSelection() {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
}

function scrollCursorIntoView(target: HTMLInputElement) {
  if (target.selectionStart === null || !target.value || BrowserUtils.isFirefox) {
    return;
  }

  const selection = window.getSelection();
  if (!selection || (selection && selection.rangeCount === 0)) {
    return;
  }

  const caretRects = selection.getRangeAt(0).getClientRects();

  // we'll find the caretRect from the DOMRectList above with the largest bottom value
  let currentCaretRect = caretRects[0];
  if (currentCaretRect) {
    for (let i = 1; i < caretRects.length; i++) {
      const caretRect = caretRects[i];
      if (caretRect && caretRect.bottom > currentCaretRect.bottom) {
        currentCaretRect = caretRect;
      }
    }
  }

  const editableRect = target.getBoundingClientRect();

  // Adjust for padding and border
  const paddingTop = parseFloat(window.getComputedStyle(target).paddingTop);
  const borderTop = parseFloat(window.getComputedStyle(target).borderTopWidth);

  if (currentCaretRect && !(currentCaretRect.top >= editableRect.top + paddingTop + borderTop && currentCaretRect.bottom <= editableRect.bottom - 2 * (paddingTop - borderTop))) {
    const topToCaret = currentCaretRect.top - editableRect.top;
    const inputHeight = editableRect.height;
    // Chrome Rects don't include padding & border, so we're adding them manually
    const inputOffset = currentCaretRect.height - inputHeight + paddingTop + borderTop + (BrowserUtils.isChromium ? 0 : 4 * (paddingTop + borderTop));

    target.scrollTo(0, topToCaret + target.scrollTop + inputOffset);
  }
}

export type {Selection};
export {getCurrentCursorPosition, moveCursorToEnd, setCursorPosition, setPrevText, removeSelection, scrollCursorIntoView, getPrevTextLength};
