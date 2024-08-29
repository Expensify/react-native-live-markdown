import {Platform} from 'react-native';
import type {MarkdownStyle} from './MarkdownTextInputDecoratorViewNativeComponent';

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
    },
    pre: {
      fontFamily: FONT_FAMILY_MONOSPACE,
      fontSize: 20,
      color: 'black',
      backgroundColor: 'lightgray',
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
    inlineImage: {
      maxWidth: 200,
      maxHeight: 200,
      marginTop: 5,
      marginBottom: 0,
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

function parseStyleToNumber(style: string | null): number {
  return style ? parseInt(style.replace('px', ''), 10) : 0;
}

export type {PartialMarkdownStyle};

export {mergeMarkdownStyleWithDefault, parseStyleToNumber};
