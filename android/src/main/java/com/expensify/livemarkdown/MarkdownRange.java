package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

public class MarkdownRange {
  private final @NonNull String mType;
  private final int mStart;
  private final int mEnd;
  private final int mLength;
  private final int mDepth;

  public MarkdownRange(@NonNull String type, int start, int length, int depth) {
    mType = type;
    mStart = start;
    mEnd = start + length;
    mLength = length;
    mDepth = depth;
  }

  public String getType() {
    return mType;
  }

  public int getStart() {
    return mStart;
  }

  public int getEnd() {
    return mEnd;
  }

  public int getLength() {
    return mLength;
  }

  public int getDepth() {
    return mDepth;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }

    if (o instanceof MarkdownRange other) {
      return this.mType.equals(other.mType)
        && this.mStart == other.mStart
        && this.mEnd == other.mEnd
        && this.mLength == other.mLength
        && this.mDepth == other.mDepth;
    }
    return false;
  }

  @NonNull
  @Override
  public String toString() {
    return "MarkdownRange{" +
      "type='" + mType + "'" +
      ", start=" + mStart +
      ", end=" + mEnd +
      ", length=" + mLength +
      ", depth=" + mDepth +
      "}";
  }
}
