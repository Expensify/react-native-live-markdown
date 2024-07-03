import type {CSSProperties} from 'react';
import BrowserUtils from './browserUtils';

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

const parseInnerHTMLToText = (target: HTMLElement): string => {
  let text = '';
  const childNodes = target.childNodes ?? [];
  childNodes.forEach((node, index) => {
    const nodeCopy = node.cloneNode(true) as HTMLElement;
    if (nodeCopy.innerHTML) {
      // Replace single <br> created by contentEditable with '\n', to enable proper newline deletion on backspace, when next lines also have <br> tags
      if (nodeCopy.innerHTML === '<br>') {
        nodeCopy.innerHTML = '\n';
      }
      // Replace only br tags with data-id attribute, because we know that were created by the web parser. We need to ignore tags created by contentEditable div
      nodeCopy.innerHTML = nodeCopy.innerHTML.replaceAll(/<br .*?>/g, '\n');
    }

    let nodeText = nodeCopy.textContent ?? '';

    // Remove unnecessary new lines from the end of the text
    if (
      (nodeText.length > 2 && nodeText[-3] !== '\n' && nodeText.slice(-2) === '\n\n') ||
      (BrowserUtils.isFirefox && nodeCopy.children?.[0]?.getAttribute('data-type') === 'br' && (nodeCopy.children?.[0]?.textContent?.length || -1) > 1)
    ) {
      nodeText = nodeText.slice(0, -1);
    }

    // Last line specific handling
    if (index === childNodes.length - 1) {
      if (nodeText === '\n\n') {
        // New line creation
        nodeText = '\n';
      } else if (nodeText === '\n') {
        // New line deletion on backspace
        nodeText = '';
      }
    }

    text += nodeText;
    // Split paragraphs with new lines
    if (/[^\n]/.test(nodeText) && index < childNodes.length - 1) {
      text += '\n';
    }
  });
  return text;
};

export {isEventComposing, getPlaceholderValue, getElementHeight, parseInnerHTMLToText};
