package com.expensify.livemarkdown;

import android.content.Context;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ColorPropConverter;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.ReadableMap;

import java.util.Objects;

public class MarkdownStyle {
  @ColorInt
  private final int mSyntaxColor;

  @ColorInt
  private final int mLinkColor;

  private final float mH1FontSize;

  private final float mEmojiFontSize;

  @ColorInt
  private final int mBlockquoteBorderColor;

  private final float mBlockquoteBorderWidth;

  private final float mBlockquoteMarginLeft;

  private final float mBlockquotePaddingLeft;

  private final String mCodeFontFamily;

  @ColorInt
  private final int mCodeColor;

  @ColorInt
  private final int mCodeBackgroundColor;

  private final String mPreFontFamily;

  @ColorInt
  private final int mPreColor;

  @ColorInt
  private final int mPreBackgroundColor;

  @ColorInt
  private final int mMentionHereColor;

  @ColorInt
  private final int mMentionHereBackgroundColor;

  @ColorInt
  private final int mMentionUserColor;

  @ColorInt
  private final int mMentionUserBackgroundColor;

  public MarkdownStyle(@NonNull ReadableMap map, @NonNull Context context) {
    mSyntaxColor = parseColor(map, "syntax", "color", context);
    mLinkColor = parseColor(map, "link", "color", context);
    mH1FontSize = parseFloat(map, "h1", "fontSize");
    mEmojiFontSize = parseFloat(map, "emoji", "fontSize");
    mBlockquoteBorderColor = parseColor(map, "blockquote", "borderColor", context);
    mBlockquoteBorderWidth = parseFloat(map, "blockquote", "borderWidth");
    mBlockquoteMarginLeft = parseFloat(map, "blockquote", "marginLeft");
    mBlockquotePaddingLeft = parseFloat(map, "blockquote", "paddingLeft");
    mCodeFontFamily = parseString(map, "code", "fontFamily");
    mCodeColor = parseColor(map, "code", "color", context);
    mCodeBackgroundColor = parseColor(map, "code", "backgroundColor", context);
    mPreFontFamily = parseString(map, "pre", "fontFamily");
    mPreColor = parseColor(map, "pre", "color", context);
    mPreBackgroundColor = parseColor(map, "pre", "backgroundColor", context);
    mMentionHereColor = parseColor(map, "mentionHere", "color", context);
    mMentionHereBackgroundColor = parseColor(map, "mentionHere", "backgroundColor", context);
    mMentionUserColor = parseColor(map, "mentionUser", "color", context);
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

  private static String parseString(@NonNull ReadableMap map, @NonNull String key, @NonNull String prop) {
    ReadableMap style = map.getMap(key);
    Objects.requireNonNull(style);
    return style.getString(prop);
  }

  @ColorInt
  public int getSyntaxColor() {
    return mSyntaxColor;
  }

  @ColorInt
  public int getLinkColor() {
    return mLinkColor;
  }

  public float getH1FontSize() {
    return mH1FontSize;
  }

  public float getEmojiFontSize() {
    return mEmojiFontSize;
  }

  @ColorInt
  public int getBlockquoteBorderColor() {
    return mBlockquoteBorderColor;
  }

  public float getBlockquoteBorderWidth() {
    return mBlockquoteBorderWidth;
  }

  public float getBlockquoteMarginLeft() {
    return mBlockquoteMarginLeft;
  }

  public float getBlockquotePaddingLeft() {
    return mBlockquotePaddingLeft;
  }

  public String getCodeFontFamily() {
    return mCodeFontFamily;
  }

  @ColorInt
  public int getCodeColor() {
    return mCodeColor;
  }

  @ColorInt
  public int getCodeBackgroundColor() {
    return mCodeBackgroundColor;
  }

  public String getPreFontFamily() {
    return mPreFontFamily;
  }

  @ColorInt
  public int getPreColor() {
    return mPreColor;
  }

  @ColorInt
  public int getPreBackgroundColor() {
    return mPreBackgroundColor;
  }

  @ColorInt
  public int getMentionHereColor() {
    return mMentionHereColor;
  }

  @ColorInt
  public int getMentionHereBackgroundColor() {
    return mMentionHereBackgroundColor;
  }

  @ColorInt
  public int getMentionUserColor() {
    return mMentionUserColor;
  }

  @ColorInt
  public int getMentionUserBackgroundColor() {
    return mMentionUserBackgroundColor;
  }
}
