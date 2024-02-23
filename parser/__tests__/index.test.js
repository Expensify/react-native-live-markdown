require('../react-native-live-markdown-parser.js');

expect.extend({
  toBeParsedAs(received, expectedRanges) {
    const actualRanges = global.parseExpensiMarkToRanges(received);
    if (JSON.stringify(actualRanges) !== JSON.stringify(expectedRanges)) {
      return {
        pass: false,
        message: () => `Expected ${JSON.stringify(expectedRanges)}, got ${JSON.stringify(actualRanges)}`,
      };
    }
    return {pass: true};
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
    {type: 'syntax', start: 7, length: 1},
    {type: 'bold', start: 8, length: 5},
    {type: 'syntax', start: 13, length: 1},
  ]);
});

test('italic', () => {
  expect('Hello, _world_!').toBeParsedAs([
    {type: 'syntax', start: 7, length: 1},
    {type: 'italic', start: 8, length: 5},
    {type: 'syntax', start: 13, length: 1},
  ]);
});

test('strikethrough', () => {
  expect('Hello, ~world~!').toBeParsedAs([
    {type: 'syntax', start: 7, length: 1},
    {type: 'strikethrough', start: 8, length: 5},
    {type: 'syntax', start: 13, length: 1},
  ]);
});

describe('mention-here', () => {
  test('normal', () => {
    expect('@here Hello!').toBeParsedAs([{type: 'mention-here', start: 0, length: 5}]);
  });

  test('with additional letters', () => {
    expect('@herex').toBeParsedAs([]);
  });

  test('with punctation marks', () => {
    expect('@here!').toBeParsedAs([{type: 'mention-here', start: 0, length: 5}]);
  });
});

describe('mention-user', () => {
  test('normal', () => {
    expect('@mail@mail.com Hello!').toBeParsedAs([{type: 'mention-user', start: 0, length: 14}]);
  });

  test('without top-level domain', () => {
    expect('@mail@mail').toBeParsedAs([]);
  });

  test('with punctation marks', () => {
    expect('@mail@mail.com!').toBeParsedAs([{type: 'mention-user', start: 0, length: 14}]);
  });
});

test('plain link', () => {
  expect('https://example.com').toBeParsedAs([{type: 'link', start: 0, length: 19}]);
});

test('labeled link', () => {
  expect('[Link](https://example.com)').toBeParsedAs([
    {type: 'syntax', start: 0, length: 1},
    {type: 'syntax', start: 5, length: 2},
    {type: 'link', start: 7, length: 19},
    {type: 'syntax', start: 26, length: 1},
  ]);
});

test('link with same label as href', () => {
  expect('[https://example.com](https://example.com)').toBeParsedAs([
    {type: 'syntax', start: 0, length: 1},
    {type: 'syntax', start: 20, length: 2},
    {type: 'link', start: 22, length: 19},
    {type: 'syntax', start: 41, length: 1},
  ]);
});

test('no nesting links while typing', () => {
  expect('[link](www.google.com').toBeParsedAs([{type: 'link', start: 7, length: 14}]);
});

test('link with query string', () => {
  expect('https://example.com?name=John&age=25&city=NewYork').toBeParsedAs([{type: 'link', start: 0, length: 49}]);
});

test('plain email', () => {
  expect('someone@example.com').toBeParsedAs([{type: 'link', start: 0, length: 19}]);
});

test('labeled email', () => {
  expect('[Email](mailto:someone@example.com)').toBeParsedAs([
    {type: 'syntax', start: 0, length: 1},
    {type: 'syntax', start: 6, length: 2},
    {type: 'link', start: 8, length: 26},
    {type: 'syntax', start: 34, length: 1},
  ]);
});

describe('email with same label as address', () => {
  test('label and address without "mailto:"', () => {
    expect('[someone@example.com](someone@example.com)').toBeParsedAs([
      {type: 'syntax', start: 0, length: 1},
      {type: 'syntax', start: 20, length: 2},
      {type: 'link', start: 22, length: 19},
      {type: 'syntax', start: 41, length: 1},
    ]);
  });

  test('label with "mailto:"', () => {
    expect('[mailto:someone@example.com](someone@example.com)').toBeParsedAs([
      {type: 'syntax', start: 0, length: 1},
      {type: 'syntax', start: 27, length: 2},
      {type: 'link', start: 29, length: 19},
      {type: 'syntax', start: 48, length: 1},
    ]);
  });

  test('address with "mailto:"', () => {
    expect('[someone@example.com](mailto:someone@example.com)').toBeParsedAs([
      {type: 'syntax', start: 0, length: 1},
      {type: 'syntax', start: 20, length: 2},
      {type: 'link', start: 22, length: 26},
      {type: 'syntax', start: 48, length: 1},
    ]);
  });

  test('label and address with "mailto:"', () => {
    expect('[mailto:someone@example.com](mailto:someone@example.com)').toBeParsedAs([
      {type: 'syntax', start: 0, length: 1},
      {type: 'syntax', start: 27, length: 2},
      {type: 'link', start: 29, length: 26},
      {type: 'syntax', start: 55, length: 1},
    ]);
  });
});

test('inline code', () => {
  expect('Hello `world`!').toBeParsedAs([
    {type: 'syntax', start: 6, length: 1},
    {type: 'code', start: 7, length: 5},
    {type: 'syntax', start: 12, length: 1},
  ]);
});

test('codeblock', () => {
  expect('```\nHello world!\n```').toBeParsedAs([
    {type: 'syntax', start: 0, length: 3},
    {type: 'pre', start: 3, length: 14},
    {type: 'syntax', start: 17, length: 3},
  ]);
});

describe('blockquote', () => {
  test('with single space', () => {
    expect('> Hello world!').toBeParsedAs([
      {type: 'blockquote', start: 0, length: 14},
      {type: 'syntax', start: 0, length: 1},
    ]);
  });

  test('with multiple spaces', () => {
    expect('>      Hello world!').toBeParsedAs([
      {type: 'blockquote', start: 0, length: 19},
      {type: 'syntax', start: 0, length: 1},
    ]);
  });

  test('without space', () => {
    expect('>Hello world!').toBeParsedAs([
      {type: 'blockquote', start: 0, length: 13},
      {type: 'syntax', start: 0, length: 1},
    ]);
  });
});

test('multiple blockquotes', () => {
  expect('> Hello\n> beautiful\n> world').toBeParsedAs([
    {type: 'blockquote', start: 0, length: 7},
    {type: 'syntax', start: 0, length: 1},
    {type: 'blockquote', start: 8, length: 11},
    {type: 'syntax', start: 8, length: 1},
    {type: 'blockquote', start: 20, length: 7},
    {type: 'syntax', start: 20, length: 1},
  ]);
});

test('separate blockquotes', () => {
  expect('> Lorem ipsum\ndolor\n> sit amet').toBeParsedAs([
    {type: 'blockquote', start: 0, length: 13},
    {type: 'syntax', start: 0, length: 1},
    {type: 'blockquote', start: 20, length: 10},
    {type: 'syntax', start: 20, length: 1},
  ]);
});

test('h1', () => {
  expect('# Hello world').toBeParsedAs([
    {type: 'syntax', start: 0, length: 2},
    {type: 'h1', start: 2, length: 11},
  ]);
});

test('nested bold and italic', () => {
  expect('*_Hello_*, _*world*_!').toBeParsedAs([
    {type: 'syntax', start: 0, length: 1},
    {type: 'bold', start: 1, length: 7},
    {type: 'syntax', start: 1, length: 1},
    {type: 'italic', start: 2, length: 5},
    {type: 'syntax', start: 7, length: 1},
    {type: 'syntax', start: 8, length: 1},
    {type: 'syntax', start: 11, length: 1},
    {type: 'italic', start: 12, length: 7},
    {type: 'syntax', start: 12, length: 1},
    {type: 'bold', start: 13, length: 5},
    {type: 'syntax', start: 18, length: 1},
    {type: 'syntax', start: 19, length: 1},
  ]);
});

describe('nested h1 in blockquote', () => {
  test('without spaces', () => {
    expect('># Hello world').toBeParsedAs([
      {type: 'blockquote', start: 0, length: 14},
      {type: 'syntax', start: 0, length: 1},
      {type: 'syntax', start: 1, length: 2},
      {type: 'h1', start: 3, length: 11},
    ]);
  });

  test('with single space', () => {
    expect('> # Hello world').toBeParsedAs([
      {type: 'blockquote', start: 0, length: 15},
      {type: 'syntax', start: 0, length: 1},
      {type: 'syntax', start: 2, length: 2},
      {type: 'h1', start: 4, length: 11},
    ]);
  });

  test('with multiple spaces after #', () => {
    expect('>#    Hello world').toBeParsedAs([
      {type: 'blockquote', start: 0, length: 17},
      {type: 'syntax', start: 0, length: 1},
      {type: 'syntax', start: 1, length: 2},
      {type: 'h1', start: 3, length: 14},
    ]);
  });
});

describe('trailing whitespace', () => {
  describe('after blockquote', () => {
    test('nothing', () => {
      expect('> Hello world').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 13},
        {type: 'syntax', start: 0, length: 1},
      ]);
    });

    test('single space', () => {
      expect('> Hello world ').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 14},
        {type: 'syntax', start: 0, length: 1},
      ]);
    });

    test('newline', () => {
      expect('> Hello world\n').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 13},
        {type: 'syntax', start: 0, length: 1},
      ]);
    });
  });

  describe('after h1', () => {
    test('nothing', () => {
      expect('# Hello world').toBeParsedAs([
        {type: 'syntax', start: 0, length: 2},
        {type: 'h1', start: 2, length: 11},
      ]);
    });

    test('single space', () => {
      expect('# Hello world ').toBeParsedAs([
        {type: 'syntax', start: 0, length: 2},
        {type: 'h1', start: 2, length: 12},
      ]);
    });

    test('multiple spaces', () => {
      expect('#   Hello world ').toBeParsedAs([
        {type: 'syntax', start: 0, length: 2},
        {type: 'h1', start: 2, length: 14},
      ]);
    });

    test('newline', () => {
      expect('# Hello world\n').toBeParsedAs([
        {type: 'syntax', start: 0, length: 2},
        {type: 'h1', start: 2, length: 11},
      ]);
    });

    test('multiple blockquotes', () => {
      expect('> # Hello\n> # world').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 9},
        {type: 'syntax', start: 0, length: 1},
        {type: 'syntax', start: 2, length: 2},
        {type: 'h1', start: 4, length: 5},
        {type: 'blockquote', start: 10, length: 9},
        {type: 'syntax', start: 10, length: 1},
        {type: 'syntax', start: 12, length: 2},
        {type: 'h1', start: 14, length: 5},
      ]);
    });
  });

  describe('nested blockquotes', () => {
    test('without whitespace between syntax', () => {
      expect('>>> Hello world').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 15, depth: 3},
        {type: 'syntax', start: 0, length: 1},
        {type: 'syntax', start: 1, length: 1},
        {type: 'syntax', start: 2, length: 1},
      ]);
    });

    test('with whitespace between syntax', () => {
      expect('> > > Hello world').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 17, depth: 3},
        {type: 'syntax', start: 0, length: 1},
        {type: 'syntax', start: 2, length: 1},
        {type: 'syntax', start: 4, length: 1},
      ]);
    });

    test('different blockquote depths', () => {
      expect('>> Hello 1\n> Hello 2').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 10, depth: 2},
        {type: 'syntax', start: 0, length: 1},
        {type: 'syntax', start: 1, length: 1},
        {type: 'blockquote', start: 11, length: 9},
        {type: 'syntax', start: 11, length: 1},
      ]);
    });

    test('with another style inside', () => {
      expect('>> Hello *world*').toBeParsedAs([
        {type: 'blockquote', start: 0, length: 16, depth: 2},
        {type: 'syntax', start: 0, length: 1},
        {type: 'syntax', start: 1, length: 1},
        {type: 'syntax', start: 9, length: 1},
        {type: 'bold', start: 10, length: 5},
        {type: 'syntax', start: 15, length: 1},
      ]);
    });
  });
});
