import type {CSSProperties} from 'react';
import type {MarkdownNativeEvent, MarkdownTextInputElement} from '../../MarkdownTextInput.web';

const ZERO_WIDTH_SPACE = '\u200B';

// If an Input Method Editor is processing key input, the 'keyCode' is 229.
// https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
function isEventComposing(nativeEvent: globalThis.KeyboardEvent | MarkdownNativeEvent) {
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

function normalizeValue(value: string) {
  return value.replaceAll('\r\n', '\n');
}

// Parses the HTML structure of a MarkdownTextInputElement to a plain text string. Used for getting the correct value of the input element.
function parseInnerHTMLToText(target: MarkdownTextInputElement, cursorPosition: number, inputType?: string): string {
  // Returns the parent of a given node that is higher in the hierarchy and is of a different type than 'text', 'br' or 'line'
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
  const lastNode = target.childNodes[target.childNodes.length - 1];
  // Remove the last <br> element if it's the last child of the target element. Fixes the issue with adding extra newline when pasting into the empty input.
  if (lastNode?.nodeName === 'DIV' && (lastNode as HTMLElement)?.innerHTML === '<br>') {
    target.removeChild(lastNode);
  }

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) {
      break;
    }

    // If we are operating on the nodes that are children of the MarkdownTextInputElement, we need to add a newline after each
    const isTopComponent = node.parentElement?.contentEditable === 'true';
    if (isTopComponent) {
      // Replaced text is beeing added as text node, so we need to not add the newline before and after it
      if (node.nodeType === Node.TEXT_NODE) {
        shouldAddNewline = false;
      } else {
        const firstChild = node.firstChild as HTMLElement;
        const containsEmptyBlockElement = firstChild?.getAttribute?.('data-type') === 'block' && firstChild.textContent === '';
        if (shouldAddNewline && !containsEmptyBlockElement) {
          text += '\n';
          shouldAddNewline = false;
        }
        shouldAddNewline = true;
      }
    }

    if (node.nodeType === Node.TEXT_NODE) {
      // Parse text nodes into text
      text += node.textContent;
    } else if (node.nodeName === 'BR') {
      const parentNode = getTopParentNode(node);
      if (parentNode && parentNode.parentElement?.contentEditable !== 'true' && !!(node as HTMLElement).getAttribute('data-id')) {
        // Parse br elements into newlines only if their parent is not a child of the MarkdownTextInputElement (a paragraph when writing or a div when pasting).
        // It prevents adding extra newlines when entering text
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
  text = text.replaceAll('\r\n', '\n');

  // Force letter removal if the input value haven't changed but input type is 'delete'
  if (text === target.value && inputType?.includes('delete')) {
    text = text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
  }
  return text;
}

export {isEventComposing, getPlaceholderValue, getElementHeight, parseInnerHTMLToText, normalizeValue};
