package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.turbomodule.core.interfaces.BindingsInstallerHolder;
import com.facebook.react.turbomodule.core.interfaces.TurboModuleWithJSIBindings;
import com.facebook.soloader.SoLoader;

public class LiveMarkdownModule extends NativeLiveMarkdownModuleSpec implements TurboModuleWithJSIBindings {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  public LiveMarkdownModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @DoNotStrip
  @NonNull
  @Override
  public native BindingsInstallerHolder getBindingsInstaller();
}
