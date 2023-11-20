package com.markdowntextinput;

import android.view.View;

import androidx.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.MarkdownTextInputViewManagerDelegate;
import com.facebook.react.viewmanagers.MarkdownTextInputViewManagerInterface;

public abstract class MarkdownTextInputViewManagerSpec<T extends View> extends SimpleViewManager<T> implements MarkdownTextInputViewManagerInterface<T> {
  private final ViewManagerDelegate<T> mDelegate;

  public MarkdownTextInputViewManagerSpec() {
    mDelegate = new MarkdownTextInputViewManagerDelegate(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<T> getDelegate() {
    return mDelegate;
  }
}
