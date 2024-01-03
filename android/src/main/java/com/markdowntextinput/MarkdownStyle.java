package com.markdowntextinput;

import android.content.Context;
import android.graphics.Color;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ColorPropConverter;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.ReadableMap;

public class MarkdownStyle {
  private int mSyntaxColor = Color.GRAY;
  private int mLinkColor = Color.BLUE;
  private float mHeadingFontSize = 25; // TODO: calculate
  private int mQuoteBorderColor = Color.GRAY;
  private float mQuoteBorderWidth = 10;
  private float mQuoteMarginLeft = 10;
  private float mQuotePaddingLeft = 10;
  private int mCodeColor = Color.rgb(6, 25, 109);
  private int mCodeBackgroundColor = Color.LTGRAY;
  private int mPreColor = Color.rgb(6, 25, 109);
  private int mPreBackgroundColor = Color.LTGRAY;
  private int mMentionHereBackgroundColor = Color.argb(100, 252, 232, 142);
  private int mMentionUserBackgroundColor = Color.argb(100, 176, 217, 255);

  public MarkdownStyle() {}

  public MarkdownStyle(ReadableMap map, Context context) {
    if (map.hasKey("link")) {
      ReadableMap obj = map.getMap("link");
      if (obj != null && obj.hasKey("color")) {
        mLinkColor = getColor(obj, "color", context);
      }
    }
  }

  private int getColor(ReadableMap style, @NonNull String prop, Context context) {
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

  public int getLinkColor() {
    return mLinkColor;
  }
}
