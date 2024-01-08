package com.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

@ReactModule(name = MarkdownTextInputViewManager.NAME)
public class MarkdownTextInputViewManager extends MarkdownTextInputViewManagerSpec<MarkdownTextInputView> {

  public static final String NAME = "MarkdownTextInputView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public MarkdownTextInputView createViewInstance(ThemedReactContext context) {
    return new MarkdownTextInputView(context);
  }

  @Override
  @ReactProp(name = "markdownStyle")
  public void setMarkdownStyle(@NonNull MarkdownTextInputView view, @NonNull ReadableMap value) {
    MarkdownStyle markdownStyle = new MarkdownStyle(value, view.getContext());
    view.setMarkdownStyle(markdownStyle);
  }
}
