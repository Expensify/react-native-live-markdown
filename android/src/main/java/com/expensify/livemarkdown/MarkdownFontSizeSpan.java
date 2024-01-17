package com.expensify.livemarkdown;

import android.text.style.AbsoluteSizeSpan;

public class MarkdownFontSizeSpan extends AbsoluteSizeSpan implements MarkdownSpan {
  public MarkdownFontSizeSpan(float fontSize) {
    super((int) fontSize, true);
  }
}
