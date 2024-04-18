import {test, expect} from '@playwright/test';
import type {Locator, Page} from '@playwright/test';
import * as CONSTANTS from '../../constants';

const setupInput = async (page: Page, mode: 'clear' | 'reset') => {
  const inputLocator = await page.locator(`div#MarkdownInput_Example`);
  await page.click(`[data-testid="${mode}"]`);

  return inputLocator;
};

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:19006/', {waitUntil: 'load'});
  //   await page.click('[data-testid="clear"]');
});

const pasteContent = async ({text, page, inputLocator}: {text: string; page: Page; inputLocator: Locator}) => {
  await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), text);
  await inputLocator.focus();
  const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
  await page.keyboard.press(`${modifier}+v`);
};

test('paste', async ({page, context}) => {
  const PASTE_TEXT = 'bold';
  const boldStyleDefinition = CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.bold;

  const inputLocator = await setupInput(page, 'clear');
  await context.grantPermissions(['clipboard-write']);

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

test('select', async ({page}) => {
  const inputLocator = await setupInput(page, 'reset');
  //   await pasteContent({text: SELECTION_TEXT, page, inputLocator});
  await inputLocator.focus();

  const cursorPosition = await page.evaluate(() => {
    const editableDiv = document.querySelector('div[contenteditable="true"]');
    const range = window.getSelection()?.getRangeAt(0);
    if (!range || !editableDiv) return null;
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editableDiv);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  });

  expect(cursorPosition).toBe(CONSTANTS.EXAMPLE_CONTENT.length);
});

test('paste replace', async ({page, context}) => {
  const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';

  const inputLocator = await setupInput(page, 'reset');
  await context.grantPermissions(['clipboard-write']);

  await inputLocator.focus();
  await page.keyboard.down(modifier);
  await page.keyboard.press('a');
  await page.keyboard.up(modifier);

  const newText = '*bold*';
  await pasteContent({text: newText, page, inputLocator});

  await page.evaluate(() => {
    const editableDiv = document.querySelector('div[contenteditable="true"]');
    return editableDiv;
  });

  expect(await inputLocator.innerText()).toBe(newText);
});

// github.com/Expensify/App/issues/39360
test('fast type cursor position', async ({page}) => {
  const inputLocator = await setupInput(page, 'clear');

  const EXAMPLE_LONG_CONTENT = CONSTANTS.EXAMPLE_CONTENT.repeat(3);
  await inputLocator.pressSequentially(EXAMPLE_LONG_CONTENT);

  expect(await inputLocator.innerText()).toBe(EXAMPLE_LONG_CONTENT);

  const cursorPosition = await page.evaluate((selector) => {
    const editableDiv = document.querySelector(selector) as HTMLElement;
    const range = window.getSelection()?.getRangeAt(0);
    if (!range || !editableDiv) return null;
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editableDiv);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  }, 'div[contenteditable="true"]');

  expect(cursorPosition).toBe(EXAMPLE_LONG_CONTENT.length);
});

// COPY
// CLEAR
