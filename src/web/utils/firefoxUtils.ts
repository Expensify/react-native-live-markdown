import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import {getCurrentCursorPosition, setCursorPosition} from './cursorUtils';

/**
 * Ensures consistent arrow navigation across grapheme clusters (like emojis)
 */
function handleFirefoxArrowKeyNavigation(target: MarkdownTextInputElement, isSelectionEvent = false, direction: 'right' | 'left' = 'right'): void {
  const currentSelection = getCurrentCursorPosition(target);
  if (!currentSelection) {
    return;
  }

  const text = target.value;

  const segmenter = new Intl.Segmenter('en', {granularity: 'grapheme'});
  const segments = segmenter.segment(text);

  if (direction === 'right') {
    const cursorPos = currentSelection.end;
    let newCursorPos = text.length;

    // eslint-disable-next-line no-restricted-syntax
    for (const {index, segment} of segments) {
      const segmentEnd = index + segment.length;
      if (cursorPos < segmentEnd) {
        newCursorPos = segmentEnd;
        break;
      }
    }
    setCursorPosition(target, isSelectionEvent ? currentSelection.start : newCursorPos, newCursorPos);
    return;
  }
  const cursorPos = currentSelection.start;
  let newCursorPos = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const {index, segment} of segments) {
    const segmentEnd = index + segment.length;
    if (segmentEnd < cursorPos) {
      newCursorPos = segmentEnd;
    }
  }

  setCursorPosition(target, newCursorPos, isSelectionEvent ? currentSelection.end : newCursorPos);
}

// eslint-disable-next-line import/prefer-default-export
export {handleFirefoxArrowKeyNavigation};
