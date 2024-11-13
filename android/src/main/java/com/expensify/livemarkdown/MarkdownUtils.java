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
import java.util.TreeMap;

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
    for (MarkdownRange range : markdownRanges) {
      if (range.type.equals("emoji")) {
        emojiRanges.add(range);
      }
    }

    int i = 0;
    int j = 0;
    while (i < markdownRanges.size() && j < emojiRanges.size()) {
      MarkdownRange currentRange = markdownRanges.get(i);
      MarkdownRange emojiRange = emojiRanges.get(j);

      if (!currentRange.type.equals(type) || currentRange.end < emojiRange.start) {
          i += 1;
          continue;
      } else if (emojiRange.start >= currentRange.start && emojiRange.end <= currentRange.end) {
        // Split range
        MarkdownRange startRange = new MarkdownRange(currentRange.type, currentRange.start, emojiRange.start - currentRange.start, currentRange.depth);
        MarkdownRange endRange = new MarkdownRange(currentRange.type, emojiRange.end, currentRange.end - emojiRange.end, currentRange.depth);

        markdownRanges.add(i + 1, startRange);
        markdownRanges.add(i + 2, endRange);
        markdownRanges.remove(i);
        i = i + 1;
      }
      j += 1;
    }
  }


  private List<MarkdownRange> parseRanges(String rangesJSON, String innerText) {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    try {
      JSONArray ranges = new JSONArray(rangesJSON);
      for (int i = 0; i < ranges.length(); i++) {
        JSONObject range = ranges.getJSONObject(i);
        String type = range.getString("type");
        int start = range.getInt("start");
        int length = range.getInt("length");
        int depth = range.optInt("depth", 1);

        MarkdownRange markdownRange = new MarkdownRange(type, start, length, depth);
        if (markdownRange.length == 0 || markdownRange.end > innerText.length()) {
          continue;
        }
        markdownRanges.add(markdownRange);
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

    List<MarkdownRange> ranges = parseRanges(output, input);
    for (MarkdownRange range : ranges) {
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
