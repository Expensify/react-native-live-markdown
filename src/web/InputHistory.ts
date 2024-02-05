type HistoryItem = {
  text: string;
  cursorPosition: number | null;
};

export default class InputHistory {
  depth: number;

  history: HistoryItem[];

  historyIndex: number;

  currentText: string | null = null;

  timeout: NodeJS.Timeout | null = null;

  debounceTime: number;

  constructor(depth: number, debounceTime = 200) {
    this.depth = depth;
    this.history = [];
    this.historyIndex = 0;
    this.debounceTime = debounceTime;
  }

  debouncedAdd(text: string, cursorPosition: number): void {
    this.currentText = text;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      if (this.currentText == null) {
        return;
      }
      this.add(this.currentText, cursorPosition);
      this.currentText = null;
    }, this.debounceTime);
  }

  add(text: string, cursorPosition: number): void {
    if (this.history.length > 0) {
      const lastItem = this.history[this.history.length - 1];
      if (lastItem && text === lastItem.text) {
        return;
      }
    }

    if (this.historyIndex < this.history.length - 1) {
      this.history.splice(this.historyIndex + 1);
    }

    this.history.push({text, cursorPosition});
    if (this.history.length > this.depth) {
      this.history.shift();
    }

    this.historyIndex = this.history.length - 1;
  }

  undo(): HistoryItem | null {
    if (this.currentText !== null && this.timeout) {
      clearTimeout(this.timeout);
      return this.history[this.history.length - 1] || null;
    }

    if (this.history.length === 0) {
      return null;
    }

    if (this.historyIndex > 0) {
      this.historyIndex -= 1;
    }
    return this.history[this.historyIndex] || null;
  }

  redo(): HistoryItem | null {
    if (this.history.length === 0 || (this.currentText !== null && this.timeout)) {
      return null;
    }

    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex += 1;
    } else {
      return null;
    }
    return this.history[this.historyIndex] || null;
  }
}
