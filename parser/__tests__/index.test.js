require('../react-native-live-markdown-parser.js');

expect.extend({
  toBeParsedAs(received, expectedRanges) {
    const actualRanges = global.parseExpensiMarkToRanges(received);
    if (JSON.stringify(actualRanges) !== JSON.stringify(expectedRanges)) {
      return {
        pass: false,
        message: () =>
          `Expected ${JSON.stringify(expectedRanges)}, got ${JSON.stringify(
            actualRanges
          )}`,
      };
    }
    return { pass: true };
  },
});

test('empty string', () => {
  expect('').toBeParsedAs([]);
});

test('no formatting', () => {
  expect('Hello, world!').toBeParsedAs([]);
});

test('bold', () => {
  expect('Hello, *world*!').toBeParsedAs([
    ['syntax', 7, 1],
    ['bold', 8, 5],
    ['syntax', 13, 1],
  ]);
});

test('italic', () => {
  expect('Hello, _world_!').toBeParsedAs([
    ['syntax', 7, 1],
    ['italic', 8, 5],
    ['syntax', 13, 1],
  ]);
});

test('strikethrough', () => {
  expect('Hello, ~world~!').toBeParsedAs([
    ['syntax', 7, 1],
    ['strikethrough', 8, 5],
    ['syntax', 13, 1],
  ]);
});

describe('mention', () => {
  test('normal', () => {
    expect('@here Hello!').toBeParsedAs([['mention', 0, 5]]);
  });

  test('with additional letters', () => {
    expect('@herex').toBeParsedAs([]);
  });

  test('with punctation marks', () => {
    expect('@here!').toBeParsedAs([['mention', 0, 5]]);
  });
});

describe('mention-user', () => {
  test('normal', () => {
    expect('@mail@mail.com Hello!').toBeParsedAs([['mention-user', 0, 14]]);
  });

  test('without top-level domain', () => {
    expect('@mail@mail').toBeParsedAs([]);
  });

  test('with punctation marks', () => {
    expect('@mail@mail.com!').toBeParsedAs([['mention-user', 0, 14]]);
  });
});

test('plain link', () => {
  expect('https://example.com').toBeParsedAs([['link', 0, 19]]);
});

test('labeled link', () => {
  expect('[Link](https://example.com)').toBeParsedAs([
    ['syntax', 0, 1],
    ['syntax', 5, 2],
    ['link', 7, 19],
    ['syntax', 26, 1],
  ]);
});

test('link with same label as href', () => {
  expect('[https://example.com](https://example.com)').toBeParsedAs([
    ['syntax', 0, 1],
    ['syntax', 20, 2],
    ['link', 22, 19],
    ['syntax', 41, 1],
  ]);
});

test('no nesting links while typing', () => {
  expect('[link](www.google.com').toBeParsedAs([['link', 7, 14]]);
});

test('link with query string', () => {
  expect('https://example.com?name=John&age=25&city=NewYork').toBeParsedAs([
    ['link', 0, 49],
  ]);
});

test('plain email', () => {
  expect('someone@example.com').toBeParsedAs([['link', 0, 19]]);
});

test('labeled email', () => {
  expect('[Email](mailto:someone@example.com)').toBeParsedAs([
    ['syntax', 0, 1],
    ['syntax', 6, 2],
    ['link', 8, 26],
    ['syntax', 34, 1],
  ]);
});

describe('email with same label as address', () => {
  test('label and address without "mailto:"', () => {
    expect('[someone@example.com](someone@example.com)').toBeParsedAs([
      ['syntax', 0, 1],
      ['syntax', 20, 2],
      ['link', 22, 19],
      ['syntax', 41, 1],
    ]);
  });

  test('label with "mailto:"', () => {
    expect('[mailto:someone@example.com](someone@example.com)').toBeParsedAs([
      ['syntax', 0, 1],
      ['syntax', 27, 2],
      ['link', 29, 19],
      ['syntax', 48, 1],
    ]);
  });

  test('address with "mailto:"', () => {
    expect('[someone@example.com](mailto:someone@example.com)').toBeParsedAs([
      ['syntax', 0, 1],
      ['syntax', 20, 2],
      ['link', 22, 26],
      ['syntax', 48, 1],
    ]);
  });

  test('label and address with "mailto:"', () => {
    expect(
      '[mailto:someone@example.com](mailto:someone@example.com)'
    ).toBeParsedAs([
      ['syntax', 0, 1],
      ['syntax', 27, 2],
      ['link', 29, 26],
      ['syntax', 55, 1],
    ]);
  });
});

test('inline code', () => {
  expect('Hello `world`!').toBeParsedAs([
    ['syntax', 6, 1],
    ['code', 7, 5],
    ['syntax', 12, 1],
  ]);
});

test('codeblock', () => {
  expect('```\nHello world!\n```').toBeParsedAs([
    ['syntax', 0, 3],
    ['pre', 3, 14],
    ['syntax', 17, 3],
  ]);
});

describe('quote', () => {
  test('with single space', () => {
    expect('> Hello world!').toBeParsedAs([
      ['syntax', 0, 1],
      ['blockquote', 0, 14],
    ]);
  });

  test('with multiple spaces', () => {
    expect('>      Hello world!').toBeParsedAs([
      ['syntax', 0, 1],
      ['blockquote', 0, 19],
    ]);
  });

  test('without space', () => {
    expect('>Hello world!').toBeParsedAs([
      ['syntax', 0, 1],
      ['blockquote', 0, 13],
    ]);
  });
});

test('multiple blockquotes', () => {
  expect('> Hello\n> beautiful\n> world').toBeParsedAs([
    ['syntax', 0, 1],
    ['blockquote', 0, 7],
    ['syntax', 8, 1],
    ['blockquote', 8, 11],
    ['syntax', 20, 1],
    ['blockquote', 20, 7],
  ]);
});

test('separate blockquotes', () => {
  expect('> Lorem ipsum\ndolor\n> sit amet').toBeParsedAs([
    ['syntax', 0, 1],
    ['blockquote', 0, 13],
    ['syntax', 20, 1],
    ['blockquote', 20, 10],
  ]);
});

test('heading', () => {
  expect('# Hello world').toBeParsedAs([
    ['syntax', 0, 2],
    ['h1', 2, 11],
  ]);
});

test('nested bold and italic', () => {
  expect('*_Hello_*, _*world*_!').toBeParsedAs([
    ['syntax', 0, 1],
    ['syntax', 1, 1],
    ['bold', 1, 7],
    ['italic', 2, 5],
    ['syntax', 7, 1],
    ['syntax', 8, 1],
    ['syntax', 11, 1],
    ['syntax', 12, 1],
    ['italic', 12, 7],
    ['bold', 13, 5],
    ['syntax', 18, 1],
    ['syntax', 19, 1],
  ]);
});

describe('nested heading in blockquote', () => {
  test('without spaces', () => {
    expect('># Hello world').toBeParsedAs([
      ['syntax', 0, 1],
      ['blockquote', 0, 14],
      ['syntax', 1, 2],
      ['h1', 3, 11],
    ]);
  });

  test('with single space', () => {
    expect('> # Hello world').toBeParsedAs([
      ['syntax', 0, 1],
      ['blockquote', 0, 15],
      ['syntax', 2, 2],
      ['h1', 4, 11],
    ]);
  });

  test('with multiple spaces after #', () => {
    expect('>#    Hello world').toBeParsedAs([
      ['syntax', 0, 1],
      ['blockquote', 0, 17],
      ['syntax', 1, 2],
      ['h1', 3, 14],
    ]);
  });
});

describe('trailing whitespace', () => {
  describe('after blockquote', () => {
    test('nothing', () => {
      expect('> Hello world').toBeParsedAs([
        ['syntax', 0, 1],
        ['blockquote', 0, 13],
      ]);
    });

    test('single space', () => {
      expect('> Hello world ').toBeParsedAs([
        ['syntax', 0, 1],
        ['blockquote', 0, 14],
      ]);
    });

    test('newline', () => {
      expect('> Hello world\n').toBeParsedAs([
        ['syntax', 0, 1],
        ['blockquote', 0, 13],
      ]);
    });
  });

  describe('after heading', () => {
    test('nothing', () => {
      expect('# Hello world').toBeParsedAs([
        ['syntax', 0, 2],
        ['h1', 2, 11],
      ]);
    });

    test('single space', () => {
      expect('# Hello world ').toBeParsedAs([
        ['syntax', 0, 2],
        ['h1', 2, 12],
      ]);
    });

    test('multiple spaces', () => {
      expect('#   Hello world ').toBeParsedAs([
        ['syntax', 0, 2],
        ['h1', 2, 14],
      ]);
    });

    test('newline', () => {
      expect('# Hello world\n').toBeParsedAs([
        ['syntax', 0, 2],
        ['h1', 2, 11],
      ]);
    });

    test('multiple quotes', () => {
      expect('> # Hello\n> # world').toBeParsedAs([
        ['syntax', 0, 1],
        ['blockquote', 0, 9],
        ['syntax', 2, 2],
        ['h1', 4, 5],
        ['syntax', 10, 1],
        ['blockquote', 10, 9],
        ['syntax', 12, 2],
        ['h1', 14, 5],
      ]);
    });
  });
});
