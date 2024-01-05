import { processColor } from 'react-native';
import type { ColorValue, ProcessedColorValue } from 'react-native';

interface GenericMarkdownStyle<
  ColorValueType extends ColorValue | ProcessedColorValue | null
> {
  syntax?: {
    color?: ColorValueType;
  };
  link?: {
    color?: ColorValueType;
  };
  h1?: {
    fontSize?: number;
  };
  quote?: {
    borderColor?: ColorValueType;
    borderWidth?: number;
    marginLeft?: number;
    paddingLeft?: number;
  };
  code?: {
    color?: ColorValueType;
    backgroundColor?: ColorValueType;
  };
  pre?: {
    color?: ColorValueType;
    backgroundColor?: ColorValueType;
  };
  mentionHere?: {
    backgroundColor?: ColorValueType;
  };
  mentionUser?: {
    backgroundColor?: ColorValueType;
  };
}

export interface MarkdownStyle extends GenericMarkdownStyle<ColorValue> {} // before calling processColor

export interface ProcessedMarkdownStyle
  extends GenericMarkdownStyle<ProcessedColorValue | null> {} // after calling processColor

export function processMarkdownStyle(input: MarkdownStyle) {
  const output = JSON.parse(JSON.stringify(input));

  for (const key in output) {
    const obj = output[key];
    for (const prop in obj) {
      // TODO: use ReactNativeStyleAttributes from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
      if (prop === 'color' || prop.endsWith('Color')) {
        obj[prop] = processColor(obj[prop]);
      }
    }
  }

  return output as ProcessedMarkdownStyle;
}
