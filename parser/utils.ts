const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x60;': '`',
  '&#32': ' ',
};

const reEscapedHtml = /&(?:amp|lt|gt|quot|#(x27|x60|32));/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

/**
 * Converts the HTML entities, like `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;`, in `string` to their corresponding characters.
 * Source: https://github.com/lodash/lodash/blob/main/src/unescape.ts
 */
function unescapeText(string: string): string {
  return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity as keyof typeof htmlUnescapes] || ' ') : string || '';
}

// eslint-disable-next-line import/prefer-default-export
export {unescapeText};
