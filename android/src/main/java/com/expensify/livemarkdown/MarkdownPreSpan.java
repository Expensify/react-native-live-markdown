package com.expensify.livemarkdown;

import android.content.res.AssetManager;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.text.Layout;
import android.text.style.LeadingMarginSpan;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

public class MarkdownPreSpan extends MarkdownBlockSpan implements LeadingMarginSpan {

  private final int mLeadingMargin;

  public MarkdownPreSpan(@NonNull AssetManager assetManager, @NonNull String fontFamily, float fontSize, @ColorInt int color, int leadingMargin) {
    super(assetManager, fontFamily, fontSize, color);
    mLeadingMargin = leadingMargin;
  }

  @Override
  public int getLeadingMargin(boolean first) {
    return mLeadingMargin;
  }

  @Override
  public void drawLeadingMargin(Canvas c, Paint p, int x, int dir, int top, int baseline, int bottom, CharSequence text, int start, int end, boolean first, Layout layout) {}
}
