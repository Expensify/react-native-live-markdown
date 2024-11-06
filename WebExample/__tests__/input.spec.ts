import {test, expect} from '@playwright/test';
import * as TEST_CONST from '@expensify/react-native-live-markdown-example/src/testConstants';
import {getCursorPosition, getElementValue, setupInput} from './utils';

test.beforeEach(async ({page}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
});

test.describe('typing', () => {
  test('short text', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');

    await inputLocator.focus();
    await inputLocator.pressSequentially(TEST_CONST.EXAMPLE_CONTENT);

    expect(await getElementValue(inputLocator)).toEqual(TEST_CONST.EXAMPLE_CONTENT);
  });

  test('fast type cursor position', async ({page}) => {
    const EXAMPLE_LONG_CONTENT = TEST_CONST.EXAMPLE_CONTENT.repeat(3);

    const inputLocator = await setupInput(page, 'clear');

    await inputLocator.pressSequentially(EXAMPLE_LONG_CONTENT);

    expect(await getElementValue(inputLocator)).toBe(EXAMPLE_LONG_CONTENT);

    const cursorPosition = await getCursorPosition(inputLocator);

    expect(cursorPosition.end).toBe(EXAMPLE_LONG_CONTENT.length);
  });
});
