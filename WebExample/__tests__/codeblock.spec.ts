import {test, expect} from '@playwright/test';
// eslint-disable-next-line import/no-relative-packages
import * as TEST_CONST from '../../example/src/testConstants';
import {getElementValue, pressCmd, setCursorPosition, setupInput, testMarkdownContentStyle} from './utils';

const CODEBLOCK_DEFAULT_STYLE = 'border-radius: 4px; padding: 0px; font-family: monospace; font-size: 20px; color: black;';

test.beforeEach(async ({page}) => {
  await page.goto(TEST_CONST.LOCAL_URL, {waitUntil: 'load'});
});

test.describe('modifying codeblock content', () => {
  test('keep newlines when writing after opening syntax', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 0);
    await inputLocator.pressSequentially('test');

    expect(await getElementValue(inputLocator)).toEqual('```test\nCodeblock\nSample code line\n```');
    // Verify if the codeblock style wasn't applied
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: 'margin: 0px; padding: 0px;',
      page,
    });
  });

  test('keep codeblock structure when writing in the empty last line', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n\n```');

    await setCursorPosition(page, 6, 0);
    await inputLocator.pressSequentially('test');

    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line\ntest\n```');
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

  test('allow writing after closing syntax', async ({page}) => {
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

  test('remove whole codeblock', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await pressCmd({inputLocator, command: 'a'});
    await inputLocator.press('Backspace');

    expect(await getElementValue(inputLocator)).toEqual('');
  });

  test('wrap content', async ({page}) => {
    const LINE_TO_ADD = ' very long line of code that should be wrapped';
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 3);
    await inputLocator.pressSequentially(LINE_TO_ADD);

    expect(await getElementValue(inputLocator)).toEqual(`\`\`\`\nCodeblock${LINE_TO_ADD}\nSample code line\n\`\`\``);
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: CODEBLOCK_DEFAULT_STYLE,
      pseudoStyle: {
        height: '108px',
        width: '289px',
      },
      page,
    });
  });

  test('remove newline after opening syntax', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 2, 0);
    await inputLocator.press('Backspace');

    expect(await getElementValue(inputLocator)).toEqual('```Codeblock\nSample code line\n```');
    // Verify if the codeblock style wasn't applied
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: 'margin: 0px; padding: 0px;',
      page,
    });
  });

  test('remove newline before closing syntax', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 6, 0);
    await inputLocator.press('Backspace');

    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line```');
    // Verify if the codeblock style wasn't applied
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: 'margin: 0px; padding: 0px;',
      page,
    });
  });

  test('remove newline before closing syntax with one empy line at the end', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n\n```');

    await setCursorPosition(page, 6, 0);
    await inputLocator.press('Backspace');

    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line\n```');
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: CODEBLOCK_DEFAULT_STYLE,
      pseudoStyle: {
        height: '56px',
        width: '197px',
      },
      page,
    });
  });

  test('remove newline before closing syntax with two empy lines at the end', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n\n\n```');

    await setCursorPosition(page, 6, 0);
    await inputLocator.press('Backspace');

    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line\n\n```');
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

  test('remove newline before opening syntax', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('\n\n```\nCodeblock\nSample code line\n```');

    await setCursorPosition(page, 2, 0);
    await inputLocator.press('Backspace');

    expect(await getElementValue(inputLocator)).toEqual('\n```\nCodeblock\nSample code line\n```');
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: CODEBLOCK_DEFAULT_STYLE,
      pseudoStyle: {
        height: '56px',
        width: '197px',
      },
      page,
    });
  });

  test('remove newline between two codeblocks', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.pressSequentially('```\nCodeblock\nSample code line\n```\n```\nCodeblock\nSecond sample code line\n```');

    await setCursorPosition(page, 7, 0);
    await inputLocator.press('Backspace');

    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line\n``````\nCodeblock\nSecond sample code line\n```');
    // Verify if the codeblock style wasn't applied
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: 'margin: 0px; padding: 0px;',
      page,
    });

    await inputLocator.press('Enter');

    expect(await getElementValue(inputLocator)).toEqual('```\nCodeblock\nSample code line\n```\n```\nCodeblock\nSecond sample code line\n```');
    await testMarkdownContentStyle({
      testContent: 'codeblock',
      style: CODEBLOCK_DEFAULT_STYLE,
      pseudoStyle: {
        height: '56px',
        width: '281px',
      },
      page,
    });
  });
});

test('update codeblock dimensions when resizing the input', async ({page}) => {
  await page.setViewportSize({width: 1280, height: 720});
  const inputLocator = await setupInput(page, 'clear');
  await inputLocator.focus();
  await inputLocator.pressSequentially('```\nCodeblock\nSample very long line of code that should be wrapped\n```');

  await testMarkdownContentStyle({
    testContent: 'codeblock',
    style: CODEBLOCK_DEFAULT_STYLE,
    pseudoStyle: {
      height: '108px',
      width: '289px',
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
      width: '489px',
    },
    page,
  });
});

test.describe('scrolling into view', () => {
  test('scroll to an empty codeblock line', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      element.style.height = '100px';
    });
    await inputLocator.pressSequentially('```\nCodeblock start\n\n\n\n\n\n\n\n\nCodeblock end\n```');

    await setCursorPosition(page, 4);
    await inputLocator.blur();
    await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      element.scrollTop = element.scrollHeight;
      return element.scrollHeight;
    });

    await inputLocator.focus();
    const scrollTop = await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      return element.scrollTop;
    });

    expect(scrollTop).toBeLessThanOrEqual(25);
  });

  test('scroll to the cursor after opening syntax', async ({page}) => {
    const inputLocator = await setupInput(page, 'clear');
    await inputLocator.focus();
    await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      element.style.height = '100px';
    });
    await inputLocator.pressSequentially('```\nCodeblock start\n\n\n\n\n\n\n\n\nCodeblock end\n```');

    await setCursorPosition(page, 1);
    await inputLocator.blur();
    await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      element.scrollTop = element.scrollHeight;
      return element.scrollHeight;
    });

    await inputLocator.focus();
    const scrollTop = await inputLocator.evaluate((inputElement: HTMLInputElement) => {
      const element = inputElement;
      return element.scrollTop;
    });

    expect(scrollTop).toBeLessThanOrEqual(25);
  });
});
