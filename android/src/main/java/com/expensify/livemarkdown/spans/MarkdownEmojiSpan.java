package com.expensify.livemarkdown.spans;

import android.text.style.AbsoluteSizeSpan;

public class MarkdownEmojiSpan extends AbsoluteSizeSpan implements MarkdownSpan {
  public MarkdownEmojiSpan(float fontSize) {
    super((int) fontSize, true);
  }
}
