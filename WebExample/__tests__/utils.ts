import type {Locator, Page} from '@playwright/test';
import {expect} from '@playwright/test';
// eslint-disable-next-line import/no-relative-packages
import * as TEST_CONST from '../../example/src/testConstants';

const setupInput = async (page: Page, action?: 'clear' | 'reset') => {
  const inputLocator = await page.locator(`div#${TEST_CONST.INPUT_ID}`);
  if (action) {
    await page.click(`[data-testid="${action}"]`);
  }

  return inputLocator;
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

const setCursorPosition = async (page: Page, elementIndex: number, offset?: number) => {
  return page.evaluate(
    // eslint-disable-next-line no-shadow
    async ({elementIndex, offset}) => {
      const filteredNode = Array.from(document.querySelectorAll('span[data-type="text"], span[data-type="br"]'));

      const node = filteredNode[elementIndex];

      if (node?.firstChild) {
        const range = new Range();
        const offsetValue = offset ?? node.firstChild.textContent?.length ?? 0;
        range.setStart(node.firstChild, offsetValue);
        range.setEnd(node.firstChild, offsetValue);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }

      return filteredNode;
    },
    {elementIndex, offset},
  );
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

const changeMarkdownStyle = async (page: Page) => {
  await page.click(`[data-testid="${TEST_CONST.TOGGLE_LINK_COLOR}"]`);
};

const setSelection = async (page: Page) => {
  await page.click(`[data-testid="${TEST_CONST.CHANGE_SELECTION}"]`);
};

const testMarkdownContentStyle = async ({testContent, style, page, dimmensions}: {testContent: string; style: string; page: Page; dimmensions?: {height: number; width: number}}) => {
  const inputLocator = await setupInput(page);

  const elementHandle = inputLocator.locator('span', {hasText: testContent}).last();
  const elementStyle = await getElementStyle(elementHandle);

  expect(elementStyle).toEqual(style);

  if (dimmensions && elementHandle) {
    await elementHandle.waitFor({state: 'attached'});
    // We need to get styles from the parent element because every text node is wrapped additionally with a span element
    const parentElementHandle = await elementHandle.evaluateHandle((element) => {
      return element.parentElement;
    });
    const elementDimmensions = await parentElementHandle.asElement()?.boundingBox();
    expect(Math.floor(elementDimmensions?.height ?? 0)).toEqual(dimmensions.height);
    expect(Math.floor(elementDimmensions?.width ?? 0)).toEqual(dimmensions.width);
  }
};

export {setupInput, getCursorPosition, setCursorPosition, getElementStyle, pressCmd, getElementValue, changeMarkdownStyle, setSelection, testMarkdownContentStyle};
