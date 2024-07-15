import type {CSSProperties} from 'react';
import type {TreeNode} from './treeUtils';
import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';

const ZERO_WIDTH_SPACE = '\u200B';

// If an Input Method Editor is processing key input, the 'keyCode' is 229.
// https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
function isEventComposing(nativeEvent: globalThis.KeyboardEvent) {
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}

function getPlaceholderValue(placeholder: string | undefined) {
  if (!placeholder) {
    return ZERO_WIDTH_SPACE;
  }
  return placeholder.length ? placeholder : ZERO_WIDTH_SPACE;
}

function getElementHeight(node: HTMLDivElement, styles: CSSProperties, numberOfLines: number | undefined) {
  if (numberOfLines) {
    const tempElement = document.createElement('div');
    tempElement.setAttribute('contenteditable', 'true');
    Object.assign(tempElement.style, styles);
    tempElement.textContent = Array(numberOfLines).fill('A').join('\n');
    if (node.parentElement) {
      node.parentElement.appendChild(tempElement);
      const height = tempElement.clientHeight;
      node.parentElement.removeChild(tempElement);
      return height ? `${height}px` : 'auto';
    }
  }
  return styles.height ? `${styles.height}px` : 'auto';
}

function parseInnerHTMLToText(target: MarkdownTextInputElement) {
  function getParentType(node: TreeNode) {
    let currentNode = node;
    while (['text', 'br'].includes(currentNode.type)) {
      if (currentNode.parentNode) {
        currentNode = currentNode.parentNode;
      } else {
        return null;
      }
    }

    return currentNode.type;
  }

  const root = target.tree;

  if (root.childNodes.length === 0 || (root.childNodes.length === 1 && root.childNodes?.[0]?.type === 'line')) {
    return root.element.textContent ?? '';
  }

  const stack: TreeNode[] = [root];
  let text = '';
  let ShouldInsertNewlineAfterParagraph = false;
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) {
      break;
    }

    switch (node.type) {
      case 'line':
        if (ShouldInsertNewlineAfterParagraph) {
          text += '\n';
          ShouldInsertNewlineAfterParagraph = false;
        }
        if (node.element.textContent !== '') {
          ShouldInsertNewlineAfterParagraph = true;
        }
        break;
      case 'br':
        if (node.element.nodeName === 'BR') {
          const parentType = getParentType(node);
          if ((parentType === 'line' && node.parentNode?.element?.textContent === '') || parentType !== 'line') {
            text += `\n`;
          }
        } else if (node.element?.textContent) {
          text += node.element?.textContent;
        }
        break;
      case 'text':
        text += node.element.textContent;
        break;
      default:
        break;
    }

    let i = node.childNodes.length - 1;
    while (i > -1) {
      const child = node.childNodes[i];
      if (!child) {
        break;
      }

      stack.push(child);
      i--;
    }
  }

  return text;
}

export {isEventComposing, getPlaceholderValue, getElementHeight, parseInnerHTMLToText};
