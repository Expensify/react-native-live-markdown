package com.expensify.livemarkdown;

import android.text.Editable;
import android.text.SpannableStringBuilder;
import android.text.TextWatcher;

import androidx.annotation.NonNull;

public class MarkdownTextWatcher implements TextWatcher {
  private final MarkdownUtils mMarkdownUtils;

  private boolean mShouldSkip = false;

  public MarkdownTextWatcher(@NonNull MarkdownUtils markdownUtils) {
    mMarkdownUtils = markdownUtils;
  }

  @Override
  public void beforeTextChanged(CharSequence s, int start, int count, int after) {

  }

  @Override
  public void onTextChanged(CharSequence s, int start, int before, int count) {
    if (mShouldSkip) {
      return;
    }
    // Set the flag to indicate text is being changed
    mShouldSkip = true;
  }

  @Override
  public void afterTextChanged(Editable editable) {
      if (!mShouldSkip) {
          return;
      }
      
      if (editable instanceof SpannableStringBuilder) {
          mMarkdownUtils.applyMarkdownFormatting((SpannableStringBuilder) editable);
      }
      
      // Reset the flag after formatting is applied
      mShouldSkip = false;
  }}
