package com.expensify.livemarkdown.spans;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.style.LineBackgroundSpan;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

public class MarkdownBackgroundSpan implements MarkdownSpan, LineBackgroundSpan {

  private final int backgroundColor;
  private final int mentionStart;
  private final int mentionEnd;
  private final float borderRadius;

  private StaticLayout layout;
  private Path backgroundPath;

  public MarkdownBackgroundSpan(@ColorInt int backgroundColor, float borderRadius, int mentionStart, int mentionEnd) {
    this.backgroundColor = backgroundColor;
    this.borderRadius = borderRadius;
    this.mentionStart = mentionStart;
    this.mentionEnd = mentionEnd;
    this.backgroundPath = new Path();
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
    if (layout == null || layout.getText() != text || layout.getWidth() != right || layout.getLineEnd(0) != end) {
      layout = StaticLayout.Builder.obtain(text, start, end, (TextPaint) paint, right).build();

      boolean mentionStarts = start <= mentionStart;
      boolean mentionEnds = end >= mentionEnd;

      float startX = layout.getPrimaryHorizontal(mentionStarts ? mentionStart : start);
      float endX = layout.getPrimaryHorizontal(mentionEnds ? mentionEnd : end);

      RectF lineRect = new RectF(startX, top, endX, bottom);
      backgroundPath.reset();
      backgroundPath.addRoundRect(lineRect, createRadii(mentionStarts, mentionEnds), Path.Direction.CW);
    }

    int originalColor = paint.getColor();
    paint.setColor(backgroundColor);

    canvas.drawPath(backgroundPath, paint);

    paint.setColor(originalColor);
  }

  private float[] createRadii(boolean roundedLeft, boolean roundedRight) {
    float[] radii = new float[8];

    if (roundedLeft) {
      radii[0] = radii[1] = borderRadius; // top-left
      radii[6] = radii[7] = borderRadius; // bottom-left
    }

    if (roundedRight) {
      radii[2] = radii[3] = borderRadius; // top-right
      radii[4] = radii[5] = borderRadius; // bottom-right
    }

    return radii;
  }
}
