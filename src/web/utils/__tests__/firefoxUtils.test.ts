import * as CursorUtils from '../cursorUtils';
import type {MarkdownTextInputElement} from '../../../MarkdownTextInput.web';
import {handleFirefoxArrowKeyNavigation} from '../firefoxUtils';

const createMockTarget = (value: string): MarkdownTextInputElement => {
  const div = document.createElement('div') as unknown as MarkdownTextInputElement;
  div.value = value;
  return div;
};

jest.mock('../cursorUtils', () => ({
  ...jest.requireActual('../cursorUtils'),
  getCurrentCursorPosition: jest.fn(),
  setCursorPosition: jest.fn(),
}));

describe('handleFirefoxArrowKeyNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing if no cursor in target', () => {
    const target = createMockTarget('test');
    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValue(null);

    handleFirefoxArrowKeyNavigation(target);
    expect(CursorUtils.setCursorPosition).not.toHaveBeenCalled();
  });

  it('should move cursor to next grapheme boundary with regular text', () => {
    const target = createMockTarget('hello world');
    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValue({start: 5, end: 5});

    handleFirefoxArrowKeyNavigation(target);
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 6, 6);
  });

  it('should move cursor correctly when inside emoji', () => {
    const target = createMockTarget('😀text');
    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValue({start: 1, end: 1});

    handleFirefoxArrowKeyNavigation(target);
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 2, 2);
  });

  it('should not move cursor beyond text length', () => {
    const target = createMockTarget('test');

    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValue({start: 4, end: 4});
    handleFirefoxArrowKeyNavigation(target);
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 4, 4);
  });

  it('should handle multiple emojis', () => {
    const target = createMockTarget('😀😀text');
    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValueOnce({start: 0, end: 0}).mockReturnValueOnce({start: 2, end: 2});

    handleFirefoxArrowKeyNavigation(target);
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 2, 2);
    handleFirefoxArrowKeyNavigation(target);
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 4, 4);
  });

  it('should handle multiple emojis backward navigation', () => {
    const target = createMockTarget('😀😀text');
    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValueOnce({start: 4, end: 4}).mockReturnValueOnce({start: 2, end: 2});

    handleFirefoxArrowKeyNavigation(target, false, 'left');
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 2, 2);
    handleFirefoxArrowKeyNavigation(target, false, 'left');
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 2, 2);
  });

  it('should handle emoji selection', () => {
    const target = createMockTarget('😀😀text');
    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValueOnce({start: 0, end: 0}).mockReturnValueOnce({start: 2, end: 2});

    handleFirefoxArrowKeyNavigation(target, true);
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 0, 2);
    handleFirefoxArrowKeyNavigation(target);
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 4, 4);
  });
  it('should handle emoji selection backwards', () => {
    const target = createMockTarget('😀😀text');
    (CursorUtils.getCurrentCursorPosition as jest.Mock).mockReturnValueOnce({start: 4, end: 4}).mockReturnValueOnce({start: 2, end: 4});

    handleFirefoxArrowKeyNavigation(target, true, 'left');
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 2, 4);
    handleFirefoxArrowKeyNavigation(target, true, 'left');
    expect(CursorUtils.setCursorPosition).toHaveBeenCalledWith(target, 0, 4);
  });
});
