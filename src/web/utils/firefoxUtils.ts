import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import {getCurrentCursorPosition, setCursorPosition} from './cursorUtils';

function handleFirefoxRightArrowKeyNavigation(target: MarkdownTextInputElement, isSelectionEvent = false): void {
  const currentSelection = getCurrentCursorPosition(target);
  if (!currentSelection) {
    return;
  }

  const text = target.value;
  const cursorPos = currentSelection.end;

  const segmenter = new Intl.Segmenter('en', {granularity: 'grapheme'});
  const graphemes = Array.from(segmenter.segment(text));

  const nextGrapheme = graphemes.find(({index, segment}) => {
    const segmentEnd = index + segment.length;
    return cursorPos < segmentEnd;
  });

  const newCursorPos = nextGrapheme ? nextGrapheme.index + nextGrapheme.segment.length : text.length;

  setCursorPosition(target, isSelectionEvent ? currentSelection.start : newCursorPos, newCursorPos);
}
// eslint-disable-next-line import/prefer-default-export
export {handleFirefoxRightArrowKeyNavigation};
