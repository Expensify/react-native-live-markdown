package com.expensify.livemarkdown;

import android.text.SpannableStringBuilder;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;

import java.util.List;

public class MarkdownUtils {
  public MarkdownUtils(@NonNull ReactContext reactContext) {
    mMarkdownParser = new MarkdownParser(reactContext);
    mMarkdownFormatter = new MarkdownFormatter(reactContext.getAssets());
  }

  private final @NonNull MarkdownParser mMarkdownParser;
  private final @NonNull MarkdownFormatter mMarkdownFormatter;

  private MarkdownStyle mMarkdownStyle;
  private int mParserId;

  public void setMarkdownStyle(@NonNull MarkdownStyle markdownStyle) {
    mMarkdownStyle = markdownStyle;
  }

  public void setParserId(int parserId) {
    mParserId = parserId;
  }

  public void applyMarkdownFormatting(SpannableStringBuilder ssb) {
    String text = ssb.toString();
    List<MarkdownRange> markdownRanges = mMarkdownParser.parse(text, mParserId);
    mMarkdownFormatter.format(ssb, markdownRanges, mMarkdownStyle);
  }
}
