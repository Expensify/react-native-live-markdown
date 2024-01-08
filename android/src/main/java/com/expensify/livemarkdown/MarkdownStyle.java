package com.expensify.livemarkdown;

import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ColorPropConverter;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.ReadableMap;

import java.util.Objects;

public class MarkdownStyle {
  private final int mSyntaxColor;
  private final int mLinkColor;
  private final float mH1FontSize;
  private final int mQuoteBorderColor;
  private final float mQuoteBorderWidth;
  private final float mQuoteMarginLeft;
  private final float mQuotePaddingLeft;
  private final int mCodeColor;
  private final int mCodeBackgroundColor;
  private final int mPreColor;
  private final int mPreBackgroundColor;
  private final int mMentionHereBackgroundColor;
  private final int mMentionUserBackgroundColor;

  public MarkdownStyle(@NonNull ReadableMap map, @NonNull Context context) {
    mSyntaxColor = parseColor(map, "syntax", "color", context);
    mLinkColor = parseColor(map, "link", "color", context);
    mH1FontSize = parseFloat(map, "h1", "fontSize");
    mQuoteBorderColor = parseColor(map, "quote", "borderColor", context);
    mQuoteBorderWidth = parseFloat(map, "quote", "borderWidth");
    mQuoteMarginLeft = parseFloat(map, "quote", "marginLeft");
    mQuotePaddingLeft = parseFloat(map, "quote", "paddingLeft");
    mCodeColor = parseColor(map, "code", "color", context);
    mCodeBackgroundColor = parseColor(map, "code", "backgroundColor", context);
    mPreColor = parseColor(map, "pre", "color", context);
    mPreBackgroundColor = parseColor(map, "pre", "backgroundColor", context);
    mMentionHereBackgroundColor = parseColor(map, "mentionHere", "backgroundColor", context);
    mMentionUserBackgroundColor = parseColor(map, "mentionUser", "backgroundColor", context);
  }

  private static int parseColor(@NonNull ReadableMap map, @NonNull String key, @NonNull String prop, @NonNull Context context) {
    ReadableMap style = map.getMap(key);
    Objects.requireNonNull(style);
    Dynamic value = style.getDynamic(prop);
    switch (value.getType()) {
      case Number:
        return ColorPropConverter.getColor(value.asDouble(), context);
      case Map:
        return ColorPropConverter.getColor(value.asMap(), context);
      default:
        throw new JSApplicationCausedNativeException("ColorValue: the value must be a number or Object.");
    }
  }

  private static float parseFloat(@NonNull ReadableMap map, @NonNull String key, @NonNull String prop) {
    ReadableMap style = map.getMap(key);
    Objects.requireNonNull(style);
    double value = style.getDouble(prop);
    return (float) value;
  }

  public int getSyntaxColor() {
    return mSyntaxColor;
  }

  public int getLinkColor() {
    return mLinkColor;
  }

  public float getH1FontSize() {
    return mH1FontSize;
  }

  public int getQuoteBorderColor() {
    return mQuoteBorderColor;
  }

  public float getQuoteBorderWidth() {
    return mQuoteBorderWidth;
  }

  public float getQuoteMarginLeft() {
    return mQuoteMarginLeft;
  }

  public float getQuotePaddingLeft() {
    return mQuotePaddingLeft;
  }

  public int getCodeColor() {
    return mCodeColor;
  }

  public int getCodeBackgroundColor() {
    return mCodeBackgroundColor;
  }

  public int getPreColor() {
    return mPreColor;
  }

  public int getPreBackgroundColor() {
    return mPreBackgroundColor;
  }

  public int getMentionHereBackgroundColor() {
    return mMentionHereBackgroundColor;
  }

  public int getMentionUserBackgroundColor() {
    return mMentionUserBackgroundColor;
  }
}
