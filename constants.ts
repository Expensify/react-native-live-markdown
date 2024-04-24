const LOCAL_URL = 'http://localhost:19006/';

const EXAMPLE_CONTENT_STYLES = [
  {content: 'Hello', style: null},
  {content: 'world', style: 'font-weight: bold;'},
  {content: 'https://expensify.com', style: 'color: blue; text-decoration: underline;'},
  {content: '# Lorem ipsum', style: 'font-size: 25px; font-weight: bold;'},
  {content: '`foo`', style: 'font-family: monospace; font-size: 20px; color: black; background-color: lightgray;'},
  {content: '@here', style: 'color: green; background-color: lime;'},
  {content: '@someone@swmansion.com', style: 'color: blue; background-color: cyan;'},
];

type MarkdownStyleDefiniton = {wrapContent?: (content: string) => string; style: string};

const MARKDOWN_STYLE_DEFINITIONS = {
  bold: {wrapContent: (content: string) => `*${content}*`, style: 'font-weight: bold;'},
  link: {wrapContent: (content: string) => `https://${content}.com`, style: 'color: blue; text-decoration: underline;'},
  title: {wrapContent: (content: string) => `# ${content}`, style: 'font-size: 25px; font-weight: bold;'},
  code: {wrapContent: (content: string) => `\`${content}\``, style: 'font-family: monospace; font-size: 20px; color: black; background-color: lightgray;'},
  codeBlock: {wrapContent: (content: string) => `\`\`\`\n${content}\n\`\`\``, style: 'font-family: monospace; font-size: 20px; color: black; background-color: lightgray;'},
  here: {wrapContent: (content: string) => `@${content}`, style: 'color: green; background-color: lime;'},
  mentionUser: {wrapContent: (content: string) => `@${content}@swmansion.com`, style: 'color: blue; background-color: cyan;'},
  blockquote: {
    wrapContent: (content: string) => `> ${content}`,
    style: 'border-color: gray; border-width: 6px; margin-left: 6px; padding-left: 6px; border-left-style: solid; display: inline-block; max-width: 100%; box-sizing: border-box;',
  },
} as const satisfies Record<string, MarkdownStyleDefiniton>;

const EXAMPLE_CONTENT = Object.entries(MARKDOWN_STYLE_DEFINITIONS)
  .map(([styleName, style]) => style.wrapContent(styleName))
  .join('\n');

const INPUT_ID = 'MarkdownInput_Example';
const INPUT_HISTORY_DEBOUNCE_TIME_MS = 150;

export {LOCAL_URL, EXAMPLE_CONTENT, EXAMPLE_CONTENT_STYLES, MARKDOWN_STYLE_DEFINITIONS, INPUT_ID, INPUT_HISTORY_DEBOUNCE_TIME_MS};
