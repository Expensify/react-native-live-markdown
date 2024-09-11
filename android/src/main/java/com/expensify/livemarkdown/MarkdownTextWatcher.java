package com.expensify.livemarkdown;

import android.text.Editable;
import android.text.SpannableStringBuilder;
import android.text.TextWatcher;

import androidx.annotation.NonNull;

public class MarkdownTextWatcher implements TextWatcher {
  private final MarkdownUtils mMarkdownUtils;
  private boolean mShouldSkip = false;
  private String mPreviousEditable;

  public MarkdownTextWatcher(@NonNull MarkdownUtils markdownUtils) {
    mMarkdownUtils = markdownUtils;
  }

  @Override
  public void beforeTextChanged(CharSequence s, int start, int count, int after) {

  }

  @Override
  public void onTextChanged(CharSequence s, int start, int before, int count) {
   
  }

  @Override
  public void afterTextChanged(Editable editable) {
      if (editable instanceof SpannableStringBuilder) {
          String currentEditable = editable.toString();
          if (mPreviousEditable != null && mPreviousEditable.equals(currentEditable)) {
              return;
          }
          mMarkdownUtils.applyMarkdownFormatting((SpannableStringBuilder) editable);
          mPreviousEditable = currentEditable;
      }      
  }
}