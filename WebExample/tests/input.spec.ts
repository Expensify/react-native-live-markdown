import {test, expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import * as TEST_CONST from '../../testConstants';

const setupInput = async (page: Page, mode: 'clear' | 'reset') => {
  const inputLocator = await page.locator(`div#MarkdownInput_Example`);
  await page.click(`[data-testid="${mode}"]`);

  return inputLocator;
};

test.beforeEach(async ({page}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
});

test.describe('standard input behaviour', () => {
  test('standard input results', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');

    await inputLocator.pressSequentially(TEST_CONST.EXAMPLE_CONTENT);
    const value = await inputLocator.innerText();
    expect(value).toEqual(TEST_CONST.EXAMPLE_CONTENT);
  });

  test('fast type cursor position', async ({page}) => {
    const EXAMPLE_LONG_CONTENT = TEST_CONST.EXAMPLE_CONTENT.repeat(3);

    const inputLocator = await setupInput(page, 'clear');

    await inputLocator.pressSequentially(EXAMPLE_LONG_CONTENT);

    expect(await inputLocator.innerText()).toBe(EXAMPLE_LONG_CONTENT);

    const cursorPosition = await page.evaluate(() => {
      const editableDiv = document.querySelector('div[contenteditable="true"]') as HTMLElement;
      const range = window.getSelection()?.getRangeAt(0);
      if (!range || !editableDiv) return null;
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editableDiv);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    });

    expect(cursorPosition).toBe(EXAMPLE_LONG_CONTENT.length);
  });
});
