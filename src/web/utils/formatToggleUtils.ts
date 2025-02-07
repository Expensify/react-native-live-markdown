type FormatResult = {
  updatedText: string;
  cursorOffset: number;
};

type FormatRule = {
  regex: RegExp;

  /** The group number to extract the matched text, excluding the markdown symbols. */
  matchGroup: number;
};

function getFormatRule(formatCommand: string): FormatRule | null {
  // We reuse regexes from expensify-common with modified flags.
  // If expensify-common updates its regexes, we should update the regex and matchGroup properties here accordingly.
  if (formatCommand === 'formatBold') {
    return {
      regex: /(?<!<[^>]*)(\b_|\B)\*(?![^<]*(?:<\/pre>|<\/code>|<\/a>|<\/video>))((?![\s*])[\s\S]*?[^\s*](?<!\s))\*\B(?![^<]*>)(?![^<]*(<\/pre>|<\/code>|<\/a>|<\/video>))/dg,
      matchGroup: 2,
    };
  }
  if (formatCommand === 'formatItalic') {
    return {
      regex:
        /(<(pre|code|a|mention-user|video)[^>]*>(.*?)<\/\2>)|((\b_+|\b)_((?![\s_])[\s\S]*?[^\s_](?<!\s))_(?![^\W_])(?![^<]*>)(?![^<]*(<\/pre>|<\/code>|<\/a>|<\/mention-user>|<\/video>)))/dg,
      matchGroup: 6,
    };
  }
  return null;
}

function removeFormat(text: string, selectionStart: number, selectionEnd: number, formatCommand: string): FormatResult | null {
  const formatRule = getFormatRule(formatCommand);
  if (!formatRule) {
    return null;
  }

  const matches = Array.from(text.matchAll(formatRule.regex));
  for (let i = 0; i < matches.length && matches[i]; i++) {
    const [matchStart, matchEnd] = matches[i]?.indices?.[formatRule.matchGroup] ?? [];
    const matchedText = matches[i]?.[formatRule.matchGroup];

    if (matchStart != null && matchEnd != null && matchedText) {
      const isExactMatch = matchStart === selectionStart && matchEnd === selectionEnd;
      const isEnclosedMatch = matchStart - 1 === selectionStart && matchEnd + 1 === selectionEnd;

      if (isExactMatch || isEnclosedMatch) {
        const prefix = text.slice(0, matchStart - 1);
        const suffix = text.slice(matchEnd + 1);
        const updatedText = `${prefix}${matchedText}${suffix}`;
        const cursorOffset = selectionStart - matchStart - 1;

        return {updatedText, cursorOffset};
      }
    }
  }

  return null; // Don't remove formatting if no match.
}

export type {FormatResult, FormatRule};
export {getFormatRule, removeFormat};
