type HistoryItem = {
  text: string;
  cursorPosition: number | null;
};

export default class InputHistory {
  depth: number;

  items: HistoryItem[];

  historyIndex: number;

  currentText: string | null = null;

  timeout: NodeJS.Timeout | null = null;

  debounceTime: number;

  constructor(depth: number, debounceTime = 150, startingText = '') {
    this.depth = depth;
    this.items = [];
    this.historyIndex = 0;
    this.debounceTime = debounceTime;
    this.add(startingText, startingText.length);
  }

  getCurrentItem(): HistoryItem | null {
    return this.items[this.historyIndex] || null;
  }

  setHistory(newHistory: HistoryItem[]): void {
    this.items = newHistory.slice(newHistory.length - this.depth);
    this.historyIndex = newHistory.length - 1;
  }

  setHistoryIndex(index: number): void {
    this.historyIndex = index;
  }

  clear(): void {
    this.items = [];
    this.historyIndex = 0;
  }

  debouncedAdd(text: string, cursorPosition: number): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.currentText === null) {
      this.timeout = null;
      this.add(text, cursorPosition);
    } else {
      this.items[this.historyIndex] = {text, cursorPosition};
    }
    this.currentText = text;

    this.timeout = setTimeout(() => {
      this.currentText = null;
    }, this.debounceTime);
  }

  stopTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.currentText = null;
  }

  add(text: string, cursorPosition: number): void {
    if (this.items.length > 0) {
      const lastItem = this.items[this.items.length - 1];
      if (lastItem && text === lastItem.text) {
        this.historyIndex = this.items.length - 1;
        return;
      }
    }

    if (this.historyIndex < this.items.length - 1) {
      this.items.splice(this.historyIndex + 1);
    }

    this.items.push({text, cursorPosition});
    if (this.items.length > this.depth) {
      this.items.shift();
    }

    this.historyIndex = this.items.length - 1;
  }

  undo(): HistoryItem | null {
    this.stopTimeout();

    if (this.items.length === 0 || this.historyIndex - 1 < 0) {
      return null;
    }

    const currentHistoryItem = this.items[this.historyIndex];
    const previousHistoryItem = this.items[this.historyIndex - 1];

    const undoItem = previousHistoryItem
      ? {
          text: previousHistoryItem.text,
          cursorPosition: Math.min(
            (currentHistoryItem?.cursorPosition ?? 0) - ((currentHistoryItem?.text ?? '').replaceAll('\n', '').length - (previousHistoryItem?.text ?? '').replaceAll('\n', '').length),
            (previousHistoryItem?.text ?? '').length,
          ),
        }
      : null;

    if (this.historyIndex > 0) {
      this.historyIndex -= 1;
    }

    return undoItem;
  }

  redo(): HistoryItem | null {
    if (this.currentText !== null && this.timeout) {
      this.stopTimeout();
    }

    if (this.items.length === 0 || this.historyIndex + 1 > this.items.length) {
      return null;
    }

    if (this.historyIndex < this.items.length - 1) {
      this.historyIndex += 1;
    } else {
      return null;
    }

    return this.items[this.historyIndex] || null;
  }
}
