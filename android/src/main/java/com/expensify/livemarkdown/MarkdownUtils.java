package com.expensify.livemarkdown;

import android.content.res.AssetManager;
import android.text.SpannableStringBuilder;
import android.text.Spanned;

import androidx.annotation.NonNull;

import com.expensify.livemarkdown.spans.*;
import com.facebook.react.views.text.internal.span.CustomLineHeightSpan;
import com.facebook.soloader.SoLoader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MarkdownUtils {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  private static boolean IS_RUNTIME_INITIALIZED = false;

  public static synchronized void maybeInitializeRuntime(AssetManager assetManager) {
    if (IS_RUNTIME_INITIALIZED) {
      return;
    }
    try {
      InputStream inputStream = assetManager.open("react-native-live-markdown-parser.js");
      byte[] buffer = new byte[inputStream.available()];
      inputStream.read(buffer);
      inputStream.close();
      String code = new String(buffer);
      nativeInitializeRuntime(code);
      IS_RUNTIME_INITIALIZED = true;
    } catch (IOException e) {
      throw new RuntimeException("Failed to initialize Markdown runtime");
    }
  }

  private static native void nativeInitializeRuntime(String code);

  private synchronized static String parseMarkdown(String input) {
    return nativeParseMarkdown(input);
  }

  private static native String nativeParseMarkdown(String input);

  public MarkdownUtils(@NonNull AssetManager assetManager) {
    mAssetManager = assetManager;
  }

  private final @NonNull AssetManager mAssetManager;

  private String mPrevInput;

  private String mPrevOutput;

  private MarkdownStyle mMarkdownStyle;

  public void setMarkdownStyle(@NonNull MarkdownStyle markdownStyle) {
    mMarkdownStyle = markdownStyle;
  }

  private void splitRangesOnEmojis(List<MarkdownRange> markdownRanges, String type) {
    List<MarkdownRange> emojiRanges = new ArrayList<>();
    List<MarkdownRange> styleRanges = new ArrayList<>();
    int index = 0;
    for (MarkdownRange range: markdownRanges) {
      if (range.type.equals("emoji")) {
        emojiRanges.add(range);
      } else if (range.type.equals(type)) {
        styleRanges.add(range);
      }
      range.index = index;
      index += 1;
    }

    int i = 0;
    int j = 0;
    while (i < emojiRanges.size() && j < styleRanges.size()) {
      MarkdownRange emojiRange = emojiRanges.get(i);
      MarkdownRange styleRange = styleRanges.get(j);

      if (styleRange.end < emojiRange.start) {
        // Next style range
        j += 1;
        continue;
      } else if (emojiRange.start >= styleRange.start && emojiRange.end <= styleRange.end) {
        // Split range
        MarkdownRange startRange = new MarkdownRange(styleRange.type, styleRange.start, emojiRange.start - styleRange.start, styleRange.depth, styleRange.index);
        MarkdownRange endRange = new MarkdownRange(styleRange.type, emojiRange.end, styleRange.end - emojiRange.end, styleRange.depth, styleRange.index);
        styleRanges.add(j + 1, endRange);
        styleRanges.add(j + 1, startRange);
        styleRanges.remove(j);
        j += 1;
      }
      i += 1;
    }


    // Replace style ranges with splitted ones
    index = -1;
    int addedElements = 0;
    for (MarkdownRange range: styleRanges) {
      if (index != range.index) {
        markdownRanges.remove(range.index + addedElements);
        index = range.index;
      } else {
        addedElements += 1;
      }
      markdownRanges.add(index + addedElements, range);
    }
  }


  private List<MarkdownRange> parseRanges(String rangesJSON) {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    try {
      JSONArray ranges = new JSONArray(rangesJSON);
      for (int i = 0; i < ranges.length(); i++) {
        JSONObject range = ranges.getJSONObject(i);
        markdownRanges.add(new MarkdownRange(range, i));
      }
    } catch (JSONException e) {
      return new ArrayList<>();
    }
    splitRangesOnEmojis(markdownRanges, "italic");
    splitRangesOnEmojis(markdownRanges, "strikethrough");
    return markdownRanges;
  }



  public void applyMarkdownFormatting(SpannableStringBuilder ssb) {
    Objects.requireNonNull(mMarkdownStyle, "mMarkdownStyle is null");

    removeSpans(ssb);

    String input = ssb.toString();
    String output;
    if (input.equals(mPrevInput)) {
      output = mPrevOutput;
    } else {
      output = parseMarkdown(input);
      mPrevInput = input;
      mPrevOutput = output;
    }

    List<MarkdownRange> ranges = parseRanges(output);
    for (MarkdownRange range: ranges) {
      if (range.length == 0 || range.end > input.length()) {
        continue;
      }
      applyRange(ssb, range.type, range.start, range.end, range.depth);
    }
  }

  private void applyRange(SpannableStringBuilder ssb, String type, int start, int end, int depth) {
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
          depth);
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
