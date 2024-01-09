package com.expensify.livemarkdown;

import android.view.View;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;

public abstract class MarkdownTextInputDecoratorViewManagerSpec<T extends View> extends SimpleViewManager<T> {
  public abstract void setMarkdownStyle(T view, ReadableMap value);
}
