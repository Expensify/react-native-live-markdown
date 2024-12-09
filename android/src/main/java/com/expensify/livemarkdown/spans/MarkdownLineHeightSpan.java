package com.expensify.livemarkdown.spans;

import android.graphics.Paint;
import android.text.style.LineHeightSpan;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.views.text.internal.span.CustomLineHeightSpan;

public class MarkdownLineHeightSpan implements MarkdownSpan, LineHeightSpan {
  private final CustomLineHeightSpan mCustomLineHeightSpan;

  public MarkdownLineHeightSpan(float lineHeight) {
    mCustomLineHeightSpan = new CustomLineHeightSpan(PixelUtil.toPixelFromDIP(lineHeight));
  }

  @Override
  public void chooseHeight(CharSequence text, int start, int end, int spanstartv, int lineHeight, Paint.FontMetricsInt fm) {
    // CustomLineHeightSpan is marked as final, we can't extend it, but we can use it via this adapter
    mCustomLineHeightSpan.chooseHeight(text, start, end, spanstartv, lineHeight, fm);
  }
}
