package com.markdowntextinput;

import android.content.Context;
import android.graphics.Color;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ColorPropConverter;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.ReadableMap;

public class MarkdownStyle {
  private int mSyntaxColor;
  private int mLinkColor;
  private float mHeadingFontSize;
  private int mQuoteBorderColor;
  private float mQuoteBorderWidth;
  private float mQuoteMarginLeft;
  private float mQuotePaddingLeft;
  private int mCodeColor;
  private int mCodeBackgroundColor;
  private int mPreColor;
  private int mPreBackgroundColor;
  private int mMentionHereBackgroundColor;
  private int mMentionUserBackgroundColor;

  public MarkdownStyle() {}

  public MarkdownStyle(ReadableMap map, Context context) {
    mSyntaxColor = parseColor(map, "syntax", "color", Color.GRAY, context);
    mLinkColor = parseColor(map, "link", "color", Color.BLUE, context);
    mHeadingFontSize = parseFloat(map, "h1", "fontSize", 25, context);
    mQuoteBorderColor = parseColor(map, "quote", "borderColor", Color.GRAY, context);
    mQuoteBorderWidth = parseFloat(map, "quote", "borderWidth", 6, context);
    mQuoteMarginLeft = parseFloat(map, "quote", "marginLeft", 6, context);
    mQuotePaddingLeft = parseFloat(map, "quote", "paddingLeft", 6, context);
    mCodeColor = parseColor(map, "code", "color", Color.BLACK, context);
    mCodeBackgroundColor = parseColor(map, "code", "backgroundColor", Color.LTGRAY, context);
    mPreColor = parseColor(map, "pre", "color", Color.BLACK, context);
    mPreBackgroundColor = parseColor(map, "pre", "backgroundColor", Color.LTGRAY, context);
    mMentionHereBackgroundColor = parseColor(map, "mentionHere", "backgroundColor", Color.YELLOW, context);
    mMentionUserBackgroundColor = parseColor(map, "mentionUser", "backgroundColor", Color.CYAN, context);
  }

  private static int parseColor(ReadableMap map, @NonNull String key, @NonNull String prop, int fallback, Context context) {
    ReadableMap style = map.getMap(key);
    if (style == null) {
      return fallback;
    }
    Dynamic value = style.getDynamic(prop);
    switch (value.getType()) {
      case Null:
        return fallback;
      case Number:
        return ColorPropConverter.getColor(value.asDouble(), context);
      case Map:
        return ColorPropConverter.getColor(value.asMap(), context);
      default:
        throw new JSApplicationCausedNativeException("ColorValue: the value must be a number or Object.");
    }
  }

  private static float parseFloat(ReadableMap map, @NonNull String key, @NonNull String prop, float fallback, Context context) {
    ReadableMap style = map.getMap(key);
    if (style == null) {
      return fallback;
    }
    double value = style.getDouble(prop);
    return (float) value;
  }

  public int getSyntaxColor() {
    return mSyntaxColor;
  }

  public int getLinkColor() {
    return mLinkColor;
  }

  public float getHeadingFontSize() {
    return mHeadingFontSize;
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
