package com.expensify.livemarkdown;

import androidx.annotation.Nullable;

import android.content.Context;
import android.text.TextWatcher;
import android.util.AttributeSet;

import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import com.facebook.react.views.textinput.ReactEditText;

public class MarkdownTextInputDecoratorView extends View {

  public MarkdownTextInputDecoratorView(Context context) {
    super(context);
  }

  public MarkdownTextInputDecoratorView(Context context, @Nullable AttributeSet attrs) {
    super(context, attrs);
  }

  public MarkdownTextInputDecoratorView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
  }

  private MarkdownStyle mMarkdownStyle;

  private MarkdownUtils mMarkdownUtils;

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
      mMarkdownUtils = new MarkdownUtils();
      mMarkdownUtils.setMarkdownStyle(mMarkdownStyle);
      mReactEditText = (ReactEditText) previousSibling;
      mTextWatcher = new MarkdownTextWatcher(mMarkdownUtils);
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
      mMarkdownUtils = null;
      mMarkdownStyle = null;
    }
  }

  protected void setMarkdownStyle(MarkdownStyle markdownStyle) {
    mMarkdownStyle = markdownStyle;
    if (mMarkdownUtils != null) {
      mMarkdownUtils.setMarkdownStyle(mMarkdownStyle);
    }
    if (mReactEditText != null) {
      mReactEditText.setText(mReactEditText.getText()); // trigger update
    }
  }
}
