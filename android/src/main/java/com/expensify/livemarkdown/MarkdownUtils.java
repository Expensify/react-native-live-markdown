package com.expensify.livemarkdown;

import android.content.res.AssetManager;
import android.text.SpannableStringBuilder;
import android.text.Spanned;

import androidx.annotation.NonNull;

import com.expensify.livemarkdown.spans.*;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.text.internal.span.CustomLineHeightSpan;
import com.facebook.soloader.SoLoader;

import java.util.List;
import java.util.Objects;

public class MarkdownUtils {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  public MarkdownUtils(@NonNull ReactContext reactContext) {
    mAssetManager = reactContext.getAssets();
    mMarkdownParser = new MarkdownParser(reactContext);
  }

  private final @NonNull AssetManager mAssetManager;
  private final @NonNull MarkdownParser mMarkdownParser;

  private MarkdownStyle mMarkdownStyle;
  private int mParserId;

  public void setMarkdownStyle(@NonNull MarkdownStyle markdownStyle) {
    mMarkdownStyle = markdownStyle;
  }

  public void setParserId(int parserId) {
    mParserId = parserId;
  }

  public void applyMarkdownFormatting(SpannableStringBuilder ssb) {
    Objects.requireNonNull(mMarkdownStyle, "mMarkdownStyle is null");

    removeSpans(ssb);

    String text = ssb.toString();
    List<MarkdownRange> markdownRanges = mMarkdownParser.parse(text, mParserId);

    for (MarkdownRange markdownRange : markdownRanges) {
      applyRange(ssb, markdownRange);
    }
  }

  private void applyRange(SpannableStringBuilder ssb, MarkdownRange markdownRange) {
    String type = markdownRange.getType();
    int start = markdownRange.getStart();
    int end = start + markdownRange.getLength();
    switch (type) {
      case "bold":
        setSpan(ssb, new MarkdownBoldSpan(), start, end);
        break;
      case "italic":
        setSpan(ssb, new MarkdownItalicSpan(), start, end);
        break;
      case "strikethrough":
        setSpan(ssb, new MarkdownStrikethroughSpan(), start, end);
        break;
      case "emoji":
        setSpan(ssb, new MarkdownEmojiSpan(mMarkdownStyle.getEmojiFontSize()), start, end);
        break;
      case "mention-here":
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getMentionHereColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(mMarkdownStyle.getMentionHereBackgroundColor()), start, end);
        break;
      case "mention-user":
        // TODO: change mention color when it mentions current user
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getMentionUserColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(mMarkdownStyle.getMentionUserBackgroundColor()), start, end);
        break;
      case "mention-report":
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getMentionReportColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(mMarkdownStyle.getMentionReportBackgroundColor()), start, end);
        break;
      case "syntax":
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getSyntaxColor()), start, end);
        break;
      case "link":
        setSpan(ssb, new MarkdownUnderlineSpan(), start, end);
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getLinkColor()), start, end);
        break;
      case "code":
        setSpan(ssb, new MarkdownFontFamilySpan(mMarkdownStyle.getCodeFontFamily(), mAssetManager), start, end);
        setSpan(ssb, new MarkdownFontSizeSpan(mMarkdownStyle.getCodeFontSize()), start, end);
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getCodeColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(mMarkdownStyle.getCodeBackgroundColor()), start, end);
        break;
      case "pre":
        setSpan(ssb, new MarkdownFontFamilySpan(mMarkdownStyle.getPreFontFamily(), mAssetManager), start, end);
        setSpan(ssb, new MarkdownFontSizeSpan(mMarkdownStyle.getPreFontSize()), start, end);
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getPreColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(mMarkdownStyle.getPreBackgroundColor()), start, end);
        break;
      case "h1":
        setSpan(ssb, new MarkdownBoldSpan(), start, end);
        CustomLineHeightSpan[] spans = ssb.getSpans(0, ssb.length(), CustomLineHeightSpan.class);
        if (spans.length >= 1) {
          int lineHeight = spans[0].getLineHeight();
          setSpan(ssb, new MarkdownLineHeightSpan(lineHeight * 1.5f), start, end);
        }
        // NOTE: size span must be set after line height span to avoid height jumps
        setSpan(ssb, new MarkdownFontSizeSpan(mMarkdownStyle.getH1FontSize()), start, end);
        break;
      case "blockquote":
        MarkdownBlockquoteSpan span = new MarkdownBlockquoteSpan(
          mMarkdownStyle.getBlockquoteBorderColor(),
          mMarkdownStyle.getBlockquoteBorderWidth(),
          mMarkdownStyle.getBlockquoteMarginLeft(),
          mMarkdownStyle.getBlockquotePaddingLeft(),
          markdownRange.getDepth());
        setSpan(ssb, span, start, end);
        break;
    }
  }

  private void setSpan(SpannableStringBuilder ssb, MarkdownSpan span, int start, int end) {
    ssb.setSpan(span, start, end, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
  }

  private void removeSpans(SpannableStringBuilder ssb) {
    // We shouldn't use `removeSpans()` because it also removes SpellcheckSpan, SuggestionSpan etc.
    MarkdownSpan[] spans = ssb.getSpans(0, ssb.length(), MarkdownSpan.class);
    for (MarkdownSpan span : spans) {
      ssb.removeSpan(span);
    }
  }
}
