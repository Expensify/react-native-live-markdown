package com.markdowntextinput;

import androidx.annotation.Nullable;

import android.content.Context;
import android.text.TextWatcher;
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
      MarkdownUtils.maybeInitializeRuntime(getContext().getAssets());
      mReactEditText = (ReactEditText) previousSibling;
      mTextWatcher = new MarkdownTextWatcher();
      mReactEditText.addTextChangedListener(mTextWatcher);
    }
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    if (mReactEditText != null) {
      mReactEditText.removeTextChangedListener(mTextWatcher);
      mReactEditText = null;
      mTextWatcher = null;
    }
  }
}
