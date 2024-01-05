package com.markdowntextinput;

import android.text.Editable;
import android.text.SpannableStringBuilder;
import android.text.TextWatcher;

public class MarkdownTextWatcher implements TextWatcher {
  private final MarkdownUtils mMarkdownUtils = new MarkdownUtils();

  @Override
  public void beforeTextChanged(CharSequence s, int start, int count, int after) {

  }

  @Override
  public void onTextChanged(CharSequence s, int start, int before, int count)  {
    if (s instanceof SpannableStringBuilder) {
      mMarkdownUtils.applyMarkdownFormatting((SpannableStringBuilder) s);
    }
  }

  @Override
  public void afterTextChanged(Editable editable) {
    // ensures proper styling after wrapping for the next line
    mMarkdownUtils.reinitializeSpans((SpannableStringBuilder) editable);
  }
}
