package com.markdowntextinput;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;

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
}
