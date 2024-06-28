import type {MarkdownRange, MarkdownType} from './parserUtils';

type NodeType = MarkdownType | 'line' | 'text' | 'br';

type TreeNode = Omit<MarkdownRange, 'type'> & {
  element: HTMLElement;
  parentNode: TreeNode | null;
  childNodes: TreeNode[];
  type: NodeType;
  orderIndex: string;
  isGeneratingNewline: boolean;
};

function addNodeToTree(element: HTMLElement, parentTreeNode: TreeNode, type: NodeType, length: number | null = null) {
  const contentLength = length || (element.nodeName === 'BR' || type === 'br' ? 1 : element.innerText?.length) || 0;
  const isGeneratingNewline = type === 'line' && !(element.childNodes.length === 1 && (element.childNodes[0] as HTMLElement)?.getAttribute('data-type') === 'br');
  const parentChildrenCount = parentTreeNode?.childNodes.length || 0;
  let startIndex = parentTreeNode.start;
  if (parentChildrenCount > 0) {
    const lastParentChild = parentTreeNode.childNodes[parentChildrenCount - 1];
    if (lastParentChild) {
      startIndex = lastParentChild.start + lastParentChild.length;
      startIndex += lastParentChild.isGeneratingNewline ? 1 : 0;
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

function buildTree(rootElement: HTMLElement, text: string) {
  function getElementType(element: HTMLElement): NodeType {
    if (element.nodeName === 'BR') {
      return 'br';
    }
    if (element.nodeName === 'P') {
      return 'line';
    }

    return (element.getAttribute('data-type') as NodeType) || 'text';
  }
  const rootTreeNode: TreeNode = {
    element: rootElement,
    parentNode: null,
    childNodes: [],
    start: 0,
    length: text.replace(/\n/g, '\\n').length,
    type: 'text',
    orderIndex: '',
    isGeneratingNewline: false,
  };
  const stack = [rootTreeNode];
  while (stack.length > 0) {
    const treeNode = stack.pop();
    if (!treeNode) {
      break;
    }

    Array.from(treeNode.element.children).forEach((childElement) => {
      const newTreeNode = addNodeToTree(childElement as HTMLElement, treeNode, getElementType(childElement as HTMLElement));
      stack.push(newTreeNode);
    });
  }

  return rootTreeNode;
}

function findHTMLElementInTree(treeRoot: TreeNode, element: HTMLElement): TreeNode | null {
  if (element.hasAttribute('contenteditable')) {
    return treeRoot;
  }

  if (!element || !element.hasAttribute('data-id')) {
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
    } else if ((child.isGeneratingNewline || newLineGenerated) && index === child.start + child.length) {
      newLineGenerated = true;
      if (child.childNodes.length === 0) {
        return child;
      }
      el = child;
      i = el.childNodes.length - 1;
    } else {
      i++;
    }
  }
  return null;
}

export {addNodeToTree, findHTMLElementInTree, getTreeNodeByIndex, buildTree};

export type {TreeNode, NodeType};
