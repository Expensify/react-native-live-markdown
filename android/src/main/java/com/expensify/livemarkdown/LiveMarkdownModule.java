package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.soloader.SoLoader;

import java.util.Objects;

public class LiveMarkdownModule extends com.expensify.livemarkdown.LiveMarkdownModuleSpec {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  public static final String NAME = "LiveMarkdownModule";

  LiveMarkdownModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean install() {
    long jsiRuntime = Objects.requireNonNull(getReactApplicationContext().getJavaScriptContextHolder()).get();
    injectJSIBindings(jsiRuntime);
    return true;
  }

  private native void injectJSIBindings(long jsiRuntime);
}
