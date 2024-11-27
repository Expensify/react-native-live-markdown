package com.expensify.livemarkdown;

import java.util.ArrayList;
import java.util.List;

public class RangeSplitter {
  public static void splitRangesOnEmojis(List<MarkdownRange> markdownRanges, String type) {
    List<MarkdownRange> emojiRanges = new ArrayList<>();
    List<MarkdownRange> oldRanges = new ArrayList<>(markdownRanges);
    markdownRanges.clear();
    for (MarkdownRange range : oldRanges) {
      if (range.type.equals("emoji")) {
        emojiRanges.add(range);
      }
    }

    int i = 0;
    int j = 0;
    while (i < oldRanges.size()) {
      MarkdownRange currentRange = oldRanges.get(i);
      if (!currentRange.type.equals(type)) {
        markdownRanges.add(currentRange);
        i += 1;
        continue;
      }

      // Split range
      while(j < emojiRanges.size()){
        MarkdownRange emojiRange = emojiRanges.get(j);
        if(emojiRange.start > currentRange.end) break;

        if (emojiRange.start >= currentRange.start && emojiRange.end <= currentRange.end) {
          MarkdownRange newRange = new MarkdownRange(currentRange.type, currentRange.start, emojiRange.start - currentRange.start, currentRange.depth);
          currentRange = new MarkdownRange(currentRange.type, emojiRange.end, currentRange.end - emojiRange.end, currentRange.depth);

          markdownRanges.add(newRange);
        }
        j += 1;
      }
      markdownRanges.add(currentRange);
      i += 1;
    }
  }
}
