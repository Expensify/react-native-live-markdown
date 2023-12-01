package com.markdowntextinput;

import android.graphics.Typeface;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.StyleSpan;

public class MarkdownUtils {
  public static void applyMarkdownFormatting(SpannableStringBuilder ssb) {
    String text = ssb.toString();
    ssb.clear();
    ssb.append(text);

    // TODO: parse Markdown here

    // TODO: apply formatting here
    int flag = Spanned.SPAN_EXCLUSIVE_EXCLUSIVE;
    ssb.setSpan(new StyleSpan(Typeface.BOLD), 0, Math.min(5, text.length()), flag);
  }
}
