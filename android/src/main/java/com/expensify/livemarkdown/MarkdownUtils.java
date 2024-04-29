package com.expensify.livemarkdown;

import android.content.res.AssetManager;
import android.text.SpannableStringBuilder;
import android.text.Spanned;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.views.text.CustomLineHeightSpan;
import com.facebook.soloader.SoLoader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

public class MarkdownUtils {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  interface Thunk { void apply(); }

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

  final @NonNull AssetManager mAssetManager;

  Thunk redrawCall;

  private String mPrevInput;

  private String mPrevOutput;

  private MarkdownStyle mMarkdownStyle;

  public void setMarkdownStyle(@NonNull MarkdownStyle markdownStyle) {
    mMarkdownStyle = markdownStyle;
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

    try {
      JSONArray ranges = new JSONArray(output);
      for (int i = 0; i < ranges.length(); i++) {
        JSONObject range = ranges.getJSONObject(i);
        String type = range.getString("type");
        int start = range.getInt("start");
        int length = range.getInt("length");
        int depth = range.optInt("depth", 1);
        int end = start + length;
        applyRange(ssb, type, start, end, depth);
      }
      redrawCall.apply();
    } catch (JSONException e) {
      // Do nothing
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
        setSpan(ssb, new MarkdownMentionSpan(mMarkdownStyle.getMentionHereBackgroundColor(), mMarkdownStyle.getMentionHereColor()), start, end);
        break;
      case "mention-user":
        // TODO: change mention color when it mentions current user
        setSpan(ssb, new MarkdownMentionSpan(mMarkdownStyle.getMentionUserBackgroundColor(), mMarkdownStyle.getMentionUserColor()), start, end);
        break;
      case "mention-report":
        setSpan(ssb, new MarkdownMentionSpan(mMarkdownStyle.getMentionReportBackgroundColor(), mMarkdownStyle.getMentionReportColor()), start, end);
        break;
      case "syntax":
        setSpan(ssb, new MarkdownForegroundColorSpan(mMarkdownStyle.getSyntaxColor()), start, end);
        break;
      case "link":
        setSpan(ssb, new MarkdownLinkSpan(mMarkdownStyle.getLinkColor()), start, end);
        break;
      case "code":
        MarkdownCodeSpan codeSpan = new MarkdownCodeSpan(
          mAssetManager,
          mMarkdownStyle.getCodeFontFamily(),
          mMarkdownStyle.getCodeFontSize(),
          mMarkdownStyle.getCodeColor()
        );
        setSpan(ssb, codeSpan, start, end);
        break;
      case "pre":
        MarkdownPreSpan preSpan = new MarkdownPreSpan(
          mAssetManager,
          mMarkdownStyle.getPreFontFamily(),
          mMarkdownStyle.getPreFontSize(),
          mMarkdownStyle.getPreColor(),
          (int) PixelUtil.toPixelFromDIP(mMarkdownStyle.getPrePadding())
        );
        setSpan(ssb, preSpan, start, end);
        break;
      case "h1":
        Integer lineHeight = null;
        CustomLineHeightSpan[] spans = ssb.getSpans(0, ssb.length(), CustomLineHeightSpan.class);
        if (spans.length >= 1) {
          lineHeight = spans[0].getLineHeight();
        }
        setSpan(ssb, new MarkdownH1Span(mMarkdownStyle.getH1FontSize(), lineHeight), start, end);
        break;
      case "blockquote":
        MarkdownBlockquoteSpan blockquoteSpan = new MarkdownBlockquoteSpan(
          mMarkdownStyle.getBlockquoteBorderColor(),
          mMarkdownStyle.getBlockquoteBorderWidth(),
          mMarkdownStyle.getBlockquoteMarginLeft(),
          mMarkdownStyle.getBlockquotePaddingLeft(),
          depth
        );
        setSpan(ssb, blockquoteSpan, start, end);
        break;
      default:
        throw new IllegalStateException("Unsupported type: " + type);
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
