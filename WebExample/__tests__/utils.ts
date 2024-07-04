import type {Locator, Page} from '@playwright/test';
import * as TEST_CONST from '../../example/src/testConstants';
import type {MarkdownTextInputElement} from '../../src/MarkdownTextInput.web';
import {getCurrentCursorPosition} from '../../src/web/utils/cursorUtils';

const setupInput = async (page: Page, action?: 'clear' | 'reset') => {
  const inputLocator = await page.locator(`div#${TEST_CONST.INPUT_ID}`);
  if (action) {
    await page.click(`[data-testid="${action}"]`);
  }

  return inputLocator;
};

const checkCursorPosition = () => {
  const editableDiv = document.querySelector('div[contenteditable="true"]') as MarkdownTextInputElement;

  return getCurrentCursorPosition(editableDiv);
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

const getElementValue = async (elementHandle: Locator) => {
  const customVariableValue = await elementHandle.evaluateHandle((div: MarkdownTextInputElement) => div.value);
  const value = await customVariableValue.jsonValue();
  return value;
};

export {setupInput, checkCursorPosition, setCursorPosition, getElementStyle, pressCmd, getElementValue};
