package com.expensify.livemarkdown;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.util.RNLog;
import com.facebook.soloader.SoLoader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class MarkdownParser {
  static {
    SoLoader.loadLibrary("livemarkdown");
  }

  private final @NonNull ReactContext mReactContext;
  private String mPrevText;
  private int mPrevParserId;
  private List<MarkdownRange> mPrevMarkdownRanges;

  public MarkdownParser(@NonNull ReactContext reactContext) {
    mReactContext = reactContext;
  }

  private native String nativeParse(String text, int parserId);

  private void splitRangesOnEmojis(List<MarkdownRange> markdownRanges, String type) {
    List<MarkdownRange> emojiRanges = new ArrayList<>();
    for (MarkdownRange range : markdownRanges) {
      if (range.getType().equals("emoji")) {
        emojiRanges.add(range);
      }
    }

    int i = 0;
    int j = 0;
    while (i < markdownRanges.size() && j < emojiRanges.size()) {
      MarkdownRange currentRange = markdownRanges.get(i);
      MarkdownRange emojiRange = emojiRanges.get(j);

      if (!currentRange.getType().equals(type) || currentRange.getEnd() < emojiRange.getStart()) {
        i += 1;
        continue;
      } else if (emojiRange.getStart() >= currentRange.getStart() && emojiRange.getEnd() <= currentRange.getEnd()) {
        // Split range
        MarkdownRange startRange = new MarkdownRange(currentRange.getType(), currentRange.getStart(), emojiRange.getStart() - currentRange.getStart(), currentRange.getDepth());
        MarkdownRange endRange = new MarkdownRange(currentRange.getType(), emojiRange.getEnd(), currentRange.getEnd() - emojiRange.getEnd(), currentRange.getDepth());

        markdownRanges.add(i + 1, startRange);
        markdownRanges.add(i + 2, endRange);
        markdownRanges.remove(i);
        i = i + 1;
      }
      j += 1;
    }
  }


  private List<MarkdownRange> parseRanges(String rangesJSON, String innerText) {
    List<MarkdownRange> markdownRanges = new ArrayList<>();
    try {
      JSONArray ranges = new JSONArray(rangesJSON);
      for (int i = 0; i < ranges.length(); i++) {
        JSONObject range = ranges.getJSONObject(i);
        String type = range.getString("type");
        int start = range.getInt("start");
        int length = range.getInt("length");
        int depth = range.optInt("depth", 1);

        MarkdownRange markdownRange = new MarkdownRange(type, start, length, depth);
        if (markdownRange.getLength() == 0 || markdownRange.getEnd() > innerText.length()) {
          continue;
        }
        markdownRanges.add(markdownRange);
      }
    } catch (JSONException e) {
      return Collections.emptyList();
    }
    splitRangesOnEmojis(markdownRanges, "italic");
    splitRangesOnEmojis(markdownRanges, "strikethrough");
    return markdownRanges;
  }

  public synchronized List<MarkdownRange> parse(String text, int parserId) {
    if (text.equals(mPrevText) && parserId == mPrevParserId) {
      return mPrevMarkdownRanges;
    }

    String json;
    try {
      json = nativeParse(text, parserId);
    } catch (Exception e) {
      // Skip formatting, runGuarded will show the error in LogBox
      mPrevText = text;
      mPrevParserId = parserId;
      mPrevMarkdownRanges = Collections.emptyList();
      return mPrevMarkdownRanges;
    }

    List<MarkdownRange> markdownRanges = parseRanges(json, text);

    mPrevText = text;
    mPrevParserId = parserId;
    mPrevMarkdownRanges = markdownRanges;
    return mPrevMarkdownRanges;
  }
}
