import {ExpensiMark} from 'expensify-common';
import {expect} from '@jest/globals';
import {getFormatRule, removeFormat} from '../web/utils/formatToggleUtils';

describe('getFormatRule', () => {
  test('return regexes consistent with those in expensify-common', () => {
    const parser = new ExpensiMark();

    const boldRule = getFormatRule('formatBold');
    const boldRegex = (parser.rules.find((rule) => rule.name === 'bold') as {regex: RegExp}).regex;
    expect(boldRule?.regex.source).toEqual(boldRegex.source);
    expect(boldRule?.regex.flags.replace('d', '')).toEqual(boldRegex.flags);

    const italicRule = getFormatRule('formatItalic');
    const italicRegex = (parser.rules.find((rule) => rule.name === 'italic') as {regex: RegExp}).regex;
    expect(italicRule?.regex.source).toEqual(italicRegex.source);
    expect(italicRule?.regex.flags.replace('d', '')).toEqual(italicRegex.flags);
  });
});

describe('removeFormat', () => {
  test('do not remove bold formatting from normal text', () => {
    const result = removeFormat('*aaa* bbb *ccc*', 6, 9, 'formatBold');
    expect(result).toBeNull();
  });

  test('remove bold formatting from bold text', () => {
    const result = removeFormat('*aaa* *bbb* *ccc*', 7, 10, 'formatBold');
    expect(result).toEqual({updatedText: '*aaa* bbb *ccc*', cursorOffset: -1});
  });

  test('remove bold formatting from bold text with markdown symbols', () => {
    const result = removeFormat('*aaa* *bbb* *ccc*', 6, 11, 'formatBold');
    expect(result).toEqual({updatedText: '*aaa* bbb *ccc*', cursorOffset: -2});
  });

  test('do not remove italic formatting from normal text', () => {
    const result = removeFormat('_aaa_ bbb _ccc_', 6, 9, 'formatItalic');
    expect(result).toBeNull();
  });

  test('remove italic formatting from italic text', () => {
    const result = removeFormat('_aaa_ _bbb_ _ccc_', 7, 10, 'formatItalic');
    expect(result).toEqual({updatedText: '_aaa_ bbb _ccc_', cursorOffset: -1});
  });

  test('remove italic formatting from italic text with markdown symbols', () => {
    const result = removeFormat('_aaa_ _bbb_ _ccc_', 6, 11, 'formatItalic');
    expect(result).toEqual({updatedText: '_aaa_ bbb _ccc_', cursorOffset: -2});
  });

  test('do not remove bold formatting from italic text', () => {
    const result = removeFormat('*aaa* _bbb_ *ccc*', 6, 11, 'formatBold');
    expect(result).toBeNull();
  });

  test('remove bold formatting from bold-italic text', () => {
    const result = removeFormat('*aaa* *_bbb_* *ccc*', 7, 12, 'formatBold');
    expect(result).toEqual({updatedText: '*aaa* _bbb_ *ccc*', cursorOffset: -1});
  });

  test('do not remove italic formatting from bold text', () => {
    const result = removeFormat('_aaa_ *bbb* _ccc_', 6, 11, 'formatItalic');
    expect(result).toBeNull();
  });

  test('remove italic formatting from bold-italic text', () => {
    const result = removeFormat('_aaa_ _*bbb*_ _ccc_', 7, 12, 'formatItalic');
    expect(result).toEqual({updatedText: '_aaa_ *bbb* _ccc_', cursorOffset: -1});
  });
});
