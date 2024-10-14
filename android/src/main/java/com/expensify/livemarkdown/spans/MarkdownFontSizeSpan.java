package com.expensify.livemarkdown.spans;

import android.text.style.AbsoluteSizeSpan;

import com.facebook.react.uimanager.PixelUtil;

public class MarkdownFontSizeSpan extends AbsoluteSizeSpan implements MarkdownSpan {
  public MarkdownFontSizeSpan(float fontSize) {
    super((int) PixelUtil.toPixelFromDIP(fontSize), false);
  }
}
