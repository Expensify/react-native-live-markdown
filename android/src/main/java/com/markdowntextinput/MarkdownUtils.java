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

public class MarkdownUtils {
  static {
    SoLoader.loadLibrary("markdowntextinput");
  }

  private static native String nativeParseMarkdown(String input);

  public static void applyMarkdownFormatting(SpannableStringBuilder ssb) {
    String input = ssb.toString();
    String output = nativeParseMarkdown(input);
    try {
      JSONArray array = new JSONArray(output);
      String text = array.getString(0);
      ssb.replace(0, ssb.length(), text, 0, text.length());
      JSONArray ranges = array.getJSONArray(1);
      for (int i = 0; i < ranges.length(); i++) {
        JSONArray range = ranges.getJSONArray(i);
        String type = range.getString(0);
        int start = range.getInt(1);
        int end = start + range.getInt(2);
        int flag = Spanned.SPAN_EXCLUSIVE_EXCLUSIVE;
        switch (type) {
          case "bold":
            ssb.setSpan(new StyleSpan(Typeface.BOLD), start, end, flag);
            break;
          case "italic":
            ssb.setSpan(new StyleSpan(Typeface.ITALIC), start, end, flag);
            break;
          case "strikethrough":
            ssb.setSpan(new StrikethroughSpan(), start, end, flag);
            break;
          case "mention":
            ssb.setSpan(new StyleSpan(Typeface.BOLD), start, end, flag);
            ssb.setSpan(new BackgroundColorSpan(Color.rgb(252, 232, 142)), start, end, flag);
            break;
          case "mention-user":
            ssb.setSpan(new StyleSpan(Typeface.BOLD), start, end, flag);
            // TODO: change mention color when it mentions current user
            ssb.setSpan(new BackgroundColorSpan(Color.rgb(176, 217, 255)), start, end, flag);
            break;
          case "syntax":
            ssb.setSpan(new StyleSpan(Typeface.BOLD), start, end, flag);
            ssb.setSpan(new ForegroundColorSpan(Color.GRAY), start, end, flag);
            break;
          case "link":
            ssb.setSpan(new UnderlineSpan(), start, end, flag);
            ssb.setSpan(new ForegroundColorSpan(Color.BLUE), start, end, flag);
            break;
          case "code":
          case "pre":
            ssb.setSpan(new TypefaceSpan("monospace"), start, end, flag);
            ssb.setSpan(new ForegroundColorSpan(Color.rgb(6, 25, 109)), start, end, flag);
            ssb.setSpan(new BackgroundColorSpan(Color.LTGRAY), start, end, flag);
            break;
          case "h1":
            ssb.setSpan(new AbsoluteSizeSpan(25, true), start, end, flag);
            ssb.setSpan(new StyleSpan(Typeface.BOLD), start, end, flag);
            break;
          case "blockquote":
            ssb.setSpan(new LeadingMarginSpan.Standard(20), start, end, flag);
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
