import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import {findHTMLElementInTree, getTreeNodeByIndex} from './treeUtils';
import type {TreeNode} from './treeUtils';

function setCursorPosition(target: MarkdownTextInputElement, startIndex: number, endIndex: number | null = null, shouldScrollIntoView = false) {
  // We don't want to move the cursor if the target is not focused
  if (!target.tree || target !== document.activeElement) {
    return;
  }

  const start = Math.max(0, Math.min(startIndex, target.tree.length));
  const end = endIndex ? Math.max(0, Math.min(endIndex, target.tree.length)) : null;
  if (end && end < start) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(target);

  const startTreeNode = getTreeNodeByIndex(target.tree, start);
  const endTreeNode = end && startTreeNode && (end < startTreeNode.start || end >= startTreeNode.start + startTreeNode.length) ? getTreeNodeByIndex(target.tree, end) : startTreeNode;
  if (!startTreeNode || !endTreeNode) {
    console.error('Invalid start or end tree node');
    return;
  }

  if (startTreeNode.type === 'br') {
    range.setStartBefore(startTreeNode.element);
  } else {
    const startElement = startTreeNode.element;
    range.setStart((startElement.childNodes[0] || startElement) as ChildNode, start - startTreeNode.start);
  }

  if (endTreeNode.type === 'br') {
    range.setEndBefore(endTreeNode.element);
  } else {
    const endElement = endTreeNode.element;
    range.setEnd((endElement.childNodes[0] || endElement) as ChildNode, (end || start) - endTreeNode.start);
  }

  if (!end) {
    range.collapse(true);
  }

  const selection = window.getSelection();
  if (selection) {
    selection.setBaseAndExtent(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
  }

  if (shouldScrollIntoView) {
    scrollIntoView(target, endTreeNode);
  }
}

function scrollIntoView(target: MarkdownTextInputElement, node: TreeNode) {
  const targetElement = target;
  if (node.type === 'br' && node.parentNode?.parentNode?.type === 'line') {
    // If the node is a line break, scroll to the parent paragraph, because Safari doesn't support scrollIntoView on br elements
    node.parentNode.parentNode.element.scrollIntoView({
      block: 'nearest',
    });
  } else {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const caretRect = range.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // In case the caret is below the visible input area, scroll to the end of the node
      if (caretRect.top + caretRect.height > targetRect.top + targetRect.height) {
        targetElement.scrollTop = caretRect.top + caretRect.height - targetRect.top - targetRect.height + target.scrollTop;
      }
    }

    node.element.scrollIntoView({
      block: 'nearest',
    });
  }
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

  const startTreeNode = findHTMLElementInTree(target.tree, startElement);
  const endTreeNode = findHTMLElementInTree(target.tree, endElement);

  let start = -1;
  let end = -1;
  if (startTreeNode && endTreeNode) {
    start = startTreeNode.start + range.startOffset;

    // If the end node is a root node, we need to set the end to the end of the text (FireFox fix)
    if (endTreeNode?.parentNode === null) {
      end = target.value.length;
    } else {
      end = endTreeNode.start + range.endOffset;
    }
  }
  return {start, end};
}

function removeSelection() {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
}

export {getCurrentCursorPosition, moveCursorToEnd, setCursorPosition, removeSelection, scrollIntoView};
