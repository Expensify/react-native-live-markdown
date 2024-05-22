import {Platform} from 'react-native';
import type * as MarkdownTextInputDecoractorView from './MarkdownTextInputDecoratorViewNativeComponent';

type MarkdownStyle = MarkdownTextInputDecoractorView.MarkdownStyle;

type PartialMarkdownStyle = Partial<{
  [K in keyof MarkdownStyle]: Partial<MarkdownStyle[K]>;
}>;

const FONT_FAMILY_MONOSPACE = Platform.select({
  ios: 'Courier',
  default: 'monospace',
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
      padding: 2,
      borderStyle: 'solid',
    },
    mentionHere: {
      color: 'green',
      backgroundColor: 'lime',
    },
    mentionUser: {
      color: 'blue',
      backgroundColor: 'cyan',
    },
    mentionReport: {
      color: 'red',
      backgroundColor: 'pink',
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
      Object.assign(output[key as keyof MarkdownStyle], input[key as keyof MarkdownStyle]);
    });
  }

  return output;
}

function getStyleNumericValue(style: string) {
  return parseInt(style.replace('px', ''), 8);
}

export type {PartialMarkdownStyle};

export {mergeMarkdownStyleWithDefault, getStyleNumericValue};
