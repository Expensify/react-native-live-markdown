type MarkdownType = 'bold' | 'italic' | 'strikethrough' | 'emoji' | 'mention-here' | 'mention-user' | 'mention-report' | 'link' | 'code' | 'pre' | 'blockquote' | 'h1' | 'syntax';

interface MarkdownRange {
  type: MarkdownType;
  start: number;
  length: number;
  depth?: number;
}

export type {MarkdownType, MarkdownRange};
