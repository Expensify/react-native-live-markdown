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
  const graphemes = Array.from(segmenter.segment(text));

  if (direction === 'right') {
    const cursorPos = currentSelection.end;
    const nextGrapheme = graphemes.find(({index, segment}) => {
      const segmentEnd = index + segment.length;
      return cursorPos < segmentEnd;
    });

    const newCursorPos = nextGrapheme ? nextGrapheme.index + nextGrapheme.segment.length : text.length;
    setCursorPosition(target, isSelectionEvent ? currentSelection.start : newCursorPos, newCursorPos);
  } else {
    const cursorPos = currentSelection.start;
    const prevGrapheme = graphemes.findLast(({index, segment}) => {
      const segmentEnd = index + segment.length;
      return segmentEnd < cursorPos;
    });

    const newCursorPos = prevGrapheme ? prevGrapheme.index + prevGrapheme.segment.length : 0;
    setCursorPosition(target, newCursorPos, isSelectionEvent ? currentSelection.end : newCursorPos);
  }
}

// eslint-disable-next-line import/prefer-default-export
export {handleFirefoxArrowKeyNavigation};
