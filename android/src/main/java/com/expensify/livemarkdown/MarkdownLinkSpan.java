package com.expensify.livemarkdown;

import android.text.TextPaint;
import android.text.style.MetricAffectingSpan;

import androidx.annotation.NonNull;

public class MarkdownLinkSpan extends MetricAffectingSpan implements MarkdownSpan {

  private final int mForegroundColor;

  public MarkdownLinkSpan(int foregroundColor) {
    mForegroundColor = foregroundColor;
  }

  @Override
  public void updateMeasureState(@NonNull TextPaint textPaint) {
    apply(textPaint);
  }

  @Override
  public void updateDrawState(TextPaint tp) {
    apply(tp);
  }

  private void apply(@NonNull TextPaint textPaint) {
    textPaint.setUnderlineText(true);
    textPaint.setColor(mForegroundColor);
  }
}
