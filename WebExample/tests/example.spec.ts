import {test, expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import * as CONSTANTS from '../../constants';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:19006/', {waitUntil: 'load'});
});

const setupInput = async (page: Page) => {
  const inputLocator = await page.locator(`div#MarkdownInput_Example`);

  await inputLocator.fill('');

  return inputLocator;
};

test('standard input results', async ({page}) => {
  const inputLocator = await setupInput(page);

  await inputLocator.pressSequentially(CONSTANTS.EXAMPLE_CONTENT);
  const value = await inputLocator.innerText();
  expect(value).toEqual(CONSTANTS.EXAMPLE_CONTENT);
});
