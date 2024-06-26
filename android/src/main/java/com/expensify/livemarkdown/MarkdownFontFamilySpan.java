package com.expensify.livemarkdown;

import android.content.res.AssetManager;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.TextPaint;
import android.text.style.MetricAffectingSpan;

import androidx.annotation.NonNull;

import com.facebook.react.common.assets.ReactFontManager.TypefaceStyle;
import com.facebook.react.views.text.ReactFontManager;

public class MarkdownFontFamilySpan extends MetricAffectingSpan implements MarkdownSpan {

  private final @NonNull String mFontFamily;
  private final @NonNull AssetManager mAssetManager;

  public MarkdownFontFamilySpan(@NonNull String fontFamily, @NonNull AssetManager assetManager) {
    mFontFamily = fontFamily;
    mAssetManager = assetManager;
  }

  @Override
  public void updateMeasureState(@NonNull TextPaint textPaint) {
    apply(textPaint);
  }

  @Override
  public void updateDrawState(TextPaint tp) {
    apply(tp);
  }

  private void apply(@NonNull TextPaint textPaint) {
    int style = TypefaceStyle.NORMAL;
    if (textPaint.getTypeface() != null) {
      style = textPaint.getTypeface().getStyle();
    } else {
      style = TypefaceStyle.NORMAL;
    }
    Typeface typeface = ReactFontManager.getInstance().getTypeface(mFontFamily, style, mAssetManager);
    textPaint.setTypeface(typeface);
    textPaint.setFlags(textPaint.getFlags() | Paint.SUBPIXEL_TEXT_FLAG);
  }
}
