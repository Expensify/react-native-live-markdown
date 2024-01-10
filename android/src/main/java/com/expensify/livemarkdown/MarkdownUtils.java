package com.expensify.livemarkdown;

import static com.facebook.infer.annotation.ThreadConfined.UI;

import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.BackgroundColorSpan;
import android.text.style.ForegroundColorSpan;
import android.text.style.LineHeightSpan;
import android.text.style.StrikethroughSpan;
import android.text.style.StyleSpan;
import android.text.style.TypefaceSpan;
import android.text.style.UnderlineSpan;

import androidx.annotation.NonNull;

import com.facebook.infer.annotation.ThreadConfined;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.views.text.CustomLineHeightSpan;
import com.facebook.soloader.SoLoader;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

public class MarkdownUtils {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  private static boolean IS_RUNTIME_INITIALIZED = false;

  @ThreadConfined(UI)
  public static void maybeInitializeRuntime(AssetManager assetManager) {
    UiThreadUtil.assertOnUiThread();
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

  @ThreadConfined(UI)
  private static String parseMarkdown(String input) {
    UiThreadUtil.assertOnUiThread();
    return nativeParseMarkdown(input);
  }

  private static native String nativeParseMarkdown(String input);

  private final List<Object> mSpans = new LinkedList<>();

  private MarkdownStyle mMarkdownStyle;

  public void setMarkdownStyle(@NonNull MarkdownStyle markdownStyle) {
    mMarkdownStyle = markdownStyle;
  }

  // Spans
  private static Object makeBoldSpan() {
    return new StyleSpan(Typeface.BOLD);
  }

  private static Object makeItalicSpan() {
    return new StyleSpan(Typeface.ITALIC);
  }

  private static Object makeUnderlineSpan() {
    return new UnderlineSpan();
  }

  private static Object makeStrikethroughSpan() {
    return new StrikethroughSpan();
  }

  private static Object makeMonospaceSpan() {
    return new TypefaceSpan("monospace");
  }

  private Object makeSyntaxColorSpan() {
    return new ForegroundColorSpan(mMarkdownStyle.getSyntaxColor());
  }

  private Object makeLinkColorSpan() {
    return new ForegroundColorSpan(mMarkdownStyle.getLinkColor());
  }

  private Object makeCodeColorSpan() {
    return new ForegroundColorSpan(mMarkdownStyle.getCodeColor());
  }

  private Object makePreColorSpan() {
    return new ForegroundColorSpan(mMarkdownStyle.getPreColor());
  }

  private Object makeMentionHereBackgroundSpan() {
    return new BackgroundColorSpan(mMarkdownStyle.getMentionHereBackgroundColor());
  }

  private Object makeMentionUserBackgroundSpan() {
    return new BackgroundColorSpan(mMarkdownStyle.getMentionUserBackgroundColor());
  }

  private Object makeCodeBackgroundSpan() {
    return new BackgroundColorSpan(mMarkdownStyle.getCodeBackgroundColor());
  }

  private Object makePreBackgroundSpan() {
    return new BackgroundColorSpan(mMarkdownStyle.getPreBackgroundColor());
  }

  private Object makeH1FontSizeSpan() {
    return new AbsoluteSizeSpan((int) mMarkdownStyle.getH1FontSize(), true);
  }

  private static Object makeHeadingLineHeightSpan(float lineHeight) {
    return (LineHeightSpan) (text, start, end, spanstartv, lh, fm) -> {
      fm.top -= lineHeight / 4;
      fm.ascent -= lineHeight / 4;
    };
  }

  private Object makeBlockquoteMarginSpan() {
    return new QuoteSpan(
      mMarkdownStyle.getQuoteBorderColor(),
      mMarkdownStyle.getQuoteBorderWidth(),
      mMarkdownStyle.getQuoteMarginLeft(),
      mMarkdownStyle.getQuotePaddingLeft());
  }

  public void applyMarkdownFormatting(SpannableStringBuilder ssb) {
    Objects.requireNonNull(mMarkdownStyle, "mMarkdownStyle is null");

    removeSpans(ssb);

    String input = ssb.toString();
    String output = parseMarkdown(input);
    try {
      JSONArray ranges = new JSONArray(output);
      for (int i = 0; i < ranges.length(); i++) {
        JSONArray range = ranges.getJSONArray(i);
        String type = range.getString(0);
        int start = range.getInt(1);
        int end = start + range.getInt(2);
        applyRange(ssb, type, start, end);
      }
    } catch (JSONException e) {
      // Do nothing
    }
  }

  private void applyRange(SpannableStringBuilder ssb, String type, int start, int end) {
    switch (type) {
      case "bold":
        setSpan(ssb, makeBoldSpan(), start, end);
        break;
      case "italic":
        setSpan(ssb, makeItalicSpan(), start, end);
        break;
      case "strikethrough":
        setSpan(ssb, makeStrikethroughSpan(), start, end);
        break;
      case "mention":
        setSpan(ssb, makeBoldSpan(), start, end);
        setSpan(ssb, makeMentionHereBackgroundSpan(), start, end);
        break;
      case "mention-user":
        setSpan(ssb, makeBoldSpan(), start, end);
        // TODO: change mention color when it mentions current user
        setSpan(ssb, makeMentionUserBackgroundSpan(), start, end);
        break;
      case "syntax":
        setSpan(ssb, makeBoldSpan(), start, end);
        setSpan(ssb, makeSyntaxColorSpan(), start, end);
        break;
      case "link":
        setSpan(ssb, makeUnderlineSpan(), start, end);
        setSpan(ssb, makeLinkColorSpan(), start, end);
        break;
      case "code":
        setSpan(ssb, makeMonospaceSpan(), start, end);
        setSpan(ssb, makeCodeColorSpan(), start, end);
        setSpan(ssb, makeCodeBackgroundSpan(), start, end);
        break;
      case "pre":
        setSpan(ssb, makeMonospaceSpan(), start, end);
        setSpan(ssb, makePreColorSpan(), start, end);
        setSpan(ssb, makePreBackgroundSpan(), start, end);
        break;
      case "h1":
        setSpan(ssb, makeBoldSpan(), start, end);
        CustomLineHeightSpan[] spans = ssb.getSpans(0, ssb.length(), CustomLineHeightSpan.class);
        if (spans.length >= 1) {
          int lineHeight = spans[0].getLineHeight();
          setSpan(ssb, makeHeadingLineHeightSpan(lineHeight * 1.5f), start, end);
        }
        // NOTE: size span must be set after line height span to avoid height jumps
        setSpan(ssb, makeH1FontSizeSpan(), start, end);
        break;
      case "blockquote":
        setSpan(ssb, makeBlockquoteMarginSpan(), start, end);
        break;
      default:
        throw new IllegalStateException("Unsupported type: " + type);
    }
  }

  private void setSpan(SpannableStringBuilder ssb, Object span, int start, int end) {
    mSpans.add(span);
    ssb.setSpan(span, start, end, Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
  }

  private void removeSpans(SpannableStringBuilder ssb) {
    // We shouldn't use `removeSpans()` because it also removes SpellcheckSpan, SuggestionSpan etc.
    for (Object span : mSpans) {
      ssb.removeSpan(span);
    }
    mSpans.clear();
  }
}
