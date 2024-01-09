package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

@ReactModule(name = MarkdownTextInputDecoratorViewManager.NAME)
public class MarkdownTextInputDecoratorViewManager extends MarkdownTextInputDecoratorViewManagerSpec<MarkdownTextInputDecoratorView> {

  public static final String NAME = "MarkdownTextInputDecoratorView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public MarkdownTextInputDecoratorView createViewInstance(ThemedReactContext context) {
    return new MarkdownTextInputDecoratorView(context);
  }

  @Override
  @ReactProp(name = "markdownStyle")
  public void setMarkdownStyle(@NonNull MarkdownTextInputDecoratorView view, @NonNull ReadableMap value) {
    MarkdownStyle markdownStyle = new MarkdownStyle(value, view.getContext());
    view.setMarkdownStyle(markdownStyle);
  }
}
