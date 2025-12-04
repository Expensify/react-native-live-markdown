import {Platform} from 'react-native';
import type {MarkdownStyle} from './MarkdownTextInputDecoratorViewNativeComponent';

type PartialMarkdownStyle = Partial<{
  [K in keyof MarkdownStyle]: Partial<MarkdownStyle[K]>;
}>;

const FONT_FAMILY_MONOSPACE = Platform.select({
  ios: 'Courier',
  default: 'monospace',
});

const FONT_FAMILY_EMOJI = Platform.select({
  ios: 'System',
  android: 'Noto Color Emoji',
  default: 'System, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji',
});

function makeDefaultMarkdownStyle(): MarkdownStyle {
  return {
    syntax: {
      color: 'gray',
    },
    link: {
      color: 'blue',
    },
    h1: {
      fontSize: 25,
    },
    emoji: {
      fontSize: 20,
      fontFamily: FONT_FAMILY_EMOJI,
    },
    blockquote: {
      borderColor: 'gray',
      borderWidth: 6,
      marginLeft: 6,
      paddingLeft: 6,
    },
    code: {
      fontFamily: FONT_FAMILY_MONOSPACE,
      fontSize: 20,
      color: 'black',
      backgroundColor: 'lightgray',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 4,
      borderStyle: 'solid',
      padding: 0,
    },
    pre: {
      fontFamily: FONT_FAMILY_MONOSPACE,
      fontSize: 20,
      color: 'black',
      backgroundColor: 'lightgray',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 4,
      borderStyle: 'solid',
      padding: 2,
    },
    mentionHere: {
      color: 'green',
      backgroundColor: 'lime',
      borderRadius: 5,
    },
    mentionUser: {
      color: 'blue',
      backgroundColor: 'cyan',
      borderRadius: 5,
    },
    mentionReport: {
      color: 'red',
      backgroundColor: 'pink',
      borderRadius: 5,
    },
    inlineImage: {
      minWidth: 50,
      minHeight: 50,
      maxWidth: 150,
      maxHeight: 150,
      marginTop: 5,
      marginBottom: 0,
      borderRadius: 5,
    },
    loadingIndicator: {
      primaryColor: 'gray',
      secondaryColor: 'lightgray',
    },
  };
}

function mergeMarkdownStyleWithDefault(input: PartialMarkdownStyle | undefined): MarkdownStyle {
  const output = makeDefaultMarkdownStyle();

  if (input !== undefined) {
    Object.keys(input).forEach((key) => {
      if (!(key in output)) {
        return;
      }

      const outputValue = output[key as keyof MarkdownStyle];
      if (outputValue) {
        Object.assign(outputValue, input[key as keyof MarkdownStyle]);
      }
    });
  }

  return output;
}

function parseStringWithUnitToNumber(value: string | number | null): number {
  if (typeof value === 'number') {
    return value;
  }
  return value ? parseInt(value.replace('px', ''), 10) : 0;
}

export type {PartialMarkdownStyle};

export {mergeMarkdownStyleWithDefault, parseStringWithUnitToNumber};
