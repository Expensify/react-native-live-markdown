package com.expensify.livemarkdown;

/*
 * Enables us to distinguish between spans that were added by Live Markdown and spans that were
 * added by something else. All spans that Live Markdown adds should implement this interface.
 */
public interface MarkdownSpan {}
