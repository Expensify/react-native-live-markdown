import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import {parseStringWithUnitToNumber} from '../../styleUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';

type Rule = {selector: string; properties: Record<string, string>};

/**
 * Applies CSS rules for code block styling, including custom styles specified in the markdownStyle object.
 * Required by `pre` and `code` markdown elements, since it handles styling, resizing, and positioning of syntax characters.
 */
function handleCustomStyles(target: MarkdownTextInputElement, markdownStyle: PartialMarkdownStyle) {
  if (!target.styleSheet) {
    return;
  }
  const rules = generateCodeBlocksRules(target, markdownStyle);
  addStylesheetRules(rules, target.styleSheet);
}

function addStylesheetRules(rules: Rule[], sheet: CSSStyleSheet) {
  let newSheet = '';
  rules.forEach((rule) => {
    const {selector, properties} = rule;
    let propertiesStr = '';

    Object.keys(properties).forEach((prop) => {
      const value = properties[prop];
      propertiesStr += `${prop}: ${value};\n`;
    });

    newSheet += `${selector}{${propertiesStr}} `;
  });
  sheet.replaceSync(newSheet);
}

function getPropertyValue(e: HTMLElement, p: string) {
  return parseFloat(window.getComputedStyle(e).getPropertyValue(p).replace('px', ''));
}

function generateCodeBlocksRules(target: MarkdownTextInputElement, markdownStyle: PartialMarkdownStyle): Rule[] {
  const line = target.querySelector('*[data-type="line"]:has(> *[data-type="pre"]) > span:first-child');
  if (!line) {
    return [];
  }

  const lineHeight = line.getBoundingClientRect()?.height;
  const preStyles = markdownStyle.pre;
  const padding = preStyles?.padding ?? 2;
  const horizontalPadding = parseStringWithUnitToNumber(preStyles?.paddingHorizontal ?? padding);
  const verticalPadding = parseStringWithUnitToNumber(preStyles?.paddingVertical ?? padding);

  const contentWidth =
    target.offsetWidth -
    getPropertyValue(target, 'border-left-width') -
    getPropertyValue(target, 'border-left-width') -
    getPropertyValue(target, 'padding-left') -
    getPropertyValue(target, 'padding-right');

  // General pre block styles
  const rules: Rule[] = [
    {
      selector: `.${target.uniqueId} *[data-type='pre']::before`,
      properties: {
        top: `${Math.floor(lineHeight)}px`,
        padding: `${verticalPadding.toString()}px ${horizontalPadding.toString()}px`,
        'background-color': `${(preStyles?.backgroundColor as string) ?? 'lightgray'}`,
        'border-radius': `${preStyles?.borderRadius?.toString() ?? '4px'}`,
        'border-color': `${preStyles?.borderColor ?? 'grey'}`,
      },
    },
    {
      selector: `.${target.uniqueId} *[data-type='line'] *[data-type='syntax']:has(+ *[data-type='pre'])`,
      properties: {
        transform: `translate(-${horizontalPadding}px, -${verticalPadding}px)`,
      },
    },
    {
      selector: `.${target.uniqueId} *[data-type='line'] *[data-type='pre'] + *[data-type='syntax']`,
      properties: {
        transform: `translate(-${horizontalPadding}px, ${verticalPadding}px)`,
      },
    },
    {
      selector: `.${target.uniqueId} *[data-type='line'] *[data-type='pre'] + *[data-type='syntax'] + *[data-type='text']`,
      properties: {
        transform: `translate(-${horizontalPadding}px, ${verticalPadding}px)`,
      },
    },
    {
      selector: `.${target.uniqueId} *[data-type='line']:has(> *[data-type='pre']) > *:nth-child(n+4)`,
      properties: {
        display: 'inline-block',
        transform: `translate(-${horizontalPadding}px, ${verticalPadding}px)`,
      },
    },
  ];

  // Generate style rules for all existing pre blocks
  const preBlocks = [...target.querySelectorAll('*[data-type="pre"]')];
  for (let i = 0; i < preBlocks.length; i++) {
    const preBlock = preBlocks[i] as HTMLElement;
    const preBlockWidth = preBlock.getBoundingClientRect().width;
    const preLineHeight = preBlock.parentElement?.getBoundingClientRect().height ?? 0;

    // Handle a case where something is written immediately after closing backticks without line-break
    const textElementHeight = preBlock.nextElementSibling?.nextElementSibling?.getBoundingClientRect().height ?? 0;

    rules.push({
      // This selector targets specific pre block
      selector: `.${target.uniqueId} *:nth-child(${i + 1} of [data-type='line']:has(> *[data-type='pre'])) > *[data-type='pre']::before`,
      properties: {
        height: `${preLineHeight - 2 * lineHeight - textElementHeight}px`,
        'min-width': `min(calc(100% + 2.5px), ${preBlockWidth + horizontalPadding * 2 + 1}px)`,
        'max-width': `min(${preBlockWidth + horizontalPadding * 2 + 2}px, ${contentWidth}px)`,
      },
    });
  }

  return rules;
}

// eslint-disable-next-line import/prefer-default-export
export {handleCustomStyles};
