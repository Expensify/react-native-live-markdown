package com.expensify.livemarkdown;

import android.graphics.Typeface;
import android.text.style.StyleSpan;

public class MarkdownItalicSpan extends StyleSpan implements MarkdownSpan {
  public MarkdownItalicSpan() {
    super(Typeface.ITALIC);
  }
}
