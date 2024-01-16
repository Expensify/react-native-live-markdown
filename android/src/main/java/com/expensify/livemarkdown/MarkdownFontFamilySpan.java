package com.expensify.livemarkdown;

import android.text.style.TypefaceSpan;

import androidx.annotation.NonNull;

public class MarkdownFontFamilySpan extends TypefaceSpan implements MarkdownSpan {
  public MarkdownFontFamilySpan(@NonNull String fontFamily) {
    super(fontFamily);
  }
}
