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

  const newText = '*bold*';
  await pasteContent({text: newText, page, inputLocator});

  await page.evaluate(() => {
    const editableDiv = document.querySelector('div[contenteditable="true"]');
    return editableDiv;
  });

  expect(await inputLocator.innerText()).toBe(newText);
});

test('cut content changes', async ({page}) => {
  const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
  const INITIAL_CONTENT = CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.bold.wrapContent('bold');

  const inputLocator = await setupInput(page, 'clear');
  await inputLocator.fill(INITIAL_CONTENT);

  await inputLocator.focus();

  // Find cursor position at end
  const cursorPosition = await page.evaluate(() => {
    const editableDiv = document.querySelector('div[contenteditable="true"]');
    const range = window.getSelection()?.getRangeAt(0);

    if (!range || !editableDiv) return null;

    range.setStart(editableDiv, 0);
    range.setEnd(editableDiv, 3);

    // range.setStart(editableDiv, range.endOffset - 3);
    // range.setEnd(editableDiv, range.endOffset);
    return range.toString().length;
  });

  // Cut the selected text
  //   await page.keyboard.down(modifier);
  //   await page.keyboard.press('x');

  //   // Check the new content
  //   const newText = await inputLocator.innerText();
  //   const expectedNewText = cursorPosition ? INITIAL_CONTENT.substring(0, INITIAL_CONTENT.length - cursorPosition) : null;

  //   expect(newText).not.toBeNull();
  //   expect(newText).toBe(expectedNewText);
});

// COPY
// CLEAR
