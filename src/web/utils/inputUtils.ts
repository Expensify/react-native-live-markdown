import type {CSSProperties} from 'react';
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

const parseInnerHTMLToText = (target: MarkdownTextInputElement): string => {
  function getTopParentNode(node: ChildNode) {
    let currentParentNode = node.parentNode;
    while (currentParentNode && ['text', 'br', 'line'].includes(currentParentNode.parentElement?.getAttribute('data-type') || '')) {
      currentParentNode = currentParentNode?.parentNode || null;
    }
    return currentParentNode;
  }

  const stack: ChildNode[] = [target];
  let text = '';
  let shouldAddNewline = false;

  const n = target.childNodes.length;
  const lastNode = target.childNodes[n - 1];
  if (lastNode?.nodeName === 'DIV' && (lastNode as HTMLElement)?.innerHTML === '<br>') {
    target.removeChild(lastNode);
  }

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) {
      break;
    }

    const isTopComponent = node.parentElement?.contentEditable === 'true';
    if (isTopComponent) {
      if (shouldAddNewline) {
        text += '\n';
        shouldAddNewline = false;
      }

      if (!shouldAddNewline) {
        shouldAddNewline = true;
      }
    }

    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeName === 'BR') {
      const parentNode = getTopParentNode(node);
      if (parentNode && parentNode.nodeName !== 'DIV' && parentNode.nodeName !== 'P') {
        text += '\n';
      }
    } else {
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
  }

  return text;
};

export {isEventComposing, getPlaceholderValue, getElementHeight, parseInnerHTMLToText};
