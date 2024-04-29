package com.expensify.livemarkdown;

import android.content.res.AssetManager;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.TextPaint;
import android.text.style.MetricAffectingSpan;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

import com.facebook.react.common.assets.ReactFontManager;
import com.facebook.react.uimanager.PixelUtil;

public class MarkdownBlockSpan extends MetricAffectingSpan implements MarkdownSpan {

  private final @NonNull AssetManager mAssetManager;
  private final @NonNull String mFontFamily;
  private final float mFontSize;
  private final int mColor;

  public MarkdownBlockSpan(@NonNull AssetManager assetManager, @NonNull String fontFamily, float fontSize, @ColorInt int color) {
    mAssetManager = assetManager;
    mFontFamily = fontFamily;
    mFontSize = PixelUtil.toPixelFromDIP(fontSize);
    mColor = color;
  }

  @Override
  public void updateMeasureState(@NonNull TextPaint textPaint) {
    apply(textPaint);
  }

  @Override
  public void updateDrawState(TextPaint tp) {
    apply(tp);
  }

  void apply(@NonNull TextPaint textPaint) {
    int style = ReactFontManager.TypefaceStyle.NORMAL;
    if (textPaint.getTypeface() != null) {
      style = textPaint.getTypeface().getStyle();
    }
    Typeface typeface = ReactFontManager.getInstance().getTypeface(mFontFamily, style, mAssetManager);
    textPaint.setTypeface(typeface);
    textPaint.setFlags(textPaint.getFlags() | Paint.SUBPIXEL_TEXT_FLAG);
    textPaint.setTextSize(mFontSize);
    textPaint.setColor(mColor);
  }
}
