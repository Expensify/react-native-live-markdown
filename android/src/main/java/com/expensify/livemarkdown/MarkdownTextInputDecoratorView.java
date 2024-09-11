package com.expensify.livemarkdown;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.Region;
import android.text.Editable;
import android.text.TextPaint;
import android.text.TextWatcher;
import android.util.AttributeSet;

import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.drawable.CSSBackgroundDrawable;
import com.facebook.react.uimanager.style.BorderRadiusProp;
import com.facebook.react.views.textinput.ReactEditText;
import com.facebook.react.views.view.ReactViewBackgroundDrawable;
import com.facebook.react.views.view.ReactViewBackgroundManager;

import java.lang.reflect.Field;
import java.util.Objects;

public class MarkdownTextInputDecoratorView extends View {

  public MarkdownTextInputDecoratorView(Context context) {
    super(context);
  }

  public MarkdownTextInputDecoratorView(Context context, @Nullable AttributeSet attrs) {
    super(context, attrs);
  }

  public MarkdownTextInputDecoratorView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
  }

  private MarkdownStyle mMarkdownStyle;

  private MarkdownUtils mMarkdownUtils;

  private ReactEditText mReactEditText;

  private TextWatcher mTextWatcher;

  private Rect mDrawableRect = new Rect();
  private final Rect mTmpRect = new Rect();
  private final TextPaint mSpanPaint = new TextPaint();
  private final Path clipPath = new Path();
  private int mBackgroundColor = Color.TRANSPARENT;
  private float mBackgroundRadius = 0;

  @SuppressLint("VisibleForTests")
  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();

    View previousSibling = null;
    final ViewParent parent = this.getParent();
    if (parent instanceof ViewGroup viewGroup) {
        for (int i = 1; i < viewGroup.getChildCount(); i++) {
        if (viewGroup.getChildAt(i) == this) {
          previousSibling = viewGroup.getChildAt(i - 1);
          break;
        }
      }
    }

    if (previousSibling instanceof ReactEditText) {
      AssetManager assetManager = getContext().getAssets();
      MarkdownUtils.maybeInitializeRuntime(assetManager);
      mMarkdownUtils = new MarkdownUtils(assetManager);
      mMarkdownUtils.setMarkdownStyle(mMarkdownStyle);
      mReactEditText = (ReactEditText) previousSibling;
      mTextWatcher = new MarkdownTextWatcher(mMarkdownUtils);
      mReactEditText.addTextChangedListener(mTextWatcher);
    }

    try {
      Field backgroundManagerField = ReactEditText.class.getDeclaredField("mReactBackgroundManager");
      backgroundManagerField.setAccessible(true);
      ReactViewBackgroundManager backgroundManager = (ReactViewBackgroundManager)backgroundManagerField.get(mReactEditText);

      Field backgroundDrawableField = ReactViewBackgroundManager.class.getDeclaredField("mCSSBackgroundDrawable");
      backgroundDrawableField.setAccessible(true);
      CSSBackgroundDrawable backgroundDrawable = (CSSBackgroundDrawable)backgroundDrawableField.get(backgroundManager);
      assert backgroundDrawable != null;
      mBackgroundColor = backgroundDrawable.getColor();
      mBackgroundRadius = Objects.requireNonNull(backgroundDrawable.getBorderRadius().get(BorderRadiusProp.BORDER_RADIUS)).resolve(0, 0);
    } catch (NoSuchFieldException | IllegalAccessException ignored) {}

    mReactEditText.setBackgroundColor(Color.TRANSPARENT);
    mReactEditText.bringToFront();

    mReactEditText.getViewTreeObserver().addOnScrollChangedListener(this::invalidate);

    mMarkdownUtils.redrawCall = this::invalidate;
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    if (mReactEditText != null) {
      mReactEditText.removeTextChangedListener(mTextWatcher);
      mReactEditText = null;
      mTextWatcher = null;
      mMarkdownUtils = null;
    }
  }

  protected void setMarkdownStyle(MarkdownStyle markdownStyle) {
    mMarkdownStyle = markdownStyle;
    if (mMarkdownUtils != null) {
      mMarkdownUtils.setMarkdownStyle(mMarkdownStyle);
    }
    if (mReactEditText != null) {
      int selectionStart = mReactEditText.getSelectionStart();
      int selectionEnd = mReactEditText.getSelectionEnd();
      mReactEditText.setText(mReactEditText.getText()); // trigger update
      mReactEditText.setSelection(selectionStart, selectionEnd);
    }
  }

  @Override
  protected void onDraw(@NonNull Canvas canvas) {
    super.onDraw(canvas);

    Editable text = mReactEditText.getText();
    if (text == null) {
      return;
    }

    float left = mReactEditText.getLeft();
    float top = mReactEditText.getTop() - getTop();
    float right = mReactEditText.getRight();
    float bottom = top + mReactEditText.getHeight();
    float radius = mBackgroundRadius;
    clipPath.addRoundRect(left, top, right, bottom, radius, radius, Path.Direction.CW);
    canvas.clipPath(clipPath, Region.Op.INTERSECT);
    canvas.drawColor(mBackgroundColor);

    canvas.save();
    canvas.translate(mReactEditText.getTotalPaddingLeft() + left, mReactEditText.getTotalPaddingTop() + top);
    canvas.translate(-mReactEditText.getScrollX(), -mReactEditText.getScrollY());

    int lineCount = mReactEditText.getLineCount();
    drawCodeBackground(canvas, text, lineCount);
    drawPreBackground(canvas, text, lineCount);
    canvas.restore();
  }

  private void drawCodeBackground(@NonNull Canvas canvas, Editable text, int lineCount) {
    for (int line = 0; line < lineCount; line++) {
      int lineStart = mReactEditText.getLayout().getLineStart(line);
      int lineEnd = mReactEditText.getLayout().getLineEnd(line);

      MarkdownCodeSpan[] codeSpans = text.getSpans(lineStart, lineEnd, MarkdownCodeSpan.class);
      for (MarkdownCodeSpan span : codeSpans) {
        int start = lineStart;
        int end = lineEnd;
        int paddingLeft = 0;
        boolean isLeftSideOpen = true;
        boolean isRightSideOpen = true;
        int spanStart = text.getSpanStart(span);
        int spanEnd = text.getSpanEnd(span);

        if (spanStart > start && spanStart < end) {
          Rect paddingRect = new Rect();
          mReactEditText.getPaint().getTextBounds(text.toString(), start, spanStart, paddingRect);
          paddingLeft = paddingRect.width();
          start = spanStart;
          isLeftSideOpen = false;
        }
        if (spanEnd > start && spanEnd < end) {
          end = spanEnd;
          isRightSideOpen = false;
        }

        span.apply(mSpanPaint);
        mSpanPaint.getTextBounds(text.toString(), start, end, mDrawableRect);
        mDrawableRect.left += paddingLeft;
        mDrawableRect.right += paddingLeft;

        float width = mSpanPaint.measureText(text.toString(), start, end);
        mDrawableRect.right = mDrawableRect.left + (int) width;

        int editTextWidth = mReactEditText.getWidth();
        if (mDrawableRect.right > editTextWidth) {
          mDrawableRect.right = editTextWidth;
        }

        canvas.save();
        canvas.translate(mReactEditText.getLayout().getLineLeft(line), mReactEditText.getLayout().getLineBaseline(line));
        drawBackground(
          canvas,
          mDrawableRect,
          isLeftSideOpen,
          isRightSideOpen,
          mMarkdownStyle.getCodeBackgroundColor(),
          mMarkdownStyle.getCodeBorderColor(),
          mMarkdownStyle.getCodeBorderWidth(),
          mMarkdownStyle.getCodeBorderRadius(),
          mMarkdownStyle.getCodePadding()
        );
        canvas.restore();
      }
    }
  }

  private void drawPreBackground(@NonNull Canvas canvas, Editable text, int lineCount) {
    MarkdownPreSpan[] preSpans = text.getSpans(0, text.length(), MarkdownPreSpan.class);
    for (MarkdownPreSpan span : preSpans) {
      int spanStart = text.getSpanStart(span);
      int spanEnd = text.getSpanEnd(span);

      int firstLine = -1;
      for (int line = 0; line < lineCount; line++) {
        int lineStart = mReactEditText.getLayout().getLineStart(line);
        int lineEnd = mReactEditText.getLayout().getLineEnd(line);
        if (lineStart >= spanStart && lineStart < spanEnd) {
          span.apply(mSpanPaint);
          mSpanPaint.getTextBounds(text.toString(), lineStart, lineEnd, mTmpRect);

          int width = (int) mSpanPaint.measureText(text.toString(), lineStart, lineEnd);
          mTmpRect.right = mTmpRect.left + width;

          int padding = span.getLeadingMargin(false);
          mTmpRect.left += padding;
          mTmpRect.right += padding;

          if (firstLine == -1) {
            firstLine = line;
            mDrawableRect = new Rect(mTmpRect);
          } else {
            if (mTmpRect.right > mDrawableRect.right) {
              mDrawableRect.right = mTmpRect.right;
            }
            mDrawableRect.bottom = mReactEditText.getLayout().getLineBottom(line) - mReactEditText.getLayout().getLineBaseline(firstLine);
          }
        }
      }

      canvas.save();
      if (firstLine >= 0) {
        canvas.translate(mReactEditText.getLayout().getLineLeft(firstLine), mReactEditText.getLayout().getLineBaseline(firstLine));
      }
      drawBackground(
        canvas,
        mDrawableRect,
        false,
        false,
        mMarkdownStyle.getPreBackgroundColor(),
        mMarkdownStyle.getPreBorderColor(),
        mMarkdownStyle.getPreBorderWidth(),
        mMarkdownStyle.getPreBorderRadius(),
        mMarkdownStyle.getPrePadding()
      );
      canvas.restore();
    }
  }

  private void drawBackground(@NonNull Canvas canvas, Rect rect, boolean isLeftSideOpen, boolean isRightSideOpen, int backgroundColor, int borderColor, float borderWidth, float borderRadius, float padding) {
    float[] corners = getCorners(PixelUtil.toPixelFromDIP(borderRadius), isLeftSideOpen, isRightSideOpen);

    Path path = new Path();
    applyPadding(rect, (int) PixelUtil.toPixelFromDIP(padding));
    path.addRoundRect(new RectF(rect), corners, Path.Direction.CW);

    Paint paint = new Paint();
    paint.setStyle(Paint.Style.FILL);
    paint.setColor(backgroundColor);
    canvas.drawPath(path, paint);

    float pxBorderWidth = PixelUtil.toPixelFromDIP(borderWidth);
    paint.setStyle(Paint.Style.STROKE);
    paint.setColor(borderColor);
    paint.setStrokeWidth(pxBorderWidth);
    canvas.drawPath(path, paint);

    float adjustedTop = rect.top + pxBorderWidth/2;
    float adjustedBottom = rect.bottom - pxBorderWidth/2;

    path = new Path();
    if (isLeftSideOpen) {
      path.moveTo(rect.left, adjustedTop);
      path.lineTo(rect.left, adjustedBottom);
    }
    if (isRightSideOpen) {
      path.moveTo(rect.right, adjustedTop);
      path.lineTo(rect.right, adjustedBottom);
    }

    paint.setColor(backgroundColor);
    paint.setStrokeWidth(pxBorderWidth);
    canvas.drawPath(path, paint);
  }

  @NonNull
  private static float[] getCorners(float radius, boolean isLeftSideOpen, boolean isRightSideOpen) {
    float leftRadius = isLeftSideOpen ? 0 : radius;
    float rightRadius = isRightSideOpen ? 0 : radius;
    return new float[]{
      leftRadius, leftRadius,     // Top left
      rightRadius, rightRadius,   // Top right
      rightRadius, rightRadius,   // Bottom right
      leftRadius, leftRadius      // Bottom left
    };
  }

  private static void applyPadding(Rect rect, int padding) {
    rect.left -= padding;
    rect.top -= padding;
    rect.right += padding;
    rect.bottom += padding;
  }
}
