package com.markdowntextinput;

import androidx.annotation.Nullable;

import android.content.Context;
import android.graphics.Typeface;
import android.text.Editable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.TextWatcher;
import android.text.style.StyleSpan;
import android.util.AttributeSet;

import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import com.facebook.react.views.textinput.ReactEditText;

public class MarkdownTextInputView extends View {

  public MarkdownTextInputView(Context context) {
    super(context);
  }

  public MarkdownTextInputView(Context context, @Nullable AttributeSet attrs) {
    super(context, attrs);
  }

  public MarkdownTextInputView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
  }

  private ReactEditText mReactEditText;

  private TextWatcher mTextWatcher;

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();

    View previousSibling = null;
    final ViewParent parent = this.getParent();
    if (parent instanceof ViewGroup) {
      final ViewGroup viewGroup = (ViewGroup) parent;
      for (int i = 1; i < viewGroup.getChildCount(); i++) {
        if (viewGroup.getChildAt(i) == this) {
          previousSibling = viewGroup.getChildAt(i - 1);
          break;
        }
      }
    }
    if (previousSibling instanceof ReactEditText) {
      mReactEditText = (ReactEditText) previousSibling;
      mTextWatcher = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

        }

        @Override
        public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

        }

        private boolean mIsFormatting = false;

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
      };
      mReactEditText.addTextChangedListener(mTextWatcher);
    }
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    mReactEditText.removeTextChangedListener(mTextWatcher);
  }
}
