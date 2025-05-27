import {test, expect} from '@playwright/test';
// eslint-disable-next-line import/no-relative-packages
import * as TEST_CONST from '../../example/src/testConstants';
import {getElementValue, setCursorPosition, setupInput, testMarkdownContentStyle} from './utils';

const CODEBLOCK_DEFAULT_STYLE = 'border-radius: 4px; padding: 0px; font-family: monospace; font-size: 20px; color: black;';

test.beforeEach(async ({page}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
});

test.describe('modyfying codeblock content', () => {
  test('codeblock content wrapping', async ({page}) => {
    const LINE_TO_ADD = ' very long line of code that should be wrapped';
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 3);

    await inputLocator.pressSequentially(LINE_TO_ADD);

    expect(await getElementValue(inputLocator)).toEqual(`\`\`\`\nCodeblock${LINE_TO_ADD}\nSample code line\n\`\`\``);

    // Verify if the codeblock style wasn't appleid
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: CODEBLOCK_DEFAULT_STYLE,
      pseudoStyle: {
        height: '108px',
        width: '246px',
      },
      page,
    });
  });

  test('typing after codeblock opening syntax', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 0);

    await inputLocator.pressSequentially('test');

    expect(await getElementValue(inputLocator)).toEqual('```test\nCodeblock\nSample code line\n```');

    // Verify if the codeblock style wasn't appleid
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: 'margin: 0px; padding: 0px;',
      page,
    });
  });

  test('typing in the empty last codeblock line', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n\n```');

    await setCursorPosition(page, 6, 0);

    await inputLocator.pressSequentially('test');
    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line\ntest\n```');

    // Verify if the codeblock style is applied correctly after cahnges
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: CODEBLOCK_DEFAULT_STYLE,
      pseudoStyle: {
        height: '82px',
        width: '197px',
      },
      page,
    });
  });

  test('typing after codeblock closing syntax', async ({page}) => {
    const styleProperties = {
      testContent: 'codeblock',
      style: CODEBLOCK_DEFAULT_STYLE,
      pseudoStyle: {
        height: '56px',
        width: '197px',
      },
      page,
    };

    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 6);

    await testMarkdownContentStyle(styleProperties);

    await inputLocator.pressSequentially('test');
    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line\n```test');

    // Verify if when typing after codeblock closing syntax, its height is not changed
    await testMarkdownContentStyle(styleProperties);
  });
});

test('codeblock dimensions after resizing the input', async ({page, browserName}) => {
  await page.setViewportSize({width: 1280, height: 720});
  const inputLocator = await setupInput(page, 'clear');
  await inputLocator.focus();
  await inputLocator.pressSequentially('```\nCodeblock\nSample very long line of code that should be wrapped\n```');

  await testMarkdownContentStyle({
    testContent: 'codeblock',
    style: CODEBLOCK_DEFAULT_STYLE,
    pseudoStyle: {
      height: '108px',
      width: '282px',
    },
    page,
  });

  await inputLocator.evaluate((inputElement: HTMLInputElement) => {
    const element = inputElement;
    element.style.width = '500px';
    element.style.height = '200px';
  });
  await page.waitForTimeout(10);
  await testMarkdownContentStyle({
    testContent: 'codeblock',
    style: CODEBLOCK_DEFAULT_STYLE,
    pseudoStyle: {
      height: '82px',
      width: browserName === 'chromium' ? '426px' : '427px',
    },
    page,
  });
});

test.describe('scrolling into view', () => {
  test('to an empty line inside the codeblock', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();

    await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      element.style.height = '100px';
    });
    await inputLocator.pressSequentially('```\nCodeblock start\n\n\n\n\n\n\n\n\nCodeblock end\n```');

    await setCursorPosition(page, 4);
    await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      element.scrollTop = element.scrollHeight;
      return element.scrollHeight;
    });
    await inputLocator.blur();

    await inputLocator.focus();

    const scrollTop = await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      return element.scrollTop;
    });
    expect(scrollTop).toBeLessThanOrEqual(25);
  });
});
