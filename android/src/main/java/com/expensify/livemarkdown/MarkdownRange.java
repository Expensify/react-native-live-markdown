package com.expensify.livemarkdown;

import org.json.JSONException;
import org.json.JSONObject;

public class MarkdownRange {
  public final String type;
  public final int start;
  public final int end;
  public final int length;
  public final int depth;

  public MarkdownRange(String type, int start, int length, int depth) {
    this.type = type;
    this.start = start;
    this.length = length;
    this.end = start + length;
    this.depth = depth;
  }
}

