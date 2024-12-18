package com.expensify.livemarkdown;

import static com.expensify.livemarkdown.RangeSplitter.splitRangesOnEmojis;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RangeSplitterTest {

  @Test
  public void testNoOverlap() {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("strikethrough", 0, 10, 1));
    markdownRanges.add(new MarkdownRange("emoji", 12, 2, 1));

    markdownRanges = splitRangesOnEmojis(markdownRanges, "strikethrough");

    assertEquals(2, markdownRanges.size());
    assertEquals(new MarkdownRange("strikethrough", 0, 10, 1), markdownRanges.get(0));
    assertEquals(new MarkdownRange("emoji", 12, 2, 1), markdownRanges.get(1));
  }

  @Test
  public void testOverlapDifferentType() {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("strikethrough", 0, 10, 1));
    markdownRanges.add(new MarkdownRange("emoji", 3, 4, 1));

    markdownRanges = splitRangesOnEmojis(markdownRanges, "italic");

    assertEquals(2, markdownRanges.size());
    assertEquals(new MarkdownRange("strikethrough", 0, 10, 1), markdownRanges.get(0));
    assertEquals(new MarkdownRange("emoji", 3, 4, 1), markdownRanges.get(1));
  }

  @Test
  public void testSingleOverlap() {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("strikethrough", 0, 10, 1));
    markdownRanges.add(new MarkdownRange("emoji", 3, 4, 1)); // This range should split the strikethrough range

    markdownRanges = splitRangesOnEmojis(markdownRanges, "strikethrough");

    // Sort is needed because ranges may get mixed while splitting
    Collections.sort(markdownRanges, (r1, r2) -> Integer.compare(r1.getStart(), r2.getStart()));

    assertEquals(3, markdownRanges.size());
    assertEquals(new MarkdownRange("strikethrough", 0, 3, 1), markdownRanges.get(0));
    assertEquals(new MarkdownRange("emoji", 3, 4, 1), markdownRanges.get(1));
    assertEquals(new MarkdownRange("strikethrough", 7, 3, 1), markdownRanges.get(2));
  }

  @Test
  public void testMultipleOverlapsMultipleTypes() {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    markdownRanges.add(new MarkdownRange("italic", 0, 20, 1));
    markdownRanges.add(new MarkdownRange("strikethrough", 2, 12, 1));
    markdownRanges.add(new MarkdownRange("emoji", 3, 1, 1));
    markdownRanges.add(new MarkdownRange("emoji", 8, 2, 1));
    markdownRanges.add(new MarkdownRange("strikethrough", 22, 5, 1));

    markdownRanges = splitRangesOnEmojis(markdownRanges, "strikethrough");

    // Sort is needed because ranges may get mixed while splitting
    Collections.sort(markdownRanges, (r1, r2) -> Integer.compare(r1.getStart(), r2.getStart()));

    assertEquals(7, markdownRanges.size());
    assertEquals(new MarkdownRange("italic", 0, 20, 1), markdownRanges.get(0));
    assertEquals(new MarkdownRange("strikethrough", 2, 1, 1), markdownRanges.get(1));
    assertEquals(new MarkdownRange("emoji", 3, 1, 1), markdownRanges.get(2));
    assertEquals(new MarkdownRange("strikethrough", 4, 4, 1), markdownRanges.get(3));
    assertEquals(new MarkdownRange("emoji", 8, 2, 1), markdownRanges.get(4));
    assertEquals(new MarkdownRange("strikethrough", 10, 4, 1), markdownRanges.get(5));
    assertEquals(new MarkdownRange("strikethrough", 22, 5, 1), markdownRanges.get(6));
  }
}
