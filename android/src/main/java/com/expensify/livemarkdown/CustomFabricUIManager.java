package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.fabric.FabricUIManager;
import com.facebook.react.fabric.mounting.MountingManager;
import com.facebook.react.uimanager.ViewManagerRegistry;
import com.facebook.react.uimanager.events.BatchEventDispatchedListener;

import java.lang.reflect.Field;

public class CustomFabricUIManager {
  public static FabricUIManager create(FabricUIManager source) {
    Class<? extends FabricUIManager> uiManagerClass = source.getClass();

    try {
      Field reactApplicationContextField = uiManagerClass.getDeclaredField("mReactApplicationContext");
      Field viewManagerRegistryField = uiManagerClass.getDeclaredField("mViewManagerRegistry");
      Field batchEventDispatchedListenerField = uiManagerClass.getDeclaredField("mBatchEventDispatchedListener");
      Field mountItemExecutorField = uiManagerClass.getDeclaredField("mMountItemExecutor");
      Field mountingManagerField = uiManagerClass.getDeclaredField("mMountingManager");

      reactApplicationContextField.setAccessible(true);
      viewManagerRegistryField.setAccessible(true);
      batchEventDispatchedListenerField.setAccessible(true);
      mountItemExecutorField.setAccessible(true);
      mountingManagerField.setAccessible(true);

      ReactApplicationContext reactContext = (ReactApplicationContext) reactApplicationContextField.get(source);
      ViewManagerRegistry viewManagerRegistry = (ViewManagerRegistry) viewManagerRegistryField.get(source);
      BatchEventDispatchedListener batchEventDispatchedListener = (BatchEventDispatchedListener) batchEventDispatchedListenerField.get(source);
      MountingManager.MountItemExecutor mountItemExecutor = (MountingManager.MountItemExecutor) mountItemExecutorField.get(source);

      FabricUIManager customFabricUIManager = new FabricUIManager(reactContext, viewManagerRegistry, batchEventDispatchedListener);

      mountingManagerField.set(customFabricUIManager, new CustomMountingManager(viewManagerRegistry, mountItemExecutor));

      return customFabricUIManager;
    } catch (NoSuchFieldException | IllegalAccessException e) {
      throw new RuntimeException("[LiveMarkdown] Cannot read data from FabricUIManager");
    }
  }
}
