import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import BrowserUtils from './browserUtils';
import {findHTMLElementInTree, getTreeNodeByIndex} from './treeUtils';

function setCursorPosition(target: MarkdownTextInputElement, start: number, end: number | null = null) {
  // We don't want to move the cursor if the target is not focused
  if (target !== document.activeElement || start < 0 || (end && end < 0)) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(target);

  const startTreeItem = getTreeNodeByIndex(target.tree, start);
  const endTreeItem = end && startTreeItem && (end < startTreeItem.start || end >= startTreeItem.start + startTreeItem.length) ? getTreeNodeByIndex(target.tree, end) : startTreeItem;
  if (!startTreeItem || !endTreeItem) {
    throw new Error('Invalid start or end tree item');
  }

  if (startTreeItem.type === 'br') {
    range.setStartBefore(startTreeItem.element);
  } else {
    range.setStart(startTreeItem.element.childNodes[0] as ChildNode, start - startTreeItem.start);
  }

  if (endTreeItem.type === 'br') {
    range.setEndBefore(endTreeItem.element);
  } else {
    range.setEnd(endTreeItem.element.childNodes[0] as ChildNode, (end || start) - endTreeItem.start);
  }

  if (!end) {
    range.collapse(true);
  }

  const selection = window.getSelection();
  if (selection) {
    selection.setBaseAndExtent(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
  }

  scrollCursorIntoView(target);
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

function getCurrentCursorPosition(target: MarkdownTextInputElement) {
  function getHTMLElement(node: Node) {
    let element = node as HTMLElement | Text;
    if (element instanceof Text) {
      element = node.parentElement as HTMLElement;
    }
    return element;
  }

  const selection = window.getSelection();
  if (!selection || (selection && selection.rangeCount === 0)) {
    return null;
  }
  const range = selection.getRangeAt(0);
  const startElement = getHTMLElement(range.startContainer);
  const endElement = range.startContainer === range.endContainer ? startElement : getHTMLElement(range.endContainer);

  const startTreeItem = findHTMLElementInTree(target.tree, startElement);
  const endTreeItem = findHTMLElementInTree(target.tree, endElement);

  let start = -1;
  let end = -1;
  if (startTreeItem && endTreeItem) {
    start = startTreeItem.start + range.startOffset;
    end = endTreeItem.start + range.endOffset;
  }
  return {start, end};
}

function removeSelection() {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
}

function scrollCursorIntoView(target: MarkdownTextInputElement) {
  if (target.selectionStart === null || !target.value || BrowserUtils.isFirefox) {
    return;
  }

  const selection = window.getSelection();
  if (!selection || (selection && selection.rangeCount === 0)) {
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
