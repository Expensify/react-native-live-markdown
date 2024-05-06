import {test, expect} from '@playwright/test';
import type {Locator, Page} from '@playwright/test';
import * as TEST_CONST from '../../testConstants';
import {checkCursorPosition, setupInput} from './utils';

const OPERATION_MODIFIER = process.platform === 'darwin' ? 'Meta' : 'Control';

const pasteContent = async ({text, page, inputLocator}: {text: string; page: Page; inputLocator: Locator}) => {
  await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), text);
  await inputLocator.focus();
  await inputLocator.press(`${OPERATION_MODIFIER}+v`);
};

test.beforeEach(async ({page, context, browserName}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-write', 'clipboard-read']);
});

test.describe('paste content', () => {
  test('paste', async ({page}) => {
    const PASTE_TEXT = 'bold';
    const boldStyleDefinition = TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.bold;

    const inputLocator = await setupInput(page, 'clear');

    const wrappedText = boldStyleDefinition.wrapContent(PASTE_TEXT);
    await pasteContent({text: wrappedText, page, inputLocator});

    const elementHandle = await inputLocator.locator('span', {hasText: PASTE_TEXT}).last();
    let elementStyle;
    if (elementHandle) {
      await elementHandle.waitFor({state: 'attached'});

      elementStyle = await elementHandle.getAttribute('style');
    }
    expect(elementStyle).toEqual(boldStyleDefinition.style);
  });

  test('paste replace', async ({page}) => {
    const inputLocator = await setupInput(page, 'reset');

    await inputLocator.focus();
    await inputLocator.press(`${OPERATION_MODIFIER}+a`);

    const newText = '*bold*';
    await pasteContent({text: newText, page, inputLocator});

    expect(await inputLocator.innerText()).toBe(newText);
  });

  test('paste undo', async ({page}) => {
    const PASTE_TEXT_FIRST = '*bold*';
    const PASTE_TEXT_SECOND = '@here';

    const inputLocator = await setupInput(page, 'clear');

    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_FIRST);

    await inputLocator.press(`${OPERATION_MODIFIER}+v`);
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);
    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_SECOND);
    await inputLocator.press(`${OPERATION_MODIFIER}+v`);
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);

    await inputLocator.press(`${OPERATION_MODIFIER}+z`);

    expect(await inputLocator.innerText()).toBe(PASTE_TEXT_FIRST);
  });

  test('paste redo', async ({page}) => {
    const PASTE_TEXT_FIRST = '*bold*';
    const PASTE_TEXT_SECOND = '@here';

    const inputLocator = await setupInput(page, 'clear');

    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_FIRST);
    await inputLocator.press(`${OPERATION_MODIFIER}+v`);
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);
    await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), PASTE_TEXT_SECOND);
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);
    await inputLocator.press(`${OPERATION_MODIFIER}+v`);
    await page.waitForTimeout(TEST_CONST.INPUT_HISTORY_DEBOUNCE_TIME_MS);

    await inputLocator.press(`${OPERATION_MODIFIER}+z`);
    await inputLocator.press(`${OPERATION_MODIFIER}+Shift+z`);

    expect(await inputLocator.innerText()).toBe(`${PASTE_TEXT_FIRST}${PASTE_TEXT_SECOND}`);
  });
});

test('select', async ({page}) => {
  const inputLocator = await setupInput(page, 'reset');
  await inputLocator.focus();
  await inputLocator.press(`${OPERATION_MODIFIER}+a`);

  const cursorPosition = await page.evaluate(checkCursorPosition);

  expect(cursorPosition).toBe(TEST_CONST.EXAMPLE_CONTENT.length);
});

test('cut content changes', async ({page}) => {
  const INITIAL_CONTENT = 'bold';
  const WRAPPED_CONTENT = TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.bold.wrapContent(INITIAL_CONTENT);
  const EXPECTED_CONTENT = TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.bold.wrapContent(INITIAL_CONTENT).slice(0, 3);

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
  await inputLocator.press(`${OPERATION_MODIFIER}+x`);

  expect(await rootHandle.innerHTML()).toBe(EXPECTED_CONTENT);
});
