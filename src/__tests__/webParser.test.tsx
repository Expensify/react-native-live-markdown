/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@jest/globals';
import {parseRangesToHTMLNodes} from '../web/utils/parserUtils';
import parseExpensiMark from '../parseExpensiMark';

declare module 'expect' {
  interface Matchers<R> {
    toBeParsedAsHTML(expectedHTML: string): R;
  }
}

const toBeParsedAsHTML = function (actual: string, expectedHTML: string) {
  if (typeof actual !== 'string') {
    throw new Error('Actual value must be a string');
  }
  let expected = expectedHTML;
  const markdownRanges = parseExpensiMark(actual);

  const actualDOM = parseRangesToHTMLNodes(actual, markdownRanges, true, {}, true).dom;
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
  return {pass: true, message: () => ''};
};

expect.extend({
  toBeParsedAsHTML,
});

test('empty string', () => {
  expect('').toBeParsedAsHTML('<p data-type="line" data-id="0"><span data-type="br" data-id="0,0"><br data-id="0,0,0"></span></p>');
});

test('no formatting', () => {
  expect('Hello, world!').toBeParsedAsHTML('<p data-type="line" data-id="0"><span data-type="text" data-id="0,0">Hello, world!</span></p>');
});

test('bold', () => {
  expect('Hello, *world*!').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="text" data-id="0,0">Hello, </span><span data-type="syntax" data-id="0,1"><span data-type="text" data-id="0,1,0">*</span></span><span data-type="bold" data-id="0,2"><span data-type="text" data-id="0,2,0">world</span></span><span data-type="syntax" data-id="0,3"><span data-type="text" data-id="0,3,0">*</span></span><span data-type="text" data-id="0,4">!</span></p>',
  );
});

test('italic', () => {
  expect('Hello, _world_!').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="text" data-id="0,0">Hello, </span><span data-type="syntax" data-id="0,1"><span data-type="text" data-id="0,1,0">_</span></span><span data-type="italic" data-id="0,2"><span data-type="text" data-id="0,2,0">world</span></span><span data-type="syntax" data-id="0,3"><span data-type="text" data-id="0,3,0">_</span></span><span data-type="text" data-id="0,4">!</span></p>',
  );
});

test('strikethrough', () => {
  expect('Hello, ~world~!').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="text" data-id="0,0">Hello, </span><span data-type="syntax" data-id="0,1"><span data-type="text" data-id="0,1,0">~</span></span><span data-type="strikethrough" data-id="0,2"><span data-type="text" data-id="0,2,0">world</span></span><span data-type="syntax" data-id="0,3"><span data-type="text" data-id="0,3,0">~</span></span><span data-type="text" data-id="0,4">!</span></p>',
  );
});

describe('mention-here', () => {
  test('normal', () => {
    expect('@here Hello!').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="mention-here" data-id="0,0"><span data-type="text" data-id="0,0,0">@here</span></span><span data-type="text" data-id="0,1"> Hello!</span></p>',
    );
  });

  test('with punctation marks', () => {
    expect('@here!').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="mention-here" data-id="0,0"><span data-type="text" data-id="0,0,0">@here</span></span><span data-type="text" data-id="0,1">!</span></p>',
    );
  });

  test('at the beginning of a heading', () => {
    expect('# @here').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0"># </span></span><span data-type="h1" data-id="0,1"><span data-type="mention-here" data-id="0,1,0"><span data-type="text" data-id="0,1,0,0">@here</span></span></span></p>',
    );
  });
});

describe('mention-user', () => {
  test('normal', () => {
    expect('@mail@mail.com Hello!').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="mention-user" data-id="0,0"><span data-type="text" data-id="0,0,0">@mail@mail.com</span></span><span data-type="text" data-id="0,1"> Hello!</span></p>',
    );
  });

  test('with punctation marks', () => {
    expect('@mail@mail.com!').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="mention-user" data-id="0,0"><span data-type="text" data-id="0,0,0">@mail@mail.com</span></span><span data-type="text" data-id="0,1">!</span></p>',
    );
  });

  test('at the beginning of a heading', () => {
    expect('# @mail@mail.com').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0"># </span></span><span data-type="h1" data-id="0,1"><span data-type="mention-user" data-id="0,1,0"><span data-type="text" data-id="0,1,0,0">@mail@mail.com</span></span></span></p>',
    );
  });
});

describe('link', () => {
  test('plain link', () => {
    expect('https://example.com').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="link" data-id="0,0"><span data-type="text" data-id="0,0,0">https://example.com</span></span></p>',
    );
  });

  test('labeled link', () => {
    expect('[Link](https://example.com)').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">[</span></span><span data-type="text" data-id="0,1">Link</span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">](</span></span><span data-type="link" data-id="0,3"><span data-type="text" data-id="0,3,0">https://example.com</span></span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">)</span></span></p>',
    );
  });

  test('link with same label as href', () => {
    expect('[https://example.com](https://example.com)').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">[</span></span><span data-type="text" data-id="0,1">https://example.com</span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">](</span></span><span data-type="link" data-id="0,3"><span data-type="text" data-id="0,3,0">https://example.com</span></span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">)</span></span></p>',
    );
  });

  test('link with query string', () => {
    expect('https://example.com?name=John&age=25&city=NewYork').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="link" data-id="0,0"><span data-type="text" data-id="0,0,0">https://example.com?name=John&amp;age=25&amp;city=NewYork</span></span></p>',
    );
  });
});

describe('email', () => {
  test('plain email', () => {
    expect('someone@example.com').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="link" data-id="0,0"><span data-type="text" data-id="0,0,0">someone@example.com</span></span></p>',
    );
  });

  test('labeled email', () => {
    expect('[Email](mailto:someone@example.com)').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">[</span></span><span data-type="text" data-id="0,1">Email</span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">](</span></span><span data-type="link" data-id="0,3"><span data-type="text" data-id="0,3,0">mailto:someone@example.com</span></span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">)</span></span></p>',
    );
  });
});

describe('email with same label as address', () => {
  test('label and address without "mailto:"', () => {
    expect('[someone@example.com](someone@example.com)').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">[</span></span><span data-type="text" data-id="0,1">someone@example.com</span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">](</span></span><span data-type="link" data-id="0,3"><span data-type="text" data-id="0,3,0">someone@example.com</span></span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">)</span></span></p>',
    );
  });

  test('label with "mailto:"', () => {
    expect('[mailto:someone@example.com](someone@example.com)').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">[</span></span><span data-type="text" data-id="0,1">mailto:someone@example.com</span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">](</span></span><span data-type="link" data-id="0,3"><span data-type="text" data-id="0,3,0">someone@example.com</span></span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">)</span></span></p>',
    );
  });

  test('address with "mailto:"', () => {
    expect('[someone@example.com](mailto:someone@example.com)').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">[</span></span><span data-type="text" data-id="0,1">someone@example.com</span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">](</span></span><span data-type="link" data-id="0,3"><span data-type="text" data-id="0,3,0">mailto:someone@example.com</span></span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">)</span></span></p>',
    );
  });

  test('label and address with "mailto:"', () => {
    expect('[mailto:someone@example.com](mailto:someone@example.com)').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">[</span></span><span data-type="text" data-id="0,1">mailto:someone@example.com</span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">](</span></span><span data-type="link" data-id="0,3"><span data-type="text" data-id="0,3,0">mailto:someone@example.com</span></span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">)</span></span></p>',
    );
  });
});

test('inline code', () => {
  expect('Hello `world`!').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="text" data-id="0,0">Hello </span><span data-type="syntax" data-id="0,1"><span data-type="text" data-id="0,1,0">`</span></span><span data-type="code" data-id="0,2"><span data-type="text" data-id="0,2,0">world</span></span><span data-type="syntax" data-id="0,3"><span data-type="text" data-id="0,3,0">`</span></span><span data-type="text" data-id="0,4">!</span></p>',
  );
});

test('codeblock', () => {
  expect('```\nHello world!\n```').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">```</span></span><span data-type="pre" data-id="0,1"><span data-type="br" data-id="0,1,0"><br data-id="0,1,0,0"></span><span data-type="text" data-id="0,1,1">Hello world!</span><span data-type="br" data-id="0,1,2"><br data-id="0,1,2,0"></span></span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">```</span></span></p>',
  );
});

describe('quote', () => {
  test('with single space', () => {
    expect('> Hello world!').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> Hello world!</span></span></p>',
    );
  });

  test('with multiple spaces', () => {
    expect('>      Hello world!').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1">      Hello world!</span></span></p>',
    );
  });
});

test('multiple blockquotes', () => {
  expect('> Hello\n> beautiful\n> world').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> Hello</span></span></p><p data-type="line" data-id="1"><span data-type="blockquote" data-id="1,0"><span data-type="syntax" data-id="1,0,0"><span data-type="text" data-id="1,0,0,0">&gt;</span></span><span data-type="text" data-id="1,0,1"> beautiful</span></span></p><p data-type="line" data-id="2"><span data-type="blockquote" data-id="2,0"><span data-type="syntax" data-id="2,0,0"><span data-type="text" data-id="2,0,0,0">&gt;</span></span><span data-type="text" data-id="2,0,1"> world</span></span></p>',
  );
});

test('separate blockquotes', () => {
  expect('> Lorem ipsum\ndolor\n> sit amet').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> Lorem ipsum</span></span></p><p data-type="line" data-id="1"><span data-type="text" data-id="1,0">dolor</span></p><p data-type="line" data-id="2"><span data-type="blockquote" data-id="2,0"><span data-type="syntax" data-id="2,0,0"><span data-type="text" data-id="2,0,0,0">&gt;</span></span><span data-type="text" data-id="2,0,1"> sit amet</span></span></p>',
  );
});

test('blockquote with whitespace between syntaxes', () => {
  expect('> > > > Lorem ipsum dolor sit amet').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> &gt; &gt; &gt; Lorem ipsum dolor sit amet</span></span></p>',
  );
});

test('nested blockquotes', () => {
  expect('>>>> Lorem ipsum dolor sit amet').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="blockquote" data-id="0,0,0"><span data-type="blockquote" data-id="0,0,0,0"><span data-type="syntax" data-id="0,0,0,0,0"><span data-type="text" data-id="0,0,0,0,0,0">&gt;</span></span><span data-type="syntax" data-id="0,0,0,0,1"><span data-type="text" data-id="0,0,0,0,1,0">&gt;</span></span><span data-type="syntax" data-id="0,0,0,0,2"><span data-type="text" data-id="0,0,0,0,2,0">&gt;</span></span><span data-type="text" data-id="0,0,0,0,3">&gt; Lorem ipsum dolor sit amet</span></span></span></span></p>',
  );
});

test('heading', () => {
  expect('# Hello world').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0"># </span></span><span data-type="h1" data-id="0,1"><span data-type="text" data-id="0,1,0">Hello world</span></span></p>',
  );
});

test('nested bold and italic', () => {
  expect('*_Hello_*, _*world*_!').toBeParsedAsHTML(
    '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0">*</span></span><span data-type="bold" data-id="0,1"><span data-type="syntax" data-id="0,1,0"><span data-type="text" data-id="0,1,0,0">_</span></span><span data-type="italic" data-id="0,1,1"><span data-type="text" data-id="0,1,1,0">Hello</span></span><span data-type="syntax" data-id="0,1,2"><span data-type="text" data-id="0,1,2,0">_</span></span></span><span data-type="syntax" data-id="0,2"><span data-type="text" data-id="0,2,0">*</span></span><span data-type="text" data-id="0,3">, </span><span data-type="syntax" data-id="0,4"><span data-type="text" data-id="0,4,0">_</span></span><span data-type="italic" data-id="0,5"><span data-type="syntax" data-id="0,5,0"><span data-type="text" data-id="0,5,0,0">*</span></span><span data-type="bold" data-id="0,5,1"><span data-type="text" data-id="0,5,1,0">world</span></span><span data-type="syntax" data-id="0,5,2"><span data-type="text" data-id="0,5,2,0">*</span></span></span><span data-type="syntax" data-id="0,6"><span data-type="text" data-id="0,6,0">_</span></span><span data-type="text" data-id="0,7">!</span></p>',
  );
});

describe('nested heading in blockquote', () => {
  test('with single space', () => {
    expect('> # Hello world').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> </span><span data-type="syntax" data-id="0,0,2"><span data-type="text" data-id="0,0,2,0"># </span></span><span data-type="h1" data-id="0,0,3"><span data-type="text" data-id="0,0,3,0">Hello world</span></span></span></p>',
    );
  });

  test('with multiple spaces after #', () => {
    expect('> #    Hello world').toBeParsedAsHTML(
      '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> </span><span data-type="syntax" data-id="0,0,2"><span data-type="text" data-id="0,0,2,0"># </span></span><span data-type="h1" data-id="0,0,3"><span data-type="text" data-id="0,0,3,0">   Hello world</span></span></span></p>',
    );
  });
});

describe('trailing whitespace', () => {
  describe('after blockquote', () => {
    test('nothing', () => {
      expect('> Hello world').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> Hello world</span></span></p>',
      );
    });

    test('single space', () => {
      expect('> Hello world ').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> Hello world </span></span></p>',
      );
    });

    test('newline', () => {
      expect('> Hello world\n').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> Hello world</span></span></p><p data-type="line" data-id="1"><span data-type="br" data-id="1,0"><br data-id="1,0,0"></span></p>',
      );
    });
  });

  describe('after heading', () => {
    test('nothing', () => {
      expect('# Hello world').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0"># </span></span><span data-type="h1" data-id="0,1"><span data-type="text" data-id="0,1,0">Hello world</span></span></p>',
      );
    });

    test('single space', () => {
      expect('# Hello world ').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0"># </span></span><span data-type="h1" data-id="0,1"><span data-type="text" data-id="0,1,0">Hello world </span></span></p>',
      );
    });

    test('multiple spaces', () => {
      expect('#   Hello world ').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0"># </span></span><span data-type="h1" data-id="0,1"><span data-type="text" data-id="0,1,0">  Hello world </span></span></p>',
      );
    });

    test('newline', () => {
      expect('# Hello world\n').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="syntax" data-id="0,0"><span data-type="text" data-id="0,0,0"># </span></span><span data-type="h1" data-id="0,1"><span data-type="text" data-id="0,1,0">Hello world</span></span></p><p data-type="line" data-id="1"><span data-type="br" data-id="1,0"><br data-id="1,0,0"></span></p>',
      );
    });

    test('multiple quotes', () => {
      expect('> # Hello\n> # world').toBeParsedAsHTML(
        '<p data-type="line" data-id="0"><span data-type="blockquote" data-id="0,0"><span data-type="syntax" data-id="0,0,0"><span data-type="text" data-id="0,0,0,0">&gt;</span></span><span data-type="text" data-id="0,0,1"> </span><span data-type="syntax" data-id="0,0,2"><span data-type="text" data-id="0,0,2,0"># </span></span><span data-type="h1" data-id="0,0,3"><span data-type="text" data-id="0,0,3,0">Hello</span></span></span></p><p data-type="line" data-id="1"><span data-type="blockquote" data-id="1,0"><span data-type="syntax" data-id="1,0,0"><span data-type="text" data-id="1,0,0,0">&gt;</span></span><span data-type="text" data-id="1,0,1"> </span><span data-type="syntax" data-id="1,0,2"><span data-type="text" data-id="1,0,2,0"># </span></span><span data-type="h1" data-id="1,0,3"><span data-type="text" data-id="1,0,3,0">world</span></span></span></p>',
      );
    });
  });
});
