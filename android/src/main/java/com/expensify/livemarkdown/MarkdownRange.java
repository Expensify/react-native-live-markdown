package com.expensify.livemarkdown;

public class MarkdownRange {
  public String type;
  public int start;
  public int end;
  public int length;
  public int depth;

  public MarkdownRange(String type, int start, int end, int depth) {
    this.type = type;
    this.start = start;
    this.end = end;
    this.length = end - start + 1;
    this.depth = depth;

  }
}
