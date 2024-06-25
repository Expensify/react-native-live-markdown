import type {Locator, Page} from '@playwright/test';
import * as TEST_CONST from './testConstants';

const setupInput = async (page: Page, action?: 'clear' | 'reset') => {
  const inputLocator = await page.locator(`div#${TEST_CONST.INPUT_ID}`);
  if (action) {
    await page.click(`[data-testid="${action}"]`);
  }

  return inputLocator;
};

const checkCursorPosition = () => {
  const editableDiv = document.querySelector('div[contenteditable="true"]') as HTMLElement;
  const range = window.getSelection()?.getRangeAt(0);
  if (!range || !editableDiv) {
    return null;
  }
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(editableDiv);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
};

const setCursorPosition = ({startNode, endNode}: {startNode?: Element; endNode?: Element | null}) => {
  if (!startNode?.firstChild || !endNode?.lastChild) {
    return null;
  }

  const range = new Range();
  range.setStart(startNode.firstChild, 2);
  range.setEnd(endNode.lastChild, endNode.lastChild.textContent?.length ?? 0);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  return selection;
};

const getElementStyle = async (elementHandle: Locator) => {
  let elementStyle;

  if (elementHandle) {
    await elementHandle.waitFor({state: 'attached'});

    elementStyle = await elementHandle.getAttribute('style');
  }
  return elementStyle;
};

const pressCmd = async ({inputLocator, command}: {inputLocator: Locator; command: string}) => {
  const OPERATION_MODIFIER = process.platform === 'darwin' ? 'Meta' : 'Control';

  await inputLocator.press(`${OPERATION_MODIFIER}+${command}`);
};

export {setupInput, checkCursorPosition, setCursorPosition, getElementStyle, pressCmd};
