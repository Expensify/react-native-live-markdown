package com.markdowntextinput;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.text.Layout;
import android.text.style.LeadingMarginSpan;

public class QuoteSpan implements LeadingMarginSpan {
  private final int color;
  private final int stripeWidth;
  private final int gapWidth;
  private int nestingLevel = 0;

  public QuoteSpan(int color, int stripeWidth, int gapWidth) {
    this.color = color;
    this.stripeWidth = stripeWidth;
    this.gapWidth = gapWidth;
  }

  @Override
  public int getLeadingMargin(boolean first) {
    return (stripeWidth + gapWidth) * (nestingLevel + 1);
  }

  public void increaseNestingLevel() { nestingLevel++; };
  @Override
  public void drawLeadingMargin(Canvas c, Paint p, int x, int dir, int top, int baseline, int bottom,
                                CharSequence text, int start, int end, boolean first, Layout layout) {
    Paint.Style originalStyle = p.getStyle();
    int originalColor = p.getColor();

    p.setStyle(Paint.Style.FILL);
    p.setColor(color);

    for(int stripe = 0; stripe <= nestingLevel; stripe++) {
      int shift = (stripeWidth + gapWidth) * stripe;
      c.drawRect(x + shift, top, x + dir * stripeWidth + shift, bottom, p);
    }

    p.setStyle(originalStyle);
    p.setColor(originalColor);
  }
}
