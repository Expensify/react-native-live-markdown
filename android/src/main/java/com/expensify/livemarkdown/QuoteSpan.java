package com.expensify.livemarkdown;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.text.Layout;
import android.text.style.LeadingMarginSpan;

import com.facebook.react.uimanager.PixelUtil;

public class QuoteSpan implements LeadingMarginSpan {
  private final int borderColor;
  private final float borderWidth;
  private final float marginLeft;
  private final float paddingLeft;

  public QuoteSpan(int borderColor, float borderWidth, float marginLeft, float paddingLeft) {
    this.borderColor = borderColor;
    this.borderWidth = PixelUtil.toPixelFromDIP(borderWidth);
    this.marginLeft = PixelUtil.toPixelFromDIP(marginLeft);
    this.paddingLeft = PixelUtil.toPixelFromDIP(paddingLeft);
  }

  @Override
  public int getLeadingMargin(boolean first) {
    return (int) (marginLeft + borderWidth + paddingLeft);
  }

  @Override
  public void drawLeadingMargin(Canvas c, Paint p, int x, int dir, int top, int baseline, int bottom,
                                CharSequence text, int start, int end, boolean first, Layout layout) {
    Paint.Style originalStyle = p.getStyle();
    int originalColor = p.getColor();

    p.setStyle(Paint.Style.FILL);
    p.setColor(borderColor);

    float left = x + dir * marginLeft;
    float right = x + dir * (marginLeft + borderWidth);
    c.drawRect(left, top, right, bottom, p);

    p.setStyle(originalStyle);
    p.setColor(originalColor);
  }
}
