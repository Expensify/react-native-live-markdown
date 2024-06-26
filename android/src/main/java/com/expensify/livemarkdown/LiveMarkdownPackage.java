package com.expensify.livemarkdown;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class LiveMarkdownPackage extends TurboReactPackage {
  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    List<ViewManager> viewManagers = new ArrayList<>();
    viewManagers.add(new MarkdownTextInputDecoratorViewManager());
    return viewManagers;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return new ReactModuleInfoProvider() {
      @Override
      public Map<String, ReactModuleInfo> getReactModuleInfos() {
        return Map.of(LiveMarkdownModule.NAME, new ReactModuleInfo(
          LiveMarkdownModule.NAME,
          LiveMarkdownModule.class.getName(),
          false, // canOverrideExistingModule
          false, // needsEagerInit
          false, // isCxxModule
          true // isTurboModule
        ));
      }
    };
  }
  @Nullable
  @Override
  public NativeModule getModule(@NonNull String s, @NonNull ReactApplicationContext reactApplicationContext) {
    if (s.equals(LiveMarkdownModule.NAME)) {
      return new LiveMarkdownModule(reactApplicationContext);
    }
    return null;
  }
}
