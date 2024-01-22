package com.expensify.livemarkdown;

import android.text.style.ForegroundColorSpan;

import androidx.annotation.ColorInt;

public class MarkdownForegroundColorSpan extends ForegroundColorSpan implements MarkdownSpan {
  public MarkdownForegroundColorSpan(@ColorInt int color) {
    super(color);
  }
}
