package com.expensify.livemarkdown;

import static com.facebook.react.views.text.TextAttributeProps.UNSET;

import android.content.Context;
import android.content.res.AssetManager;
import android.text.BoringLayout;
import android.text.Layout;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.TextPaint;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.mapbuffer.MapBuffer;
import com.facebook.react.fabric.mounting.MountingManager;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ViewManagerRegistry;
import com.facebook.react.views.text.TextAttributeProps;
import com.facebook.react.views.text.TextLayoutManagerMapBuffer;
import com.facebook.react.views.text.internal.span.TextInlineViewPlaceholderSpan;
import com.facebook.yoga.YogaMeasureMode;
import com.facebook.yoga.YogaMeasureOutput;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class CustomMountingManager extends MountingManager {
  private static final boolean DEFAULT_INCLUDE_FONT_PADDING = true;
  private static final TextPaint sTextPaintInstance = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);

  private MarkdownUtils markdownUtils;

  public CustomMountingManager(
      @NonNull ViewManagerRegistry viewManagerRegistry,
      @NonNull MountItemExecutor mountItemExecutor,
      @NonNull Context context,
      @NonNull ReadableMap decoratorProps) {
    super(viewManagerRegistry, mountItemExecutor);

    AssetManager assetManager = context.getAssets();
    MarkdownUtils.maybeInitializeRuntime(assetManager);

    this.markdownUtils = new MarkdownUtils(assetManager);
    this.markdownUtils.setMarkdownStyle(new MarkdownStyle(decoratorProps, context));
  }

  @Override
  public long measureMapBuffer(
      @NonNull ReactContext context,
      @NonNull String componentName,
      @NonNull MapBuffer attributedString,
      @NonNull MapBuffer paragraphAttributes,
      @Nullable MapBuffer state,
      float width,
      @NonNull YogaMeasureMode widthYogaMeasureMode,
      float height,
      @NonNull YogaMeasureMode heightYogaMeasureMode,
      @Nullable float[] attachmentsPositions) {

    Spannable text =
      TextLayoutManagerMapBuffer.getOrCreateSpannableForText(context, attributedString, null);

    if (text == null) {
      return 0;
    }

    int textBreakStrategy =
      TextAttributeProps.getTextBreakStrategy(
        paragraphAttributes.getString(TextLayoutManagerMapBuffer.PA_KEY_TEXT_BREAK_STRATEGY));
    boolean includeFontPadding =
      paragraphAttributes.contains(TextLayoutManagerMapBuffer.PA_KEY_INCLUDE_FONT_PADDING)
        ? paragraphAttributes.getBoolean(TextLayoutManagerMapBuffer.PA_KEY_INCLUDE_FONT_PADDING)
        : DEFAULT_INCLUDE_FONT_PADDING;
    int hyphenationFrequency =
      TextAttributeProps.getHyphenationFrequency(
        paragraphAttributes.getString(TextLayoutManagerMapBuffer.PA_KEY_HYPHENATION_FREQUENCY));

    // StaticLayout returns wrong metrics for the last line if it's empty, add something to the
    // last line so it's measured correctly
    if (text.toString().endsWith("\n")) {
      SpannableStringBuilder sb = new SpannableStringBuilder(text);
      sb.append("I");

      text = sb;
    }

    markdownUtils.applyMarkdownFormatting((SpannableStringBuilder)text);

    BoringLayout.Metrics boring = BoringLayout.isBoring(text, sTextPaintInstance);

    Class<TextLayoutManagerMapBuffer> mapBufferClass = TextLayoutManagerMapBuffer.class;
    try {
      Method createLayoutMethod = mapBufferClass.getDeclaredMethod("createLayout", Spannable.class, BoringLayout.Metrics.class, float.class, YogaMeasureMode.class, boolean.class, int.class, int.class);
      createLayoutMethod.setAccessible(true);

      Layout layout = (Layout)createLayoutMethod.invoke(
        null,
        text,
        boring,
        width,
        widthYogaMeasureMode,
        includeFontPadding,
        textBreakStrategy,
        hyphenationFrequency);

      int maximumNumberOfLines =
        paragraphAttributes.contains(TextLayoutManagerMapBuffer.PA_KEY_MAX_NUMBER_OF_LINES)
          ? paragraphAttributes.getInt(TextLayoutManagerMapBuffer.PA_KEY_MAX_NUMBER_OF_LINES)
          : UNSET;

      int calculatedLineCount =
        maximumNumberOfLines == UNSET || maximumNumberOfLines == 0
          ? layout.getLineCount()
          : Math.min(maximumNumberOfLines, layout.getLineCount());

      // Instead of using `layout.getWidth()` (which may yield a significantly larger width for
      // text that is wrapping), compute width using the longest line.
      float calculatedWidth = 0;
      if (widthYogaMeasureMode == YogaMeasureMode.EXACTLY) {
        calculatedWidth = width;
      } else {
        for (int lineIndex = 0; lineIndex < calculatedLineCount; lineIndex++) {
          boolean endsWithNewLine =
            text.length() > 0 && text.charAt(layout.getLineEnd(lineIndex) - 1) == '\n';
          float lineWidth =
            endsWithNewLine ? layout.getLineMax(lineIndex) : layout.getLineWidth(lineIndex);
          if (lineWidth > calculatedWidth) {
            calculatedWidth = lineWidth;
          }
        }
        if (widthYogaMeasureMode == YogaMeasureMode.AT_MOST && calculatedWidth > width) {
          calculatedWidth = width;
        }
      }

      // Android 11+ introduces changes in text width calculation which leads to cases
      // where the container is measured smaller than text. Math.ceil prevents it
      // See T136756103 for investigation
      if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.Q) {
        calculatedWidth = (float) Math.ceil(calculatedWidth);
      }

      float calculatedHeight = height;
      if (heightYogaMeasureMode != YogaMeasureMode.EXACTLY) {
        calculatedHeight = layout.getLineBottom(calculatedLineCount - 1);
        if (heightYogaMeasureMode == YogaMeasureMode.AT_MOST && calculatedHeight > height) {
          calculatedHeight = height;
        }
      }

      // Calculate the positions of the attachments (views) that will be rendered inside the
      // Spanned Text. The following logic is only executed when a text contains views inside.
      // This follows a similar logic than used in pre-fabric (see ReactTextView.onLayout method).
      int attachmentIndex = 0;
      int lastAttachmentFoundInSpan;
      for (int i = 0; i < text.length(); i = lastAttachmentFoundInSpan) {
        lastAttachmentFoundInSpan =
          text.nextSpanTransition(i, text.length(), TextInlineViewPlaceholderSpan.class);
        TextInlineViewPlaceholderSpan[] placeholders =
          text.getSpans(i, lastAttachmentFoundInSpan, TextInlineViewPlaceholderSpan.class);
        for (TextInlineViewPlaceholderSpan placeholder : placeholders) {
          int start = text.getSpanStart(placeholder);
          int line = layout.getLineForOffset(start);
          boolean isLineTruncated = layout.getEllipsisCount(line) > 0;
          // This truncation check works well on recent versions of Android (tested on 5.1.1 and
          // 6.0.1) but not on Android 4.4.4. The reason is that getEllipsisCount is buggy on
          // Android 4.4.4. Specifically, it incorrectly returns 0 if an inline view is the
          // first thing to be truncated.
          if (!(isLineTruncated && start >= layout.getLineStart(line) + layout.getEllipsisStart(line))
            || start >= layout.getLineEnd(line)) {
            float placeholderWidth = placeholder.getWidth();
            float placeholderHeight = placeholder.getHeight();
            // Calculate if the direction of the placeholder character is Right-To-Left.
            boolean isRtlChar = layout.isRtlCharAt(start);
            boolean isRtlParagraph = layout.getParagraphDirection(line) == Layout.DIR_RIGHT_TO_LEFT;
            float placeholderLeftPosition;
            // There's a bug on Samsung devices where calling getPrimaryHorizontal on
            // the last offset in the layout will result in an endless loop. Work around
            // this bug by avoiding getPrimaryHorizontal in that case.
            if (start == text.length() - 1) {
              boolean endsWithNewLine =
                text.length() > 0 && text.charAt(layout.getLineEnd(line) - 1) == '\n';
              float lineWidth = endsWithNewLine ? layout.getLineMax(line) : layout.getLineWidth(line);
              placeholderLeftPosition =
                isRtlParagraph
                  // Equivalent to `layout.getLineLeft(line)` but `getLineLeft` returns
                  // incorrect
                  // values when the paragraph is RTL and `setSingleLine(true)`.
                  ? calculatedWidth - lineWidth
                  : layout.getLineRight(line) - placeholderWidth;
            } else {
              // The direction of the paragraph may not be exactly the direction the string is
              // heading
              // in at the
              // position of the placeholder. So, if the direction of the character is the same
              // as the
              // paragraph
              // use primary, secondary otherwise.
              boolean characterAndParagraphDirectionMatch = isRtlParagraph == isRtlChar;
              placeholderLeftPosition =
                characterAndParagraphDirectionMatch
                  ? layout.getPrimaryHorizontal(start)
                  : layout.getSecondaryHorizontal(start);
              if (isRtlParagraph) {
                // Adjust `placeholderLeftPosition` to work around an Android bug.
                // The bug is when the paragraph is RTL and `setSingleLine(true)`, some layout
                // methods such as `getPrimaryHorizontal`, `getSecondaryHorizontal`, and
                // `getLineRight` return incorrect values. Their return values seem to be off
                // by the same number of pixels so subtracting these values cancels out the
                // error.
                //
                // The result is equivalent to bugless versions of
                // `getPrimaryHorizontal`/`getSecondaryHorizontal`.
                placeholderLeftPosition =
                  calculatedWidth - (layout.getLineRight(line) - placeholderLeftPosition);
              }
              if (isRtlChar) {
                placeholderLeftPosition -= placeholderWidth;
              }
            }
            // Vertically align the inline view to the baseline of the line of text.
            float placeholderTopPosition = layout.getLineBaseline(line) - placeholderHeight;
            int attachmentPosition = attachmentIndex * 2;

            // The attachment array returns the positions of each of the attachments as
            attachmentsPositions[attachmentPosition] =
              PixelUtil.toDIPFromPixel(placeholderTopPosition);
            attachmentsPositions[attachmentPosition + 1] =
              PixelUtil.toDIPFromPixel(placeholderLeftPosition);
            attachmentIndex++;
          }
        }
      }

      float widthInSP = PixelUtil.toDIPFromPixel(calculatedWidth);
      float heightInSP = PixelUtil.toDIPFromPixel(calculatedHeight);

      return YogaMeasureOutput.make(widthInSP, heightInSP);
    } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
      throw new RuntimeException(e);
    }
  }
}
