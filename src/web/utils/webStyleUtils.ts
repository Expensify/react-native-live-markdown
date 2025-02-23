/* eslint-disable @typescript-eslint/no-explicit-any */
import type {TextStyle} from 'react-native';
import type {MarkdownStyle} from '../../MarkdownTextInputDecoratorViewNativeComponent';
import {mergeMarkdownStyleWithDefault, parseStringWithUnitToNumber} from '../../styleUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';
import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';

let createReactDOMStyle: (style: any) => any;
try {
  createReactDOMStyle =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('react-native-web/dist/exports/StyleSheet/compiler/createReactDOMStyle').default;
} catch (e) {
  throw new Error('[react-native-live-markdown] Function `createReactDOMStyle` from react-native-web not found. Please make sure that you are using React Native Web 0.18 or newer.');
}

let preprocessStyle: (style: any) => any;
try {
  preprocessStyle =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('react-native-web/dist/exports/StyleSheet/preprocess').default;
} catch (e) {
  throw new Error('[react-native-live-markdown] Function `preprocessStyle` from react-native-web not found.');
}

let dangerousStyleValue: (name: string, value: any, isCustomProperty: boolean) => any;
try {
  dangerousStyleValue =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('react-native-web/dist/modules/setValueForStyles/dangerousStyleValue').default;
} catch (e) {
  throw new Error('[react-native-live-markdown] Function `dangerousStyleValue` from react-native-web not found.');
}

function processUnitsInMarkdownStyle(input: MarkdownStyle): MarkdownStyle {
  const output = JSON.parse(JSON.stringify(input));

  Object.keys(output).forEach((key) => {
    const obj = output[key];
    Object.keys(obj).forEach((prop) => {
      obj[prop] = dangerousStyleValue(prop, obj[prop], false);
    });
  });

  return output as MarkdownStyle;
}

function processMarkdownStyle(input: MarkdownStyle | undefined): MarkdownStyle {
  return processUnitsInMarkdownStyle(mergeMarkdownStyleWithDefault(input));
}

function parseToReactDOMStyle(style: TextStyle): any {
  return createReactDOMStyle(preprocessStyle(style));
}

const CUSTOM_WEB_STYLES_ID = 'LiveMarkdownCustomWebStyles';

function* generateUniqueId() {
  let idCounter = 0;
  while (true) {
    yield `live-markdown-input-${idCounter++}`;
  }
}

const idGenerator = generateUniqueId();

function configureCustomWebStylesheet(): CSSStyleSheet | null {
  if (document.getElementById(CUSTOM_WEB_STYLES_ID) !== null) {
    return null;
  }

  const customStyleTag = document.createElement('style');
  customStyleTag.id = CUSTOM_WEB_STYLES_ID;
  document.head.appendChild(customStyleTag);

  const sheet = new CSSStyleSheet();
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  return sheet;
}

function handleCustomStyles(target: MarkdownTextInputElement, markdownStyle: PartialMarkdownStyle) {
  const styleTag = document.getElementById(CUSTOM_WEB_STYLES_ID) as HTMLStyleElement;
  if (!styleTag) {
    return;
  }
  generateCodeBlocksRules(target, markdownStyle);
}

type Rule = {selector: string; properties: Record<string, string>};

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

function property(e: HTMLElement, p: string) {
  return parseFloat(window.getComputedStyle(e).getPropertyValue(p).replace('px', ''));
}

function generateCodeBlocksRules(target: MarkdownTextInputElement, markdownStyle: PartialMarkdownStyle) {
  const line = target.querySelector('*[data-type="line"]:has(> *[data-type="pre"]) > span:first-child');
  if (!line) {
    return;
  }

  const lineHeight = line.getBoundingClientRect()?.height;
  const preStyles = markdownStyle.pre;
  const padding = preStyles?.padding ?? 2;
  const horizontalPadding = parseStringWithUnitToNumber(preStyles?.paddingHorizontal ?? padding);
  const verticalPadding = parseStringWithUnitToNumber(preStyles?.paddingVertical ?? padding);

  const contentWidth =
    target.offsetWidth - property(target, 'border-left-width') - property(target, 'border-left-width') - property(target, 'padding-left') - property(target, 'padding-right');

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

  const preBlocks = [...document.querySelectorAll('*[data-type="pre"]')];
  for (let i = 0; i < preBlocks.length; i++) {
    const preBlock = preBlocks[i] as HTMLElement;
    const preBlockWidth = preBlock.getBoundingClientRect().width;
    const preLineHeight = preBlock.parentElement?.getBoundingClientRect().height ?? 0;

    // Handle a case where something is written immediately after closing backticks without line-break
    const textElementHeight = preBlock.nextElementSibling?.nextElementSibling?.getBoundingClientRect().height ?? 0;

    rules.push({
      selector: `.${target.uniqueId} *:nth-child(${i + 1} of [data-type='line']:has(> *[data-type='pre'])) > *[data-type='pre']::before`,
      properties: {
        height: `${preLineHeight - 2 * lineHeight - textElementHeight}px`,
        'min-width': `min(calc(100% + 2.5px), ${preBlockWidth + horizontalPadding * 2 + 1}px)`,
        'max-width': `min(${preBlockWidth + horizontalPadding * 2 + 2}px, ${contentWidth}px)`,
      },
    });
  }

  if (target.styleSheet) {
    addStylesheetRules(rules, target.styleSheet);
  }
}

export {parseToReactDOMStyle, processMarkdownStyle, configureCustomWebStylesheet, idGenerator, handleCustomStyles};
