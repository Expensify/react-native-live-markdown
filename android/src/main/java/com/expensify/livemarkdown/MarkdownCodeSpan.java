package com.expensify.livemarkdown;

import android.content.res.AssetManager;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

public class MarkdownCodeSpan extends MarkdownBlockSpan {
  public MarkdownCodeSpan(@NonNull AssetManager assetManager, @NonNull String fontFamily, float fontSize, @ColorInt int color) {
    super(assetManager, fontFamily, fontSize, color);
  }
}

