package com.expensify.livemarkdown;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.mapbuffer.MapBuffer;
import com.facebook.react.fabric.mounting.MountingManager;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ViewManagerRegistry;
import com.facebook.yoga.YogaMeasureMode;
import com.facebook.yoga.YogaMeasureOutput;

public class CustomMountingManager extends MountingManager {
  public CustomMountingManager(@NonNull ViewManagerRegistry viewManagerRegistry, @NonNull MountItemExecutor mountItemExecutor) {
    super(viewManagerRegistry, mountItemExecutor);
  }

  @Override
  public long measureMapBuffer(@NonNull ReactContext context, @NonNull String componentName, @NonNull MapBuffer localData, @NonNull MapBuffer props, @Nullable MapBuffer state, float width, @NonNull YogaMeasureMode widthMode, float height, @NonNull YogaMeasureMode heightMode, @Nullable float[] attachmentsPositions) {
    float widthInSP = PixelUtil.toDIPFromPixel(100);
    float heightInSP = PixelUtil.toDIPFromPixel(250f);

    return YogaMeasureOutput.make(widthInSP, heightInSP);
  }
}
