package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

public class MarkdownRange {
  private final @NonNull String mType;
  private final int mStart;
  private final int mLength;
  private final int mDepth;

  public MarkdownRange(@NonNull String type, int start, int length, int depth) {
    mType = type;
    mStart = start;
    mLength = length;
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

  public int getDepth() {
    return mDepth;
  }
}
