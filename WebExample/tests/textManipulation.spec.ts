import {test, expect} from '@playwright/test';
import type {Locator, Page} from '@playwright/test';
import * as CONSTANTS from '../../constants';

const setupInput = async (page: Page) => {
  const inputLocator = await page.locator(`div#MarkdownInput_Example`);
  await page.click('[data-testid="clear"]');

  return inputLocator;
};

const copyText = async ({inputLocator, text}: {inputLocator: Locator; text: string}) => {
  await inputLocator.evaluate(() => {
    navigator.clipboard.writeText(text);
  }, text);
};

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:19006/', {waitUntil: 'load'});
  //   await page.click('[data-testid="clear"]');
});

// test('copy', async ({page}) => {
//   const inputLocator = (await setupInput(page)).locator('span.root').last();

//   if (inputLocator) {
//     const innerHTML = await inputLocator.evaluate((el) => el.innerHTML);
//     console.log(`InnerHTML of the element: ${innerHTML}`);
//   }

//   //   await copyText({inputLocator, text: 'COPY'});
// });

// const pasteText = async (text: string, inputLocator: Locator) => {
//   await inputLocator.evaluate((locatorElement) => {
//     const clipboardData = new DataTransfer();
//     clipboardData.setData('text/plain', text);
//     const clipboardEvent = new ClipboardEvent('paste', {
//       clipboardData,
//     });
//     locatorElement.dispatchEvent(clipboardEvent);
//   }, text);
// };

// const pasteText = async (text: string, inputLocator: Locator) => {
//   console.log('text ', text);
//   await clipboardy.write('*bold*');

//      inputLocator.focus();
//     await inputLocator.keyboard.down('Control');
//     await inputLocator.keyboard.press('v');

//   await inputLocator.evaluate(async async (locatorElement, textToPaste) => {
//     const clipboardData = new DataTransfer();
//     clipboardData.setData('text/plain', textToPaste);
//     const clipboardEvent = new ClipboardEvent('paste', {
//       clipboardData,
//     });
//     console.log('clipboarddata ', clipboardData);
//     locatorElement.focus();
//     await locatorElement.keyboard.down('Control');
//     await locatorElement.keyboard.press('v');
//     // locatorElement.dispatchEvent(clipboardEvent);
//   }, text);
// };

// const pasteText = async ({text, page, inputLocator}: {text: string; page: Page; inputLocator: Locator}) => {
//   await page.evaluate(async () => navigator.clipboard.writeText(text));

//   await inputLocator.focus();
//   const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
//   await page.keyboard.press(`${modifier}+v`);
// };

test('paste', async ({page}) => {
  const PASTE_TEXT = 'bold';
  const boldStyleDefinition = CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.bold;

  const inputLocator = await setupInput(page);

  const wrappedText = boldStyleDefinition.wrapContent(PASTE_TEXT);
  await page.evaluate(async (pasteText) => navigator.clipboard.writeText(pasteText), wrappedText);
  await inputLocator.focus();
  const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
  await page.keyboard.press(`${modifier}+v`);

  const elementHandle = await inputLocator.locator('span', {hasText: PASTE_TEXT}).last();
  let elementStyle;
  if (elementHandle) {
    await elementHandle.waitFor({state: 'attached'});

    elementStyle = await elementHandle.getAttribute('style');
  }
  expect(elementStyle).toEqual(boldStyleDefinition.style);
});
