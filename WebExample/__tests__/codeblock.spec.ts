import {test, expect} from '@playwright/test';
// eslint-disable-next-line import/no-relative-packages
import * as TEST_CONST from '../../example/src/testConstants';
import {getElementValue, setCursorPosition, setupInput, testMarkdownContentStyle} from './utils';

test.beforeEach(async ({page}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
});

test.describe('typing', () => {
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
      style: 'border-radius: 4px; padding: 0px; font-family: monospace; font-size: 20px; color: black;',
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
      style: 'border-radius: 4px; padding: 0px; font-family: monospace; font-size: 20px; color: black;',
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
