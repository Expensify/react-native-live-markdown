package com.expensify.livemarkdown;

import java.util.ArrayList;
import java.util.List;

public class RangeSplitter {
  public static void splitRangesOnEmojis(List<MarkdownRange> markdownRanges, String type) {
    List<MarkdownRange> emojiRanges = new ArrayList<>();
    List<MarkdownRange> oldRanges = new ArrayList<>(markdownRanges);
    markdownRanges.clear();
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
        markdownRanges.add(currentRange);
        i += 1;
        continue;
      }

      // Split range
      while (j < emojiRanges.size()) {
        MarkdownRange emojiRange = emojiRanges.get(j);
        if (emojiRange.getStart() > currentRange.getEnd()) break;

        if (emojiRange.getStart() >= currentRange.getStart() && emojiRange.getEnd() <= currentRange.getEnd()) {
          MarkdownRange newRange = new MarkdownRange(currentRange.getType(), currentRange.getStart(), emojiRange.getStart() - currentRange.getStart(), currentRange.getDepth());
          currentRange = new MarkdownRange(currentRange.getType(), emojiRange.getEnd(), currentRange.getEnd() - emojiRange.getEnd(), currentRange.getDepth());

          markdownRanges.add(newRange);
        }
        j += 1;
      }
      markdownRanges.add(currentRange);
      i += 1;
    }
  }
}
