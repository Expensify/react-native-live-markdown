package com.expensify.livemarkdown;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.soloader.SoLoader;

import java.util.Objects;

public class LiveMarkdownModule extends NativeLiveMarkdownModuleSpec {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  public LiveMarkdownModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public boolean install() {
    long jsiRuntime = Objects.requireNonNull(getReactApplicationContext().getJavaScriptContextHolder(), "[react-native-live-markdown] JavaScriptContextHolder is null").get();
    injectJSIBindings(jsiRuntime);

    return true;
  }

  private native void injectJSIBindings(long jsiRuntime);
}
