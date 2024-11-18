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

function deepEqualMarkdownStyles(markdownStyle1: MarkdownStyle, markdownStyle2: PartialMarkdownStyle) {
  const keys1 = Object.keys(markdownStyle1) as Array<keyof MarkdownStyle>;
  const keys2 = Object.keys(markdownStyle2) as Array<keyof MarkdownStyle>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  let areStylesEqual = true;
  keys1.forEach((key) => {
    // Because each of the markdown objects types are not overlapping, we have to case to Record<string, string | number>
    const singleStyle1 = markdownStyle1[key] as Record<string, string | number>;
    const singleStyle2 = markdownStyle2[key] as Record<string, string | number>;
    const singleStyleKeys1 = Object.keys(singleStyle1);
    const singleStyleKeys2 = Object.keys(singleStyle2);
    if (singleStyleKeys1.length !== singleStyleKeys2.length) {
      areStylesEqual = false;
      return;
    }
    singleStyleKeys1.forEach((styleKey) => {
      if (!(styleKey in singleStyle1) || !(styleKey in singleStyle2)) {
        areStylesEqual = false;
        return;
      }
      if (singleStyle1[styleKey] !== singleStyle2[styleKey]) {
        areStylesEqual = false;
      }
    });
  });

  return areStylesEqual;
}

function parseStringWithUnitToNumber(value: string | null): number {
  return value ? parseInt(value.replace('px', ''), 10) : 0;
}

export type {PartialMarkdownStyle};

export {mergeMarkdownStyleWithDefault, parseStringWithUnitToNumber, deepEqualMarkdownStyles};
