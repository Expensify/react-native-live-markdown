package com.expensify.livemarkdown;

import static com.expensify.livemarkdown.RangeSplitter.splitRangesOnEmojis;


import static org.junit.Assert.assertEquals;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RangeSplitterTest {

  private void testRange(MarkdownRange range, int start, int end, String type){
    assertEquals(start, range.start);
    assertEquals(end, range.end);
    assertEquals(type, range.type);
  }

  @Test
  public void testNoOverlap() {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("strikethrough", 0, 10, 1));
    markdownRanges.add(new MarkdownRange("emoji", 12, 2,1));

    splitRangesOnEmojis(markdownRanges, "strikethrough");

    assertEquals(2, markdownRanges.size());

    testRange(markdownRanges.get(0), 0, 10, "strikethrough");
    testRange(markdownRanges.get(1), 12, 14, "emoji");
  }

  @Test
  public void testOverlapWrongType() {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("strikethrough", 0, 10, 1));
    markdownRanges.add(new MarkdownRange("emoji", 3, 4, 1));

    splitRangesOnEmojis(markdownRanges, "italic");

    assertEquals(2, markdownRanges.size());
    testRange(markdownRanges.get(0), 0, 10, "strikethrough");
    testRange(markdownRanges.get(1), 3, 7, "emoji");
  }

  @Test
  public void testSingleOverlap(){
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("strikethrough", 0, 10, 1));
    markdownRanges.add(new MarkdownRange("emoji", 3, 4, 1)); // This should split the strikethrough range

    splitRangesOnEmojis(markdownRanges, "strikethrough");

    // Sort is needed because ranges may get mixed while splitting
    Collections.sort(markdownRanges, (r1, r2) -> Integer.compare(r1.start, r2.start));

    assertEquals(3, markdownRanges.size());
    testRange(markdownRanges.get(0), 0 ,3, "strikethrough");
    testRange(markdownRanges.get(1), 3 ,7, "emoji");
    testRange(markdownRanges.get(2), 7 ,10, "strikethrough");
  }

  @Test
  public void testMultipleOverlapsMultipleTypes(){
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("italic", 0, 20, 1));
    markdownRanges.add(new MarkdownRange("strikethrough", 2, 12, 1));
    markdownRanges.add(new MarkdownRange("emoji", 3, 1, 1));
    markdownRanges.add(new MarkdownRange("emoji", 8, 2, 1));
    markdownRanges.add(new MarkdownRange("strikethrough", 22, 5, 1));

    splitRangesOnEmojis(markdownRanges, "strikethrough");

    // Sort is needed because ranges may get mixed while splitting
    Collections.sort(markdownRanges, (r1, r2) -> Integer.compare(r1.start, r2.start));

    assertEquals(7, markdownRanges.size());
    testRange(markdownRanges.get(0), 0 ,20, "italic");
    testRange(markdownRanges.get(1), 2 ,3, "strikethrough");
    testRange(markdownRanges.get(2), 3 ,4, "emoji");
    testRange(markdownRanges.get(3), 4 , 8, "strikethrough");
    testRange(markdownRanges.get(4), 8 ,10, "emoji");
    testRange(markdownRanges.get(5), 10 ,14, "strikethrough");
    testRange(markdownRanges.get(6), 22 ,27, "strikethrough");
  }
}
