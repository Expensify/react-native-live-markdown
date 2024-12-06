package com.expensify.livemarkdown;

public class MarkdownRange {
  private final String mType;
  private final int mStart;
  private final int mEnd;
  private final int mLength;
  private final int mDepth;

  public MarkdownRange(String type, int start, int length, int depth) {
    mType = type;
    mStart = start;
    mLength = length;
    mEnd = start + length;
    mDepth = depth;
  }

  public String getType() {
    return mType;
  }

  public int getStart() {
    return mStart;
  }

  public int getLength() {
    return mLength;
  }

  public int getEnd() {
    return mEnd;
  }

  public int getDepth() {
    return mDepth;
  }
}
