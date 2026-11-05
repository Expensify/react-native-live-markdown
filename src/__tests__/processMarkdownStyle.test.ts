import {processColor} from 'react-native';
import {processMarkdownStyle} from '../styleUtils';

describe('processMarkdownStyle', () => {
  it('falls back to the default color when markdownStyle has an invalid color name', () => {
    const style = processMarkdownStyle({
      pre: {
        backgroundColor: 'tranparent',
      },
    });

    expect(style.pre.backgroundColor).toBe(processColor('lightgray'));
  });

  it('falls back to the default color when markdownStyle uses CSS none', () => {
    const style = processMarkdownStyle({
      pre: {
        backgroundColor: 'none',
      },
    });

    expect(style.pre.backgroundColor).toBe(processColor('lightgray'));
  });

  it('still processes valid colors', () => {
    const style = processMarkdownStyle({
      pre: {
        backgroundColor: 'red',
      },
    });

    expect(style.pre.backgroundColor).toBe(processColor('red'));
  });

  it('does not let one invalid color wipe other processed colors', () => {
    const style = processMarkdownStyle({
      pre: {
        color: 'blue',
        backgroundColor: 'tranparent',
      },
    });

    expect(style.pre.color).toBe(processColor('blue'));
    expect(style.pre.backgroundColor).toBe(processColor('lightgray'));
  });
});
