import type {Locator, Page} from '@playwright/test';
// eslint-disable-next-line import/no-relative-packages
import * as TEST_CONST from '../../example/src/testConstants';

const setupInput = async (page: Page, action?: 'clear' | 'reset') => {
  const inputLocator = await page.locator(`div#${TEST_CONST.INPUT_ID}`);
  if (action) {
    await page.click(`[data-testid="${action}"]`);
  }

  return inputLocator;
};

const changeMarkdownStyle = async (page: Page) => {
  await page.click(`[data-testid="${TEST_CONST.TOGGLE_LINK_COLOR}"]`);
};

const setSelection = async (page: Page) => {
  await page.click(`[data-testid="${TEST_CONST.CHANGE_SELECTION}"]`);
};

const getCursorPosition = async (elementHandle: Locator) => {
  const inputSelectionHandle = await elementHandle.evaluateHandle(
    (
      div: HTMLInputElement & {
        selection: {start: number; end: number};
      },
    ) => div.selection,
  );
  const selection = await inputSelectionHandle.jsonValue();
  return selection;
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
    // We need to get styles from the parent element because every text node is wrapped additionally with a span element
    const parentElementHandle = await elementHandle.evaluateHandle((element) => {
      return element.parentElement;
    });
    elementStyle = await parentElementHandle.asElement()?.getAttribute('style');
  }
  return elementStyle;
};

const pressCmd = async ({inputLocator, command}: {inputLocator: Locator; command: string}) => {
  const OPERATION_MODIFIER = process.platform === 'darwin' ? 'Meta' : 'Control';

  await inputLocator.press(`${OPERATION_MODIFIER}+${command}`);
};

const getElementValue = async (elementHandle: Locator) => {
  const inputValueHandle = await elementHandle.evaluateHandle((div: HTMLInputElement) => div.value);
  const value = await inputValueHandle.jsonValue();
  return value;
};

export {setupInput, getCursorPosition, setCursorPosition, getElementStyle, pressCmd, getElementValue, changeMarkdownStyle, setSelection};
