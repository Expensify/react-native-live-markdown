package com.expensify.livemarkdown;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.text.Layout;
import android.text.style.ReplacementSpan;

import androidx.annotation.ColorInt;

import com.facebook.react.uimanager.PixelUtil;

public class MarkdownBlockquoteSpan extends ReplacementSpan implements MarkdownSpan {
  @ColorInt
  private final int syntaxColor;
  @ColorInt
  private final int borderColor;
  private final float borderWidth;
  private final float marginLeft;
  private final float paddingLeft;
  private final int nestingLevel;
  private final int leadingMargin;

  public MarkdownBlockquoteSpan(@ColorInt int syntaxColor, @ColorInt int borderColor, float borderWidth, float marginLeft, float paddingLeft, int nestingLevel) {
    this.syntaxColor = syntaxColor;
    this.borderColor = borderColor;
    this.borderWidth = PixelUtil.toPixelFromDIP(borderWidth);
    this.marginLeft = PixelUtil.toPixelFromDIP(marginLeft);
    this.paddingLeft = PixelUtil.toPixelFromDIP(paddingLeft);
    this.nestingLevel = nestingLevel;
    this.leadingMargin = (int) (this.marginLeft + this.borderWidth + this.paddingLeft) * nestingLevel;
  }

  @Override
  public int getSize(Paint paint, CharSequence text, int start, int end, Paint.FontMetricsInt fm) {
    int textWidth = Math.round(paint.measureText(text, start, end));
    return textWidth + leadingMargin;
  }

  @Override
  public void draw(Canvas canvas, CharSequence text, int start, int end,
                   float x, int top, int y, int bottom, Paint paint) {
    Paint.Style originalStyle = paint.getStyle();
    int originalColor = paint.getColor();

    paint.setColor(syntaxColor);
    canvas.drawText(text, start, end, x + leadingMargin, y, paint);

    paint.setStyle(Paint.Style.FILL);
    paint.setColor(borderColor);

    for (int level = 0; level < nestingLevel; level++) {
      float shift = (marginLeft + borderWidth + paddingLeft) * level;
      float left = x + marginLeft + shift;
      float right = x + marginLeft + borderWidth + shift;
      canvas.drawRect(left, top, right, bottom, paint);
    }

    paint.setStyle(originalStyle);
    paint.setColor(originalColor);
  }
}
