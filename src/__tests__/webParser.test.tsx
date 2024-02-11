/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@jest/globals';
import type {MatcherFunction} from 'expect';
import * as ParserUtils from '../web/parserUtils';
import type * as MarkdownTypes from '../web/parserUtils';

require('../../parser/react-native-live-markdown-parser.js');

type MarkdownType = MarkdownTypes.MarkdownType;

const toBeParsedAsHTML: MatcherFunction<[expectedHTML: string]> = function (actual, expectedHTML) {
  if (typeof actual !== 'string') {
    throw new Error('Actual value must be a string');
  }
  let expected = expectedHTML;
  const ranges = global.parseExpensiMarkToRanges(actual);
  const markdownRanges: MarkdownTypes.MarkdownRange[] = ranges.map((range) => {
    const [type, startIndex, length] = range;
    return {
      type: type as MarkdownType,
      startIndex,
      length,
    };
  });

  const actualDOM = ParserUtils.parseRangesToHTMLNodes(actual, markdownRanges, {}, true);
  const actualHTML = actualDOM.innerHTML;

  if (actualHTML === expected) {
    expected = actualHTML;
  }
  if (actualHTML !== expected) {
    return {
      pass: false,
      message: () => `Expected:\t${JSON.stringify(expected)},\n got:\t${JSON.stringify(actualHTML)}`,
    };
  }
  return {message: () => '', pass: true};
};

expect.extend({
  toBeParsedAsHTML,
});

declare module 'expect' {
  interface AsymmetricMatchers {
    toBeParsedAsHTML(expectedHTML: string): void;
  }
  interface Matchers<R> {
    toBeParsedAsHTML(expectedHTML: string): R;
  }
}

test('empty string', () => {
  expect('').toBeParsedAsHTML('');
});

test('no formatting', () => {
  expect('Hello, world!').toBeParsedAsHTML('Hello, world!');
});

test('bold', () => {
  expect('Hello, *world*').toBeParsedAsHTML('Hello, <span class="syntax">*</span><span class="bold">world</span><span class="syntax">*</span>');
});

test('italic', () => {
  expect('Hello, _world_!').toBeParsedAsHTML('Hello, <span class="syntax">_</span><span class="italic">world</span><span class="syntax">_</span>!');
});

test('strikethrough', () => {
  expect('Hello, ~world~!').toBeParsedAsHTML('Hello, <span class="syntax">~</span><span class="strikethrough">world</span><span class="syntax">~</span>!');
});

describe('mention-here', () => {
  test('normal', () => {
    expect('@here Hello!').toBeParsedAsHTML('<span class="mention-here">@here</span> Hello!');
  });

  test('with punctation marks', () => {
    expect('@here!').toBeParsedAsHTML('<span class="mention-here">@here</span>!');
  });

  test('at the beginning of a heading', () => {
    expect('# @here').toBeParsedAsHTML('<span class="syntax"># </span><span class="h1"><span class="mention-here">@here</span></span>');
  });
});

describe('mention-user', () => {
  test('normal', () => {
    expect('@mail@mail.com Hello!').toBeParsedAsHTML('<span class="mention-user">@mail@mail.com</span> Hello!');
  });

  test('with punctation marks', () => {
    expect('@mail@mail.com!').toBeParsedAsHTML('<span class="mention-user">@mail@mail.com</span>!');
  });

  test('at the beginning of a heading', () => {
    expect('# @mail@mail.com').toBeParsedAsHTML('<span class="syntax"># </span><span class="h1"><span class="mention-user">@mail@mail.com</span></span>');
  });
});

describe('link', () => {
  test('plain link', () => {
    expect('https://example.com').toBeParsedAsHTML('<span class="link">https://example.com</span>');
  });

  test('labeled link', () => {
    expect('[Link](https://example.com)').toBeParsedAsHTML(
      '<span class="syntax">[</span>Link<span class="syntax">](</span><span class="link">https://example.com</span><span class="syntax">)</span>',
    );
  });

  test('link with same label as href', () => {
    expect('[https://example.com](https://example.com)').toBeParsedAsHTML(
      '<span class="syntax">[</span>https://example.com<span class="syntax">](</span><span class="link">https://example.com</span><span class="syntax">)</span>',
    );
  });

  test('link with query string', () => {
    expect('https://example.com?name=John&age=25&city=NewYork').toBeParsedAsHTML('<span class="link">https://example.com?name=John&amp;age=25&amp;city=NewYork</span>');
  });
});

describe('email', () => {
  test('plain email', () => {
    expect('someone@example.com').toBeParsedAsHTML('<span class="link">someone@example.com</span>');
  });

  test('labeled email', () => {
    expect('[Email](mailto:someone@example.com)').toBeParsedAsHTML(
      '<span class="syntax">[</span>Email<span class="syntax">](</span><span class="link">mailto:someone@example.com</span><span class="syntax">)</span>',
    );
  });
});

describe('email with same label as address', () => {
  test('label and address without "mailto:"', () => {
    expect('[someone@example.com](someone@example.com)').toBeParsedAsHTML(
      '<span class="syntax">[</span>someone@example.com<span class="syntax">](</span><span class="link">someone@example.com</span><span class="syntax">)</span>',
    );
  });

  test('label with "mailto:"', () => {
    expect('[mailto:someone@example.com](someone@example.com)').toBeParsedAsHTML(
      '<span class="syntax">[</span>mailto:someone@example.com<span class="syntax">](</span><span class="link">someone@example.com</span><span class="syntax">)</span>',
    );
  });

  test('address with "mailto:"', () => {
    expect('[someone@example.com](mailto:someone@example.com)').toBeParsedAsHTML(
      '<span class="syntax">[</span>someone@example.com<span class="syntax">](</span><span class="link">mailto:someone@example.com</span><span class="syntax">)</span>',
    );
  });

  test('label and address with "mailto:"', () => {
    expect('[mailto:someone@example.com](mailto:someone@example.com)').toBeParsedAsHTML(
      '<span class="syntax">[</span>mailto:someone@example.com<span class="syntax">](</span><span class="link">mailto:someone@example.com</span><span class="syntax">)</span>',
    );
  });
});

test('inline code', () => {
  expect('Hello `world`!').toBeParsedAsHTML('Hello <span class="syntax">`</span><span class="code">world</span><span class="syntax">`</span>!');
});

test('codeblock', () => {
  expect('```\nHello world!\n```').toBeParsedAsHTML('<span class="syntax">```</span><span class="pre"><br>Hello world!<br></span><span class="syntax">```</span>');
});

describe('quote', () => {
  test('with single space', () => {
    expect('> Hello world!').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span> Hello world!</span>');
  });

  test('with multiple spaces', () => {
    expect('>      Hello world!').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span>      Hello world!</span>');
  });

  test('without space', () => {
    expect('>Hello world!').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span>Hello world!</span>');
  });
});

test('multiple blockquotes', () => {
  expect('> Hello\n> beautiful\n> world').toBeParsedAsHTML(
    '<span class="blockquote"><span class="syntax">&gt;</span> Hello</span><br><span class="blockquote"><span class="syntax">&gt;</span> beautiful</span><br><span class="blockquote"><span class="syntax">&gt;</span> world</span>',
  );
});

test('separate blockquotes', () => {
  expect('> Lorem ipsum\ndolor\n> sit amet').toBeParsedAsHTML(
    '<span class="blockquote"><span class="syntax">&gt;</span> Lorem ipsum</span><br>dolor<br><span class="blockquote"><span class="syntax">&gt;</span> sit amet</span>',
  );
});

test('nested blockquotes', () => {
  expect('>>>> Lorem ipsum dolor sit amet').toBeParsedAsHTML(
    '<span class="blockquote"><span class="syntax">&gt;</span><span class="blockquote"><span class="syntax">&gt;</span><span class="blockquote"><span class="syntax">&gt;</span><span class="blockquote"><span class="syntax">&gt;</span> Lorem ipsum dolor sit amet</span></span></span></span>',
  );
});

test('heading', () => {
  expect('# Hello world').toBeParsedAsHTML('<span class="syntax"># </span><span class="h1">Hello world</span>');
});

test('nested bold and italic', () => {
  expect('*_Hello_*, _*world*_!').toBeParsedAsHTML(
    '<span class="syntax">*</span><span class="bold"><span class="syntax">_</span><span class="italic">Hello</span><span class="syntax">_</span></span><span class="syntax">*</span>, <span class="syntax">_</span><span class="italic"><span class="syntax">*</span><span class="bold">world</span><span class="syntax">*</span></span><span class="syntax">_</span>!',
  );
});

describe('nested heading in blockquote', () => {
  test('without spaces', () => {
    expect('># Hello world').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span><span class="syntax"># </span><span class="h1">Hello world</span></span>');
  });

  test('with single space', () => {
    expect('> # Hello world').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span> <span class="syntax"># </span><span class="h1">Hello world</span></span>');
  });

  test('with multiple spaces after #', () => {
    expect('>#    Hello world').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span><span class="syntax"># </span><span class="h1">   Hello world</span></span>');
  });
});

describe('trailing whitespace', () => {
  describe('after blockquote', () => {
    test('nothing', () => {
      expect('> Hello world').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span> Hello world</span>');
    });

    test('single space', () => {
      expect('> Hello world ').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span> Hello world </span>');
    });

    test('newline', () => {
      expect('> Hello world\n').toBeParsedAsHTML('<span class="blockquote"><span class="syntax">&gt;</span> Hello world</span><br>');
    });
  });

  describe('after heading', () => {
    test('nothing', () => {
      expect('# Hello world').toBeParsedAsHTML('<span class="syntax"># </span><span class="h1">Hello world</span>');
    });

    test('single space', () => {
      expect('# Hello world ').toBeParsedAsHTML('<span class="syntax"># </span><span class="h1">Hello world </span>');
    });

    test('multiple spaces', () => {
      expect('#   Hello world ').toBeParsedAsHTML('<span class="syntax"># </span><span class="h1">  Hello world </span>');
    });

    test('newline', () => {
      expect('# Hello world\n').toBeParsedAsHTML('<span class="syntax"># </span><span class="h1">Hello world</span><br>');
    });

    test('multiple quotes', () => {
      expect('> # Hello\n> # world').toBeParsedAsHTML(
        '<span class="blockquote"><span class="syntax">&gt;</span> <span class="syntax"># </span><span class="h1">Hello</span></span><br><span class="blockquote"><span class="syntax">&gt;</span> <span class="syntax"># </span><span class="h1">world</span></span>',
      );
    });
  });
});
