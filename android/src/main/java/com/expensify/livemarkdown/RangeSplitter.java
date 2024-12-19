package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.systrace.Systrace;

import java.util.ArrayList;
import java.util.List;

public class RangeSplitter {
  public static ArrayList<MarkdownRange> splitRangesOnEmojis(@NonNull List<MarkdownRange> markdownRanges, @NonNull String type) {
    ArrayList<MarkdownRange> emojiRanges = new ArrayList<>();
    ArrayList<MarkdownRange> oldRanges = new ArrayList<>(markdownRanges);
    ArrayList<MarkdownRange> newRanges = new ArrayList<>();

    try {
      Systrace.beginSection(0, "splitRangesOnEmojis");
      for (MarkdownRange range : oldRanges) {
        if (range.getType().equals("emoji")) {
          emojiRanges.add(range);
        }
      }

      int i = 0;
      int j = 0;
      while (i < oldRanges.size()) {
        MarkdownRange currentRange = oldRanges.get(i);
        if (!currentRange.getType().equals(type)) {
          newRanges.add(currentRange);
          i += 1;
          continue;
        }

        // Iterate through all emoji ranges before the end of the current range, splitting the current range at each intersection.
        while (j < emojiRanges.size()) {
          MarkdownRange emojiRange = emojiRanges.get(j);
          if (emojiRange.getStart() > currentRange.getEnd()) {
            break;
          }

          int currentStart = currentRange.getStart();
          int currentEnd = currentRange.getEnd();
          int emojiStart = emojiRange.getStart();
          int emojiEnd = emojiRange.getEnd();
          if (emojiStart >= currentStart && emojiEnd <= currentEnd) { // Intersection
            MarkdownRange newRange = new MarkdownRange(currentRange.getType(), currentStart, emojiStart - currentStart, currentRange.getDepth());
            currentRange = new MarkdownRange(currentRange.getType(), emojiEnd, currentEnd - emojiEnd, currentRange.getDepth());

            if (newRange.getLength() > 0) {
              newRanges.add(newRange);
            }
          }
          j += 1;
        }

        if (currentRange.getLength() > 0) {
          newRanges.add(currentRange);
        }
        i += 1;
      }
    } finally {
      Systrace.endSection(0);
    }

    return newRanges;
  }
}
