package com.expensify.livemarkdown;

import static com.facebook.react.fabric.mounting.LayoutMetricsConversions.getYogaMeasureMode;
import static com.facebook.react.fabric.mounting.LayoutMetricsConversions.getYogaSize;

import android.text.SpannableStringBuilder;

import androidx.annotation.Nullable;

import com.facebook.infer.annotation.Assertions;
import com.facebook.jni.annotations.DoNotStrip;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.mapbuffer.ReadableMapBuffer;
import com.facebook.react.fabric.FabricUIManager;
import com.facebook.react.fabric.mounting.MountingManager;
import com.facebook.react.fabric.mounting.SurfaceMountingManager;
import com.facebook.react.uimanager.ViewManagerRegistry;
import com.facebook.react.uimanager.events.BatchEventDispatchedListener;
import com.facebook.react.views.text.TextLayoutManager;

import java.lang.reflect.Field;

@DoNotStrip
public class CustomFabricUIManager extends FabricUIManager {

  private final ReactApplicationContext mReactApplicationContext;
  private final MountingManager mMountingManager;
  private final MarkdownUtils mMarkdownUtils;

  public CustomFabricUIManager(
    ReactApplicationContext reactContext,
    ViewManagerRegistry viewManagerRegistry,
    BatchEventDispatchedListener batchEventDispatchedListener,
    MountingManager mountingManager,
    ReadableMap markdownProps,
    int parserId
  ) {
    super(reactContext, viewManagerRegistry, batchEventDispatchedListener);

    this.mReactApplicationContext = reactContext;
    this.mMountingManager = mountingManager;

    this.mMarkdownUtils = new MarkdownUtils(reactContext);
    this.mMarkdownUtils.setMarkdownStyle(new MarkdownStyle(markdownProps, reactContext));
    this.mMarkdownUtils.setParserId(parserId);
  }

  public long measureText(
    int surfaceId,
    ReadableMapBuffer attributedString,
    ReadableMapBuffer paragraphAttributes,
    float minWidth,
    float maxWidth,
    float minHeight,
    float maxHeight,
    @Nullable float[] attachmentsPositions) {

    ReactContext context;
    if (surfaceId > 0) {
      SurfaceMountingManager surfaceMountingManager =
        mMountingManager.getSurfaceManagerEnforced(surfaceId, "measureText");
      if (surfaceMountingManager.isStopped()) {
        return 0;
      }
      context = surfaceMountingManager.getContext();
      Assertions.assertNotNull(
        context, "Context in SurfaceMountingManager is null. surfaceId: " + surfaceId);
    } else {
      context = mReactApplicationContext;
    }

    return TextLayoutManager.measureText(
      context,
      attributedString,
      paragraphAttributes,
      getYogaSize(minWidth, maxWidth),
      getYogaMeasureMode(minWidth, maxWidth),
      getYogaSize(minHeight, maxHeight),
      getYogaMeasureMode(minHeight, maxHeight),
      spannable -> {
        mMarkdownUtils.applyMarkdownFormatting((SpannableStringBuilder)spannable);
      },
      attachmentsPositions);
  }

  public static FabricUIManager create(FabricUIManager source, ReadableMap markdownProps, int parserId) {
    Class<? extends FabricUIManager> uiManagerClass = source.getClass();

    try {
      Field mountingManagerField = uiManagerClass.getDeclaredField("mMountingManager");
      mountingManagerField.setAccessible(true);

      MountingManager sourceMountingManager = readPrivateField(source, "mMountingManager");
      ReactApplicationContext reactContext = readPrivateField(source, "mReactApplicationContext");
      ViewManagerRegistry viewManagerRegistry = readPrivateField(source, "mViewManagerRegistry");
      BatchEventDispatchedListener batchEventDispatchedListener = readPrivateField(source, "mBatchEventDispatchedListener");

      FabricUIManager customFabricUIManager = new CustomFabricUIManager(
        reactContext,
        viewManagerRegistry,
        batchEventDispatchedListener,
        sourceMountingManager,
        markdownProps,
        parserId
      );

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
