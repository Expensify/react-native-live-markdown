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
  if (target.selectionStart === null || !target.value) {
    return;
  }
  const lineHeight = target.scrollHeight / target.value.split('\n').length;
  const linesFromTop = target.value.substring(0, target.selectionStart + 1).split('\n').length;
  target.scrollTo(0, lineHeight * (linesFromTop - 1));
}

export {getCurrentCursorPosition, moveCursorToEnd, setCursorPosition, removeSelection, scrollCursorIntoView};
