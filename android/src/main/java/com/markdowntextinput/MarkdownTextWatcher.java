package com.markdowntextinput;

import android.graphics.Typeface;
import android.text.Editable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.TextWatcher;
import android.text.style.StyleSpan;

import com.facebook.react.views.textinput.ReactEditText;

public class MarkdownTextWatcher implements TextWatcher {
  private final MarkdownUtils mMarkdownUtils = new MarkdownUtils();

  @Override
  public void beforeTextChanged(CharSequence s, int start, int count, int after) {

  }

  @Override
  public void onTextChanged(CharSequence s, int start, int before, int count)  {

  }

  @Override
  public void afterTextChanged(Editable editable) {
    if (editable instanceof SpannableStringBuilder) {
      mMarkdownUtils.applyMarkdownFormatting((SpannableStringBuilder) editable);
    }
  }
}
