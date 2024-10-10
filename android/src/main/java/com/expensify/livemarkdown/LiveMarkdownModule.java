package com.expensify.livemarkdown;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.fabric.FabricUIManager;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.common.UIManagerType;
import com.facebook.soloader.SoLoader;

import java.util.Objects;

public class LiveMarkdownModule extends NativeLiveMarkdownModuleSpec {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  private NativeProxy mNativeProxy;
  public LiveMarkdownModule(ReactApplicationContext reactContext) {
    super(reactContext);

    this.mNativeProxy = new NativeProxy();
  }

  @Override
  public boolean install() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      FabricUIManager uiManager =
        (FabricUIManager) UIManagerHelper.getUIManager(getReactApplicationContext(), UIManagerType.FABRIC);
      mNativeProxy.createCommitHook(uiManager);
    }

    long jsiRuntime = Objects.requireNonNull(getReactApplicationContext().getJavaScriptContextHolder(), "[react-native-live-markdown] JavaScriptContextHolder is null").get();
    injectJSIBindings(jsiRuntime);

    return true;
  }

  private native void injectJSIBindings(long jsiRuntime);
}
