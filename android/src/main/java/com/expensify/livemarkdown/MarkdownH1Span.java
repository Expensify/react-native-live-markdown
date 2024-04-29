package com.expensify.livemarkdown;

import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.TextPaint;
import android.text.style.LineHeightSpan;
import android.text.style.StyleSpan;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.PixelUtil;

public class MarkdownH1Span extends StyleSpan implements LineHeightSpan, MarkdownSpan {

  private final float mFontSize;
  private final Integer mLineHeight;

  public MarkdownH1Span(float fontSize, Integer lineHeight) {
    super(Typeface.BOLD);
    mFontSize = PixelUtil.toPixelFromDIP(fontSize);
    mLineHeight = lineHeight;
  }

  @Override
  public void updateMeasureState(@NonNull TextPaint textPaint) {
    super.updateMeasureState(textPaint);
    apply(textPaint);
  }

  @Override
  public void updateDrawState(TextPaint tp) {
    super.updateDrawState(tp);
    apply(tp);
  }

  private void apply(@NonNull TextPaint textPaint) {
    textPaint.setTextSize(mFontSize);
  }

  @Override
  public void chooseHeight(CharSequence text, int start, int end, int spanstartv, int lineHeight, Paint.FontMetricsInt fm) {
    if (mLineHeight != null) {
      fm.top -= mLineHeight / 4;
      fm.ascent -= mLineHeight / 4;
    }
  }
}
