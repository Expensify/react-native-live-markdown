package com.expensify.livemarkdown.spans;

import android.graphics.Typeface;
import android.text.style.StyleSpan;

public class MarkdownBoldSpan extends StyleSpan implements MarkdownSpan {
  public MarkdownBoldSpan() {
    super(Typeface.BOLD);
  }
}
