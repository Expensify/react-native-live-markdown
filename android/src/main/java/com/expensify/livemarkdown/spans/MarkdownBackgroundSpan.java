package com.expensify.livemarkdown.spans;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.text.Spanned;
import android.text.style.LeadingMarginSpan;
import android.text.style.LineBackgroundSpan;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

public class MarkdownBackgroundSpan implements MarkdownSpan, LineBackgroundSpan {

  private final int backgroundColor;
  private final int mentionStart;
  private final int mentionEnd;
  private final float cornerRadius;

  public MarkdownBackgroundSpan(@ColorInt int backgroundColor, float borderRadius, int mentionStart, int mentionEnd) {
    this.backgroundColor = backgroundColor;
    this.cornerRadius = borderRadius;
    this.mentionStart = mentionStart;
    this.mentionEnd = mentionEnd;
  }

  @Override
  public void drawBackground(
    @NonNull Canvas canvas,
    @NonNull Paint paint,
    int left,
    int right,
    int top,
    int baseline,
    int bottom,
    @NonNull CharSequence text,
    int start,
    int end,
    int lnum
  ) {
    int leadingMargin = getLeadingMargin(text, start, end);

    boolean mentionStarts = start <= mentionStart;
    boolean mentionEnds = end >= mentionEnd;

    float startX = leadingMargin + (mentionStarts ? paint.measureText(text, start, mentionStart) : 0);
    float endX = leadingMargin + paint.measureText(text, start, mentionEnds ? mentionEnd : end);

    int originalColor = paint.getColor();
    paint.setColor(backgroundColor);

    RectF lineRect = new RectF(startX, top, endX, bottom);
    Path backgroundPath = new Path();
    backgroundPath.addRoundRect(lineRect, createRadii(mentionStarts, mentionEnds), Path.Direction.CW);
    canvas.drawPath(backgroundPath, paint);

    paint.setColor(originalColor);
  }

  private int getLeadingMargin(@NonNull CharSequence text, int start, int end) {
    int leadingMargin = 0;
    if (text instanceof Spanned spanned) {
      LeadingMarginSpan[] marginSpans = spanned.getSpans(start, end, LeadingMarginSpan.class);
      for (LeadingMarginSpan marginSpan : marginSpans) {
        leadingMargin += marginSpan.getLeadingMargin(true);
      }
    }
    return leadingMargin;
  }

  private float[] createRadii(boolean roundedLeft, boolean roundedRight) {
    float[] radii = new float[8];

    if (roundedLeft) {
      radii[0] = radii[1] = cornerRadius; // top-left
      radii[6] = radii[7] = cornerRadius; // bottom-left
    }

    if (roundedRight) {
      radii[2] = radii[3] = cornerRadius; // top-right
      radii[4] = radii[5] = cornerRadius; // bottom-right
    }

    return radii;
  }
}
