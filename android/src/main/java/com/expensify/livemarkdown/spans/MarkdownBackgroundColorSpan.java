package com.expensify.livemarkdown.spans;

import android.text.style.BackgroundColorSpan;

import androidx.annotation.ColorInt;

public class MarkdownBackgroundColorSpan extends BackgroundColorSpan implements MarkdownSpan {
  public MarkdownBackgroundColorSpan(@ColorInt int color) {
    super(color);
  }
}
