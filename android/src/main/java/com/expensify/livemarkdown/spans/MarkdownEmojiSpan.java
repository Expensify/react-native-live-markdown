package com.expensify.livemarkdown.spans;

import android.text.style.AbsoluteSizeSpan;

import com.facebook.react.uimanager.PixelUtil;

public class MarkdownEmojiSpan extends AbsoluteSizeSpan implements MarkdownSpan {
  public MarkdownEmojiSpan(float fontSize) {
    super((int) PixelUtil.toPixelFromDIP(fontSize), false);
  }
}
