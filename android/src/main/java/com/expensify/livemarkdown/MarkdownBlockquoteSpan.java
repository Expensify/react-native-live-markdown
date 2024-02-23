package com.expensify.livemarkdown;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.text.Layout;
import android.text.style.LeadingMarginSpan;

import androidx.annotation.ColorInt;

import com.facebook.react.uimanager.PixelUtil;

public class MarkdownBlockquoteSpan implements MarkdownSpan, LeadingMarginSpan {
  @ColorInt
  private final int borderColor;
  private final float borderWidth;
  private final float marginLeft;
  private final float paddingLeft;
  private final int nestingLevel;

  public MarkdownBlockquoteSpan(@ColorInt int borderColor, float borderWidth, float marginLeft, float paddingLeft, int nestingLevel) {
    this.borderColor = borderColor;
    this.borderWidth = PixelUtil.toPixelFromDIP(borderWidth);
    this.marginLeft = PixelUtil.toPixelFromDIP(marginLeft);
    this.paddingLeft = PixelUtil.toPixelFromDIP(paddingLeft);
    this.nestingLevel = nestingLevel;
  }

  @Override
  public int getLeadingMargin(boolean first) {
    return (int) (marginLeft + borderWidth + paddingLeft) * nestingLevel;
  }

  @Override
  public void drawLeadingMargin(Canvas c, Paint p, int x, int dir, int top, int baseline, int bottom,
                                CharSequence text, int start, int end, boolean first, Layout layout) {
    Paint.Style originalStyle = p.getStyle();
    int originalColor = p.getColor();

    p.setStyle(Paint.Style.FILL);
    p.setColor(borderColor);

    for (int level = 0; level < nestingLevel; level++) {
      float shift = (marginLeft + borderWidth + paddingLeft) * level;
      float left = x + (dir * marginLeft + shift);
      float right = x + dir * (marginLeft + borderWidth + shift);
      c.drawRect(left, top, right, bottom, p);
    }

    p.setStyle(originalStyle);
    p.setColor(originalColor);
  }
}
