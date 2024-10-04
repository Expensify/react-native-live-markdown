package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.fabric.FabricUIManager;
import com.facebook.react.fabric.mounting.MountingManager;
import com.facebook.react.uimanager.ViewManagerRegistry;
import com.facebook.react.uimanager.events.BatchEventDispatchedListener;

import java.lang.reflect.Field;

public class CustomFabricUIManager {

  public static FabricUIManager create(FabricUIManager source, ReadableMap markdownProps, int parserId) {
    Class<? extends FabricUIManager> uiManagerClass = source.getClass();

    try {
      Field mountingManagerField = uiManagerClass.getDeclaredField("mMountingManager");
      mountingManagerField.setAccessible(true);

      ReactApplicationContext reactContext = readPrivateField(source, "mReactApplicationContext");
      ViewManagerRegistry viewManagerRegistry = readPrivateField(source, "mViewManagerRegistry");
      BatchEventDispatchedListener batchEventDispatchedListener = readPrivateField(source, "mBatchEventDispatchedListener");
      MountingManager.MountItemExecutor mountItemExecutor = readPrivateField(source, "mMountItemExecutor");

      FabricUIManager customFabricUIManager = new FabricUIManager(reactContext, viewManagerRegistry, batchEventDispatchedListener);

      mountingManagerField.set(customFabricUIManager, new CustomMountingManager(viewManagerRegistry, mountItemExecutor, reactContext, markdownProps, parserId));

      return customFabricUIManager;
    } catch (NoSuchFieldException | IllegalAccessException e) {
      throw new RuntimeException("[LiveMarkdown] Cannot read data from FabricUIManager");
    }
  }

  @SuppressWarnings("unchecked")
  private static <T> T readPrivateField(Object obj, String name) throws NoSuchFieldException, IllegalAccessException {
    Class<?> clazz = obj.getClass();

    Field field = clazz.getDeclaredField(name);
    field.setAccessible(true);
    T value = (T) field.get(obj);

    return value;
  }
}
