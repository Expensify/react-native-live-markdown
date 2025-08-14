import {test} from '@playwright/test';
// eslint-disable-next-line import/no-relative-packages
import * as TEST_CONST from '../../example/src/testConstants';
import {testMarkdownContentStyle} from './utils';

test.beforeEach(async ({page}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
  await page.click('[data-testid="reset"]');
});

test.describe('markdown content styling', () => {
  test('bold', async ({page}) => {
    await testMarkdownContentStyle({testContent: 'world', style: 'font-weight: bold;', page});
  });

  test('link', async ({page}) => {
    await testMarkdownContentStyle({testContent: 'https://expensify.com', style: 'color: blue; text-decoration: underline;', page});
  });

  test('h1', async ({page}) => {
    await testMarkdownContentStyle({testContent: 'header1', style: 'font-size: 25px; font-weight: bold;', page});
  });

  test('inline code', async ({page}) => {
    await testMarkdownContentStyle({
      testContent: 'inline code',
      style:
        'font-family: monospace; font-size: 20px; color: black; background-color: lightgray; border-color: gray; border-width: 1px; border-radius: 4px; border-style: solid; padding: 0px; line-height: 1.5;',
      page,
    });
  });

  test('codeblock', async ({page}) => {
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style:
        'font-family: monospace; font-size: 20px; color: black; background-color: lightgray; border-color: gray; border-width: 1px; border-radius: 4px; border-style: solid; padding: 2px;',
      page,
    });
  });

  test('mention-here', async ({page}) => {
    await testMarkdownContentStyle({testContent: 'here', style: 'color: green; background-color: lime; border-radius: 5px;', page});
  });

  test('mention-user', async ({page}) => {
    await testMarkdownContentStyle({testContent: 'someone@swmansion.com', style: 'color: blue; background-color: cyan; border-radius: 5px;', page});
  });

  test('mention-report', async ({page}) => {
    await testMarkdownContentStyle({testContent: 'mention-report', style: 'color: red; background-color: pink; border-radius: 5px;', page});
  });

  test('blockquote', async ({page, browserName}) => {
    const blockquoteStyle =
      'border-color: gray; border-width: 6px; margin-left: 6px; padding-left: 6px; border-left-style: solid; display: inline-block; max-width: 100%; box-sizing: border-box; overflow-wrap: anywhere;';

    // Firefox border properties are serialized slightly differently
    const browserStyle = browserName === 'firefox' ? blockquoteStyle.replace('border-left-style: solid', 'border-left: 6px solid gray') : blockquoteStyle;

    await testMarkdownContentStyle({testContent: 'blockquote', style: browserStyle, page});
  });
});
