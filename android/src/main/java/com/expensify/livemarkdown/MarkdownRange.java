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

  public MarkdownRange(JSONObject range) {
    try {
      this.type = range.getString("type");
      this.start = range.getInt("start");
      this.length = range.getInt("length");
      this.end = start + length;
      this.depth = range.optInt("depth", 1);
    } catch (JSONException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    MarkdownRange range = (MarkdownRange) obj;
    return range.type.equals(this.type) && range.start == this.start && range.end == this.end && range.length == this.length && range.depth == this.depth;
  }
}

