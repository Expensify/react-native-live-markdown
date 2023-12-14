package com.markdowntextinput;

import android.graphics.Color;
import android.graphics.Typeface;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.BackgroundColorSpan;
import android.text.style.ForegroundColorSpan;
import android.text.style.LeadingMarginSpan;
import android.text.style.StrikethroughSpan;
import android.text.style.StyleSpan;
import android.text.style.TypefaceSpan;
import android.text.style.UnderlineSpan;

import com.facebook.soloader.SoLoader;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.LinkedList;
import java.util.List;

public class MarkdownUtils {
  static {
    SoLoader.loadLibrary("markdowntextinput");
  }

  private static native String nativeParseMarkdown(String input);

  private final List<Object> mSpans = new LinkedList<>();

  // Colors
  private static final int COLOR_CODE = Color.rgb(6, 25, 109);
  private static final int COLOR_LINK = Color.BLUE;
  private static final int COLOR_SYNTAX = Color.GRAY;
  private static final int COLOR_MENTION_HERE = Color.argb(100, 252, 232, 142);
  private static final int COLOR_MENTION_USER = Color.argb(100, 176, 217, 255);
  private static final int COLOR_CODE_BACKGROUND = Color.argb(100, 211, 211, 211);

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

  private static Object makeSyntaxColorSpan() {
    return new ForegroundColorSpan(COLOR_SYNTAX);
  }

  private static Object makeLinkColorSpan() {
    return new ForegroundColorSpan(COLOR_LINK);
  }

  private static Object makeCodeColorSpan() {
    return new ForegroundColorSpan(COLOR_CODE);
  }

  private static Object makeMentionHereBackgroundSpan() {
    return new BackgroundColorSpan(COLOR_MENTION_HERE);
  }

  private static Object makeMentionUserBackgroundSpan() {
    return new BackgroundColorSpan(COLOR_MENTION_USER);
  }

  private static Object makeCodeBackgroundSpan() {
    return new BackgroundColorSpan(COLOR_CODE_BACKGROUND);
  }

  private static Object makeHeadingSizeSpan() {
    return new AbsoluteSizeSpan(25, true);
  }

  private static Object makeBlockquoteMarginSpan() {
    return new LeadingMarginSpan.Standard(20);
  }

  private void setSpan(SpannableStringBuilder ssb, Object span, int start, int end) {
    mSpans.add(span);
    ssb.setSpan(span, start, end, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
  }

  public void applyMarkdownFormatting(SpannableStringBuilder ssb) {
    String input = ssb.toString();
    String output = nativeParseMarkdown(input);
    try {
      JSONArray array = new JSONArray(output);
      String text = array.getString(0);

      if (ssb.toString().equals(text)) {
        // The transformed text matches the original input so we only need to update spans.
        // We shouldn't use `removeSpans()` because it also removes SpellcheckSpan, SuggestionSpan etc.
        for (Object span : mSpans) {
          ssb.removeSpan(span);
        }
        mSpans.clear();
      } else {
        // TODO: ensure that input stays the same and eventually remove this branch
        // NOTE: If the input changes, the selection will not match.
        // NOTE: Calling `replace` here causes layout jumps.
        ssb.replace(0, ssb.length(), text, 0, text.length());
      }

      JSONArray ranges = array.getJSONArray(1);
      for (int i = 0; i < ranges.length(); i++) {
        JSONArray range = ranges.getJSONArray(i);
        String type = range.getString(0);
        int start = range.getInt(1);
        int end = start + range.getInt(2);
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
          case "pre":
            setSpan(ssb, makeMonospaceSpan(), start, end);
            setSpan(ssb, makeCodeColorSpan(), start, end);
            setSpan(ssb, makeCodeBackgroundSpan(), start, end);
            break;
          case "h1":
            setSpan(ssb, makeBoldSpan(), start, end);
            setSpan(ssb, makeHeadingSizeSpan(), start, end);
            break;
          case "blockquote":
            setSpan(ssb, makeBlockquoteMarginSpan(), start, end);
            break;
          default:
            throw new IllegalStateException("Unsupported type: " + type);
        }
      }
    } catch (JSONException e) {
      // Do nothing
    }
  }
}
