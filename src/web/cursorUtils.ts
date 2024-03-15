import * as BrowserUtils from './browserUtils';

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

function setCursorPosition(target: HTMLElement, start: number, end: number | null = null) {
  const range = document.createRange();
  range.selectNodeContents(target);

  const textNodes: Text[] = [];
  findTextNodes(textNodes, target);

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
        range.setStart(textNode, start - charCount);
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
    selection.removeAllRanges();
    selection.addRange(range);
  }

  scrollCursorIntoView(target as HTMLInputElement);
}

function moveCursorToEnd(target: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();
  if (selection) {
    range.setStart(target, target.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
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
  if (!selection) {
    return;
  }

  const caretRect = selection.getRangeAt(0).getClientRects()[0];
  const editableRect = target.getBoundingClientRect();

  // Adjust for padding and border
  const paddingTop = parseFloat(window.getComputedStyle(target).paddingTop);
  const borderTop = parseFloat(window.getComputedStyle(target).borderTopWidth);

  if (caretRect && !(caretRect.top >= editableRect.top + paddingTop + borderTop && caretRect.bottom <= editableRect.bottom - 2 * (paddingTop - borderTop))) {
    const topToCaret = caretRect.top - editableRect.top;
    const inputHeight = editableRect.height;
    // Chrome Rects don't include padding & border, so we're adding them manually
    const inputOffset = caretRect.height - inputHeight + paddingTop + borderTop + (BrowserUtils.isChromium ? 0 : 4 * (paddingTop + borderTop));

    target.scrollTo(0, topToCaret + target.scrollTop + inputOffset);
  }
}

export {getCurrentCursorPosition, moveCursorToEnd, setCursorPosition, removeSelection, scrollCursorIntoView};
