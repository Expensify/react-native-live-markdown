import {test, expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import * as CONSTANTS from '../../constants';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:19006/', {waitUntil: 'load'});
  await page.click('[data-testid="reset"]');
});

const setupInput = async (page: Page) => {
  const inputLocator = await page.locator(`div#MarkdownInput_Example`);

  return inputLocator;
};

const testMarkdownContentStyle = async ({styleName, style, page}: {styleName: string; style: string; page: Page}) => {
  const inputLocator = await setupInput(page);

  const elementHandle = inputLocator.locator('span', {hasText: styleName}).last();

  let elementStyle;

  if (elementHandle) {
    await elementHandle.waitFor({state: 'attached'});

    elementStyle = await elementHandle.getAttribute('style');
  }
  expect(elementStyle).toEqual(style);
};

test('bold', async ({page}) => {
  await testMarkdownContentStyle({styleName: 'bold', style: CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.bold.style, page});
});

test('link', async ({page}) => {
  await testMarkdownContentStyle({styleName: 'link', style: CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.link.style, page});
});

test('title', async ({page}) => {
  await testMarkdownContentStyle({styleName: 'title', style: CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.title.style, page});
});

test('code', async ({page}) => {
  await testMarkdownContentStyle({styleName: 'code', style: CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.code.style, page});
});

test('codeBlock', async ({page}) => {
  await testMarkdownContentStyle({styleName: 'codeBlock', style: CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.codeBlock.style, page});
});

test('hereMention', async ({page}) => {
  await testMarkdownContentStyle({styleName: 'here', style: CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.here.style, page});
});

test('mentionUser', async ({page}) => {
  await testMarkdownContentStyle({styleName: 'mentionUser', style: CONSTANTS.MARKDOWN_STYLE_DEFINITIONS.mentionUser.style, page});
});
