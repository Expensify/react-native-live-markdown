package com.expensify.livemarkdown;

import android.view.ViewGroup;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ViewGroupManager;

public abstract class MarkdownTextInputDecoratorViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> {
  public abstract void setMarkdownStyle(T view, ReadableMap value);
  public abstract void setParserId(T view, int value);
}
