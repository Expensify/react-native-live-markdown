import {test, expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import * as TEST_CONST from '../../testConstants';
import {setupInput} from './utils';

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

test.beforeEach(async ({page}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
  await page.click('[data-testid="reset"]');
});

test.describe('markdown content styling', () => {
  test('bold', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'bold', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.bold.style, page});
  });

  test('link', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'link', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.link.style, page});
  });

  test('title', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'title', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.title.style, page});
  });

  test('code', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'code', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.code.style, page});
  });

  test('codeBlock', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'codeBlock', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.codeBlock.style, page});
  });

  test('hereMention', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'here', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.here.style, page});
  });

  test('mentionUser', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'mentionUser', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.mentionUser.style, page});
  });

  test('roomMention', async ({page}) => {
    await testMarkdownContentStyle({styleName: 'roomMention', style: TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.roomMention.style, page});
  });

  test('blockquote', async ({page, browserName}) => {
    const blockquoteStyle = TEST_CONST.MARKDOWN_STYLE_DEFINITIONS.blockquote.style;
    // Firefox border properties are serialized slightly differently
    const browserStyle = browserName === 'firefox' ? blockquoteStyle.replace(' border-left-style: solid', ' border-left: 6px solid gray') : blockquoteStyle;

    await testMarkdownContentStyle({styleName: 'blockquote', style: browserStyle, page});
  });
});
