import {test, expect} from '@playwright/test';
import type {Locator, Page} from '@playwright/test';
import * as TEST_CONST from './testConstants';
import {checkCursorPosition, setupInput, getElementStyle, pressCmd} from './utils';

const pasteContent = async ({text, page, inputLocator}: {text: string; page: Page; inputLocator: Locator}) => {
  await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), text);
  await inputLocator.focus();
  await pressCmd({inputLocator, command: 'v'});
};

test.beforeEach(async ({page, context, browserName}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
  if (browserName === 'chromium') {
    await context.grantPermissions(['clipboard-write', 'clipboard-read']);
  }
});

test.describe('paste content', () => {
  test.skip(({browserName}) => !!process.env.CI && browserName === 'webkit', 'Excluded from WebKit CI tests');

  test('paste', async ({page}) => {
    const PASTE_TEXT = 'bold';
    const BOLD_STYLE = 'font-weight: bold;';

    const inputLocator = await setupInput(page, 'clear');

    const wrappedText = '*bold*';
    await pasteContent({text: wrappedText, page, inputLocator});

    const elementHandle = await inputLocator.locator('span', {hasText: PASTE_TEXT}).last();
    const elementStyle = await getElementStyle(elementHandle);

    expect(elementStyle).toEqual(BOLD_STYLE);
  });

  test('paste replace', async ({page}) => {
    const inputLocator = await setupInput(page, 'reset');

    await inputLocator.focus();
    await pressCmd({inputLocator, command: 'a'});

    const newText = '*bold*';
    await pasteContent({text: newText, page, inputLocator});

    expect(await inputLocator.innerText()).toBe(newText);
  });

  test('paste undo', async ({page, browserName}) => {
    test.skip(!!process.env.CI && browserName === 'firefox', 'Excluded from Firefox CI tests');

    const PASTE_TEXT_FIRST = '*bold*';
    const PASTE_TEXT_SECOND = '@here';

    const inputLocator = await setupInput(page, 'clear');

    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_FIRST);

    await pressCmd({inputLocator, command: 'v'});
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);
    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_SECOND);
    await pressCmd({inputLocator, command: 'v'});
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);

    await pressCmd({inputLocator, command: 'z'});

    expect(await inputLocator.innerText()).toBe(PASTE_TEXT_FIRST);
  });

  test('paste redo', async ({page}) => {
    const PASTE_TEXT_FIRST = '*bold*';
    const PASTE_TEXT_SECOND = '@here';

    const inputLocator = await setupInput(page, 'clear');

    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_FIRST);
    await pressCmd({inputLocator, command: 'v'});
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);
    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_SECOND);
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);
    await pressCmd({inputLocator, command: 'v'});
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);

    await pressCmd({inputLocator, command: 'z'});
    await pressCmd({inputLocator, command: 'Shift+z'});

    expect(await inputLocator.innerText()).toBe(`${PASTE_TEXT_FIRST}${PASTE_TEXT_SECOND}`);
  });
});

test('select all', async ({page}) => {
  const inputLocator = await setupInput(page, 'reset');
  await inputLocator.focus();
  await pressCmd({inputLocator, command: 'a'});

  const cursorPosition = await page.evaluate(checkCursorPosition);

  expect(cursorPosition).toBe(TEST_CONST.EXAMPLE_CONTENT.length);
});

test('cut content changes', async ({page, browserName}) => {
  test.skip(!!process.env.CI && browserName === 'webkit', 'Excluded from WebKit CI tests');

  const INITIAL_CONTENT = 'bold';
  const WRAPPED_CONTENT = `*${INITIAL_CONTENT}*`;
  const EXPECTED_CONTENT = WRAPPED_CONTENT.slice(0, 3);

  const inputLocator = await setupInput(page, 'clear');
  await pasteContent({text: WRAPPED_CONTENT, page, inputLocator});
  const rootHandle = await inputLocator.locator('span.root').first();

  await page.evaluate(async (initialContent) => {
    const filteredNode = Array.from(document.querySelectorAll('div[contenteditable="true"] > span.root span')).find((node) => {
      return node.textContent?.includes(initialContent) && node.nextElementSibling && node.nextElementSibling.textContent?.includes('*');
    });

    const startNode = filteredNode;
    const endNode = filteredNode?.nextElementSibling;

    if (startNode?.firstChild && endNode?.lastChild) {
      const range = new Range();
      range.setStart(startNode.firstChild, 2);
      range.setEnd(endNode.lastChild, endNode.lastChild.textContent?.length ?? 0);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, INITIAL_CONTENT);

  await inputLocator.focus();
  await pressCmd({inputLocator, command: 'x'});

  expect(await rootHandle.innerHTML()).toBe(EXPECTED_CONTENT);
});
