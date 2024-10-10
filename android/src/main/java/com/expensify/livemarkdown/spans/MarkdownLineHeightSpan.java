package com.expensify.livemarkdown.spans;

import android.graphics.Paint;
import android.text.style.LineHeightSpan;

public class MarkdownLineHeightSpan implements MarkdownSpan, LineHeightSpan {
  private final float mLineHeight;

  public MarkdownLineHeightSpan(float lineHeight) {
    mLineHeight = lineHeight;
  }

  @Override
  public void chooseHeight(CharSequence text, int start, int end, int spanstartv, int lineHeight, Paint.FontMetricsInt fm) {
    fm.top -= mLineHeight / 4;
    fm.ascent -= mLineHeight / 4;
  }
}
