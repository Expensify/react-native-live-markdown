package com.expensify.livemarkdown;

import android.content.res.AssetManager;
import android.text.SpannableStringBuilder;
import android.text.Spanned;

import androidx.annotation.NonNull;

import com.expensify.livemarkdown.spans.*;
import com.facebook.react.views.text.internal.span.CustomLineHeightSpan;

import java.util.List;
import java.util.Objects;

public class MarkdownFormatter {
  private final @NonNull AssetManager mAssetManager;

  public MarkdownFormatter(@NonNull AssetManager assetManager) {
    mAssetManager = assetManager;
  }

  public void format(SpannableStringBuilder ssb, List<MarkdownRange> markdownRanges, @NonNull MarkdownStyle markdownStyle) {
    Objects.requireNonNull(markdownStyle, "mMarkdownStyle is null");
    removeSpans(ssb);
    applyRanges(ssb, markdownRanges, markdownStyle);
  }

  private void removeSpans(SpannableStringBuilder ssb) {
    // We shouldn't use `removeSpans()` because it also removes SpellcheckSpan, SuggestionSpan etc.
    MarkdownSpan[] spans = ssb.getSpans(0, ssb.length(), MarkdownSpan.class);
    for (MarkdownSpan span : spans) {
      ssb.removeSpan(span);
    }
  }

  private void applyRanges(SpannableStringBuilder ssb, List<MarkdownRange> markdownRanges, @NonNull MarkdownStyle markdownStyle) {
    for (MarkdownRange markdownRange : markdownRanges) {
      applyRange(ssb, markdownRange, markdownStyle);
    }
  }

  private void applyRange(SpannableStringBuilder ssb, MarkdownRange markdownRange, MarkdownStyle markdownStyle) {
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
        setSpan(ssb, new MarkdownEmojiSpan(markdownStyle.getEmojiFontSize()), start, end);
        break;
      case "mention-here":
        setSpan(ssb, new MarkdownForegroundColorSpan(markdownStyle.getMentionHereColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(markdownStyle.getMentionHereBackgroundColor()), start, end);
        break;
      case "mention-user":
        // TODO: change mention color when it mentions current user
        setSpan(ssb, new MarkdownForegroundColorSpan(markdownStyle.getMentionUserColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(markdownStyle.getMentionUserBackgroundColor()), start, end);
        break;
      case "mention-report":
        setSpan(ssb, new MarkdownForegroundColorSpan(markdownStyle.getMentionReportColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(markdownStyle.getMentionReportBackgroundColor()), start, end);
        break;
      case "syntax":
        setSpan(ssb, new MarkdownForegroundColorSpan(markdownStyle.getSyntaxColor()), start, end);
        break;
      case "link":
        setSpan(ssb, new MarkdownUnderlineSpan(), start, end);
        setSpan(ssb, new MarkdownForegroundColorSpan(markdownStyle.getLinkColor()), start, end);
        break;
      case "code":
        setSpan(ssb, new MarkdownFontFamilySpan(markdownStyle.getCodeFontFamily(), mAssetManager), start, end);
        setSpan(ssb, new MarkdownFontSizeSpan(markdownStyle.getCodeFontSize()), start, end);
        setSpan(ssb, new MarkdownForegroundColorSpan(markdownStyle.getCodeColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(markdownStyle.getCodeBackgroundColor()), start, end);
        break;
      case "pre":
        setSpan(ssb, new MarkdownFontFamilySpan(markdownStyle.getPreFontFamily(), mAssetManager), start, end);
        setSpan(ssb, new MarkdownFontSizeSpan(markdownStyle.getPreFontSize()), start, end);
        setSpan(ssb, new MarkdownForegroundColorSpan(markdownStyle.getPreColor()), start, end);
        setSpan(ssb, new MarkdownBackgroundColorSpan(markdownStyle.getPreBackgroundColor()), start, end);
        break;
      case "h1":
        setSpan(ssb, new MarkdownBoldSpan(), start, end);
        CustomLineHeightSpan[] spans = ssb.getSpans(0, ssb.length(), CustomLineHeightSpan.class);
        if (spans.length >= 1) {
          int lineHeight = spans[0].getLineHeight();
          setSpan(ssb, new MarkdownLineHeightSpan(lineHeight * 1.5f), start, end);
        }
        // NOTE: size span must be set after line height span to avoid height jumps
        setSpan(ssb, new MarkdownFontSizeSpan(markdownStyle.getH1FontSize()), start, end);
        break;
      case "blockquote":
        MarkdownBlockquoteSpan span = new MarkdownBlockquoteSpan(
          markdownStyle.getBlockquoteBorderColor(),
          markdownStyle.getBlockquoteBorderWidth(),
          markdownStyle.getBlockquoteMarginLeft(),
          markdownStyle.getBlockquotePaddingLeft(),
          markdownRange.getDepth());
        setSpan(ssb, span, start, end);
        break;
    }
  }

  private void setSpan(SpannableStringBuilder ssb, MarkdownSpan span, int start, int end) {
    ssb.setSpan(span, start, end, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
  }
}
