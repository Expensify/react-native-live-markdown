package com.expensify.livemarkdown;

import android.text.TextPaint;
import android.text.style.MetricAffectingSpan;

import androidx.annotation.NonNull;

public class MarkdownMentionSpan extends MetricAffectingSpan implements MarkdownSpan {

  private final int mBackgroundColor;
  private final int mForegroundColor;

  public MarkdownMentionSpan(int backgroundColor, int foregroundColor) {
    mBackgroundColor = backgroundColor;
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
    textPaint.bgColor = mBackgroundColor;
    textPaint.setColor(mForegroundColor);
  }
}
