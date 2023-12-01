package com.markdowntextinput;

import android.graphics.Typeface;
import android.text.Editable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.TextWatcher;
import android.text.style.StyleSpan;

import com.facebook.react.views.textinput.ReactEditText;

public class MarkdownTextWatcher implements TextWatcher {
  private final ReactEditText mReactEditText;
  private boolean mIsFormatting = false;

  public MarkdownTextWatcher(ReactEditText reactEditText) {
    mReactEditText = reactEditText;
  }

  @Override
  public void beforeTextChanged(CharSequence s, int start, int count, int after) {

  }

  @Override
  public void onTextChanged(CharSequence s, int start, int before, int count)  {

  }

  @Override
  public void afterTextChanged(Editable editable) {
    if (!mIsFormatting) {
      mIsFormatting = true;
      if (editable instanceof SpannableStringBuilder) {
        SpannableStringBuilder ssb = (SpannableStringBuilder) editable;
        int selectionStart = mReactEditText.getSelectionStart();
        int selectionEnd = mReactEditText.getSelectionEnd();
        String text = ssb.toString();
        int length = text.length();
        ssb.clear();
        ssb.append(text);
        mReactEditText.setSelection(Math.min(selectionStart, length), Math.min(selectionEnd, length));
        int flag = Spanned.SPAN_EXCLUSIVE_EXCLUSIVE;
        ssb.setSpan(new StyleSpan(Typeface.BOLD), 0, Math.min(3, ssb.length()), flag);
      }
      mIsFormatting = false;
    }
  }
}
