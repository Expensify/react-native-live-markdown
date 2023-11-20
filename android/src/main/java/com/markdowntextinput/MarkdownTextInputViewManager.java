package com.markdowntextinput;

import android.graphics.Color;

import androidx.annotation.Nullable;

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
  @ReactProp(name = "color")
  public void setColor(MarkdownTextInputView view, @Nullable String color) {
    view.setBackgroundColor(Color.parseColor(color));
  }
}
