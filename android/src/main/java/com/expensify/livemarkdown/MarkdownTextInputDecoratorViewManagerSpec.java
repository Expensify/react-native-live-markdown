package com.expensify.livemarkdown;

import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.MarkdownTextInputDecoratorViewManagerDelegate;
import com.facebook.react.viewmanagers.MarkdownTextInputDecoratorViewManagerInterface;

public abstract class MarkdownTextInputDecoratorViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements MarkdownTextInputDecoratorViewManagerInterface<T> {
  private final ViewManagerDelegate<T> mDelegate;

  public MarkdownTextInputDecoratorViewManagerSpec() {
    mDelegate = new MarkdownTextInputDecoratorViewManagerDelegate<>(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<T> getDelegate() {
    return mDelegate;
  }
}
