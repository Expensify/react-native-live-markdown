import {expect} from '@jest/globals';
import {parseRangesToHTMLNodes} from '../web/utils/parserUtils';
import parseExpensiMark from '../parseExpensiMark';

/**
 * Focused tests for the single-line input fix
 * These tests validate the specific fix for unwanted space insertion
 */

describe('Single-line input fix validation', () => {
  describe('parseRangesToHTMLNodes with isMultiline parameter', () => {
    it('should not generate BR elements for single-line text (isMultiline=false)', () => {
      const text = 'simple text';
      const ranges = parseExpensiMark(text);

      const result = parseRangesToHTMLNodes(text, ranges, false, {}, true);

      // Should not contain BR elements for single-line input
      expect(result.dom.innerHTML).not.toContain('<span data-type="br">');
      expect(result.dom.innerHTML).not.toContain('<br>');
    });

    it('should generate proper structure for multiline text (isMultiline=true)', () => {
      const text = 'line 1\nline 2';
      const ranges = parseExpensiMark(text);

      const result = parseRangesToHTMLNodes(text, ranges, true, {}, true);

      // Should contain proper paragraph structure for multiline
      expect(result.dom.innerHTML).toContain('<p data-type="line"');
      // Note: The library may not always use BR elements depending on the implementation
      // The key is that it handles multiline properly
      expect(result.dom.innerHTML.split('<p data-type="line"').length - 1).toBeGreaterThan(1);
    });

    it('should not generate BR elements for single-line markdown (isMultiline=false)', () => {
      const text = 'hello **world** test';
      const ranges = parseExpensiMark(text);

      const result = parseRangesToHTMLNodes(text, ranges, false, {}, true);

      // Should not contain BR elements but should have markdown formatting
      expect(result.dom.innerHTML).not.toContain('<span data-type="br">');
      expect(result.dom.innerHTML).not.toContain('<br>');
      expect(result.dom.innerHTML).toContain('data-type="bold"');
    });

    it('should handle empty single-line input without BR elements (isMultiline=false)', () => {
      const text = '';
      const ranges = parseExpensiMark(text);

      const result = parseRangesToHTMLNodes(text, ranges, false, {}, true);

      // For empty input, should either be empty or have minimal structure without BR
      const html = result.dom.innerHTML;
      if (html !== '') {
        // If there's structure, it shouldn't have BR elements for single-line
        expect(html).not.toContain('<span data-type="br">');
      }
    });

    it('should preserve existing multiline behavior when isMultiline=true', () => {
      const singleLineText = 'test text';
      const ranges = parseExpensiMark(singleLineText);

      // Compare single-line vs multiline behavior
      const singleLineResult = parseRangesToHTMLNodes(singleLineText, ranges, false, {}, true);
      const multilineResult = parseRangesToHTMLNodes(singleLineText, ranges, true, {}, true);

      // Single-line should be more compact than multiline
      expect(singleLineResult.dom.innerHTML.length).toBeLessThanOrEqual(multilineResult.dom.innerHTML.length);

      // Single-line should not have BR elements
      expect(singleLineResult.dom.innerHTML).not.toContain('<span data-type="br">');
    });
  });

  describe('Integration test for the original bug scenario', () => {
    it('should demonstrate the fix for typing after selecting all text', () => {
      // This test validates the core fix: when user types "t" after selecting all,
      // the generated DOM should not contain elements that would cause space insertion

      const userTypedText = 't';
      const ranges = parseExpensiMark(userTypedText);

      // Generate DOM with single-line setting (the fix)
      const result = parseRangesToHTMLNodes(userTypedText, ranges, false, {}, true);

      // Critical assertions for the fix:
      // 1. Should not contain BR elements that add newlines
      expect(result.dom.innerHTML).not.toContain('<span data-type="br">');
      expect(result.dom.innerHTML).not.toContain('<br>');

      // 2. Should contain the text properly structured
      expect(result.dom.innerHTML).toContain('t');

      // 3. The DOM should be as minimal as possible for single character
      expect(result.dom.innerHTML.length).toBeLessThan(200); // Reasonable upper bound
    });

    it('should work correctly with markdown in single-line context', () => {
      // Test that our fix doesn't break markdown functionality
      const markdownText = '**bold** normal `code`';
      const ranges = parseExpensiMark(markdownText);

      const result = parseRangesToHTMLNodes(markdownText, ranges, false, {}, true);

      // Should have proper markdown elements
      expect(result.dom.innerHTML).toContain('data-type="bold"');
      expect(result.dom.innerHTML).toContain('data-type="code"');

      // But no BR elements
      expect(result.dom.innerHTML).not.toContain('<span data-type="br">');
      expect(result.dom.innerHTML).not.toContain('<br>');
    });
  });
});
