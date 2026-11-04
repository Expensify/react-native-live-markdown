import {test, expect} from '@playwright/test';
// eslint-disable-next-line import/no-relative-packages
import * as TEST_CONST from '../../example/src/testConstants';
import {setupInput, testMarkdownContentStyle, testMarkdownElementHasComputedStyle} from './utils';

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

  test('blockquote', async ({page}) => {
    const blockquoteStyle =
      'border-color: gray; border-width: 6px; margin-left: 6px; padding-left: 6px; border-left-style: solid; display: inline-block; max-width: 100%; box-sizing: border-box; overflow-wrap: anywhere;';

    // Some browsers serialize the left border as a shorthand
    const styles = [blockquoteStyle, blockquoteStyle.replace('border-left-style: solid', 'border-left: 6px solid gray')];

    await testMarkdownContentStyle({testContent: 'blockquote', style: styles, page});
  });

  test('blockquote with strikethrough', async ({page}) => {
    // Older browsers include the default style and color in the serialized value
    const styles = ['line-through', 'line-through solid rgb(0, 0, 0)', 'line-through rgb(0, 0, 0)'];

    await testMarkdownElementHasComputedStyle({testContent: 'strikethrough_blockquote', propertyName: 'text-decoration', style: styles, page});
  });
});

test.describe('empty input styling', () => {
  test.beforeEach(async ({page}) => {
    await page.click('[data-testid="clear"]');
  });

  test('placeholder should have correct text', async ({page}) => {
    const placeholder = await page.$eval(`div#${TEST_CONST.INPUT_ID}`, (el) => el.getAttribute('placeholder'));
    expect(placeholder).toBe('Type here...');
  });

  test('empty input should have visible placeholder', async ({page}) => {
    const inputLocator = await setupInput(page);

    const beforeContent = await inputLocator.evaluate((el) => {
      return window.getComputedStyle(el, '::before').getPropertyValue('content');
    });

    expect([
      '"Type here..."', // Chromium/WebKit, resolves attr()
      'attr(placeholder)', // Firefox, literal
    ]).toContain(beforeContent);
  });
});
