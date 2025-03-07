package com.expensify.livemarkdown;

import com.facebook.jni.HybridData;
import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.fabric.FabricUIManager;
import com.facebook.soloader.SoLoader;

public class NativeProxy {
  static {
    SoLoader.loadLibrary("react_codegen_RNLiveMarkdownSpec");
  }
  
  @DoNotStrip
  @SuppressWarnings("unused")
  private final HybridData mHybridData;

  public NativeProxy() {
    mHybridData = initHybrid();
  }

  private native HybridData initHybrid();

  public native void createCommitHook(FabricUIManager fabricUIManager);
}
