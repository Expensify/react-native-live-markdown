import {expect} from '@jest/globals';
import InputHistory from '../web/InputHistory';

const testingHistory = [
  {text: 'Hello world!', cursorPosition: 12},
  {text: 'Hello *world*!', cursorPosition: 14},
  {text: 'Hello _*world*_!', cursorPosition: 16},
];
const depth = testingHistory.length;

test('add history action', () => {
  const history = new InputHistory(depth);
  testingHistory.forEach((item) => {
    history.add(item.text, item.cursorPosition);
  });

  expect(history.history).toEqual(testingHistory);
  expect(history.getCurrentItem()).toEqual(testingHistory[testingHistory.length - 1]);
});

test('history depth', () => {
  const history = new InputHistory(depth);
  const text = '> Hello _*world*_!';

  history.setHistory(testingHistory);
  history.add(text, text.length);

  const newItem = {text, cursorPosition: text.length};
  const currentHistory = [...testingHistory.slice(1), newItem];

  expect(history.history).toEqual(currentHistory);
  expect(history.getCurrentItem()).toEqual(newItem);
});

describe('debounce add history action', () => {
  const text = 'Hello world!';
  const newItem = {text, cursorPosition: text.length};
  const text2 = 'Hello world 2!';
  const newItem2 = {text: text2, cursorPosition: text2.length};

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should debounce', () => {
    const history = new InputHistory(depth, 300);
    history.debouncedAdd(newItem.text, newItem.cursorPosition);
    expect(history.history).toEqual([]);
    jest.advanceTimersByTime(300);
    expect(history.history).toEqual([newItem]);
  });

  test('should cancel previous invocation', () => {
    const history = new InputHistory(depth, 300);
    history.debouncedAdd(newItem.text, newItem.cursorPosition);
    jest.advanceTimersByTime(100);
    history.debouncedAdd(newItem2.text, newItem2.cursorPosition);
    jest.advanceTimersByTime(300);
    expect(history.history).toEqual([newItem2]);
  });

  test('undo before debounce invokes the function', () => {
    const history = new InputHistory(depth, 300);
    history.debouncedAdd(newItem.text, newItem.cursorPosition);
    expect(history.undo()).toEqual(null);
    jest.advanceTimersByTime(300);
    expect(history.history).toEqual([]);
  });

  test('redo before debounce invokes the function', () => {
    const history = new InputHistory(depth, 300);
    history.debouncedAdd(newItem.text, newItem.cursorPosition);
    expect(history.redo()).toEqual(null);
    jest.advanceTimersByTime(300);
    expect(history.history).toEqual([]);
  });
});

test('undo history action', () => {
  const history = new InputHistory(depth);
  history.setHistory(testingHistory);

  expect(history.undo()).toEqual(testingHistory[1]);

  history.setHistoryIndex(0);
  expect(history.undo()).toEqual(null);
});

test('redo history action', () => {
  const history = new InputHistory(depth);
  history.setHistory(testingHistory);
  expect(history.redo()).toEqual(null);

  history.setHistoryIndex(1);
  expect(history.redo()).toEqual(testingHistory[2]);
});

test('clearing history after adding new text after undo', () => {
  const history = new InputHistory(depth);
  history.setHistory(testingHistory);
  history.setHistoryIndex(0);

  const text = '> Hello _*world*_!';
  const newItem = {text, cursorPosition: text.length};

  history.add(newItem.text, newItem.cursorPosition);

  expect(history.history).toEqual([testingHistory[0], newItem]);
  expect(history.getCurrentItem()).toEqual(newItem);
});
