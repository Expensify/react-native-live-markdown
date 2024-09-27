import type {HTMLMarkdownElement} from '../../MarkdownTextInput.web';
import type {MarkdownRange, MarkdownType} from '../../commonTypes';

type NodeType = MarkdownType | 'line' | 'text' | 'br' | 'block' | 'root';

type TreeNode = Omit<MarkdownRange, 'type'> & {
  element: HTMLMarkdownElement;
  parentNode: TreeNode | null;
  childNodes: TreeNode[];
  type: NodeType;
  orderIndex: string;
  isGeneratingNewline: boolean;
};

function createRootTreeNode(target: HTMLMarkdownElement, length = 0): TreeNode {
  return {
    element: target,
    start: 0,
    length,
    parentNode: null,
    childNodes: [],
    type: 'root',
    orderIndex: '',
    isGeneratingNewline: false,
  };
}

function addNodeToTree(element: HTMLMarkdownElement, parentTreeNode: TreeNode, type: NodeType, length: number | null = null) {
  const contentLength = length || (element.nodeName === 'BR' || type === 'br' ? 1 : element.value?.length) || 0;
  const isGeneratingNewline = type === 'line' && !(element.childNodes.length === 1 && (element.childNodes[0] as HTMLElement)?.getAttribute?.('data-type') === 'br');
  const parentChildrenCount = parentTreeNode?.childNodes.length || 0;
  let startIndex = parentTreeNode.start;
  if (parentChildrenCount > 0) {
    const lastParentChild = parentTreeNode.childNodes[parentChildrenCount - 1];
    if (lastParentChild) {
      startIndex = lastParentChild.start + lastParentChild.length;
      startIndex += lastParentChild.isGeneratingNewline || (type !== 'block' && element.style.display === 'block') ? 1 : 0;
    }
  }

  const item: TreeNode = {
    element,
    parentNode: parentTreeNode,
    childNodes: [],
    start: startIndex,
    length: contentLength,
    type,
    orderIndex: parentTreeNode.parentNode === null ? `${parentChildrenCount}` : `${parentTreeNode.orderIndex},${parentChildrenCount}`,
    isGeneratingNewline,
  };

  element.setAttribute('data-id', item.orderIndex);
  parentTreeNode.childNodes.push(item);
  return item;
}

function updateTreeElementRefs(treeRoot: TreeNode, element: HTMLMarkdownElement) {
  const stack: TreeNode[] = [treeRoot];
  while (stack.length > 0) {
    const node = stack.pop() as TreeNode;
    stack.push(...node.childNodes);

    const currentElement = element.querySelector(`[data-id="${node.orderIndex}"]`) as HTMLMarkdownElement;
    node.element = currentElement;

    node.childNodes.forEach((child) => {
      stack.push(child);
    });
  }

  return treeRoot;
}

function findHTMLElementInTree(treeRoot: TreeNode, element: HTMLElement): TreeNode | null {
  if (element.hasAttribute?.('contenteditable')) {
    return treeRoot;
  }

  if (!element || !element.hasAttribute?.('data-id')) {
    return null;
  }
  const indexes = element.getAttribute('data-id')?.split(',');
  let el: TreeNode | null = treeRoot;

  while (el && indexes && indexes.length > 0) {
    const index = Number(indexes.shift() || -1);
    if (index < 0) {
      break;
    }

    if (el) {
      el = el.childNodes[index] || null;
    }
  }

  return el;
}

function getTreeNodeByIndex(treeRoot: TreeNode, index: number): TreeNode | null {
  let el: TreeNode | null = treeRoot;

  let i = 0;
  let newLineGenerated = false;
  while (el && el.childNodes.length > 0 && i < el.childNodes.length) {
    const child = el.childNodes[i] as TreeNode;

    if (!child) {
      break;
    }

    if (index >= child.start && index < child.start + child.length) {
      if (child.childNodes.length === 0) {
        return child;
      }
      el = child;
      i = 0;
    } else if ((child.isGeneratingNewline || newLineGenerated || i === el.childNodes.length - 1) && index === child.start + child.length) {
      newLineGenerated = true;
      if (child.childNodes.length === 0) {
        return child;
      }
      el = child;
      i = 0;
    } else {
      i++;
    }
  }
  return null;
}

export {addNodeToTree, findHTMLElementInTree, getTreeNodeByIndex, updateTreeElementRefs, createRootTreeNode};

export type {TreeNode, NodeType};
