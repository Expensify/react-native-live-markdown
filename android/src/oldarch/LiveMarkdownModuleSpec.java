package com.expensify.livemarkdown;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

abstract class LiveMarkdownModuleSpec extends ReactContextBaseJavaModule {
  LiveMarkdownModuleSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract boolean install();
}
