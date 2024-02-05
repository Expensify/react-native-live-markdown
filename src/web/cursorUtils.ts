function createRange(node: HTMLElement, targetPosition: number, ignoreNewLines = false) {
  const range = document.createRange();
  range.selectNode(node);

  let pos = 0;
  const stack: Node[] = [node];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      break;
    }
    if (current.nodeType === Node.TEXT_NODE || current.nodeName === 'BR') {
      const textContentLength = current.textContent ? current.textContent.length : 0;
      const len = current.nodeName === 'BR' ? 1 : textContentLength;
      if (pos + len >= targetPosition) {
        if (current.nodeName === 'BR') {
          range.setStartAfter(current);
          (current as HTMLElement).scrollIntoView();
        } else {
          range.setStart(current, targetPosition - pos);
        }
        return range;
      }
      pos += len;
    } else if (current.childNodes && current.childNodes.length > 0) {
      for (let i = current.childNodes.length - 1; i >= 0; i--) {
        const currentNode = current.childNodes[i];
        if (currentNode && (!ignoreNewLines || (ignoreNewLines && currentNode.nodeName !== 'BR'))) {
          stack.push(currentNode);
        }
      }
    }
  }

  range.setStart(node, node.childNodes.length);
  return range;
}

function setCursorPosition(target: HTMLElement, targetPosition: number, ignoreNewLines = false) {
  const range = createRange(target, targetPosition, ignoreNewLines);
  const selection = window.getSelection();
  if (selection) {
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
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

function getIndexedPosition(target: HTMLElement, range: Range, isStart: boolean) {
  const marker = document.createTextNode('\0');
  const rangeClone = range.cloneRange();

  rangeClone.collapse(isStart);

  rangeClone.insertNode(marker);
  const position = target.innerText.indexOf('\0');
  if (marker.parentNode) {
    marker.parentNode.removeChild(marker);
  }

  return position;
}

function getCurrentCursorPosition(target: HTMLElement) {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return {start: target.innerText.length, end: target.innerText.length};
  }

  const range = selection.getRangeAt(0);
  const start = getIndexedPosition(target, range, true);
  const end = getIndexedPosition(target, range, false);
  return {start, end};
}

export {getCurrentCursorPosition, moveCursorToEnd, setCursorPosition};
