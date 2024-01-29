import React from 'react';
import {Platform, StyleSheet, TextInput, processColor} from 'react-native';
import type {TextInputProps} from 'react-native';

import type * as MarkdownTextInputDecoractorView from './MarkdownTextInputDecoratorViewNativeComponent';
import MarkdownTextInputDecoratorViewNativeComponent from './MarkdownTextInputDecoratorViewNativeComponent';

type MarkdownStyle = MarkdownTextInputDecoractorView.MarkdownStyle;

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
    blockquote: {
      borderColor: 'gray',
      borderWidth: 6,
      marginLeft: 6,
      paddingLeft: 6,
    },
    code: {
      fontFamily: FONT_FAMILY_MONOSPACE,
      color: 'black',
      backgroundColor: 'lightgray',
    },
    pre: {
      fontFamily: FONT_FAMILY_MONOSPACE,
      color: 'black',
      backgroundColor: 'lightgray',
    },
    mentionHere: {
      backgroundColor: 'lime',
      color: 'green',
    },
    mentionUser: {
      backgroundColor: 'cyan',
      color: 'blue',
    },
  };
}

type PartialMarkdownStyle = Partial<{
  [K in keyof MarkdownStyle]: Partial<MarkdownStyle[K]>;
}>;

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

function processColorsInMarkdownStyle(input: MarkdownStyle): MarkdownStyle {
  const output = JSON.parse(JSON.stringify(input));

  Object.keys(output).forEach((key) => {
    const obj = output[key];
    Object.keys(obj).forEach((prop) => {
      // TODO: use ReactNativeStyleAttributes from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
      if (!(prop === 'color' || prop.endsWith('Color'))) {
        return;
      }
      obj[prop] = processColor(obj[prop]);
    });
  });

  return output as MarkdownStyle;
}

function processMarkdownStyle(input: PartialMarkdownStyle | undefined): MarkdownStyle {
  return processColorsInMarkdownStyle(mergeMarkdownStyleWithDefault(input));
}

interface MarkdownTextInputProps extends TextInputProps {
  markdownStyle?: PartialMarkdownStyle;
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>((props, ref) => {
  const IS_FABRIC = 'nativeFabricUIManager' in global;

  const markdownStyle = React.useMemo(() => processMarkdownStyle(props.markdownStyle), [props.markdownStyle]);

  return (
    <>
      <TextInput
        {...props}
        ref={ref}
      />
      <MarkdownTextInputDecoratorViewNativeComponent
        style={IS_FABRIC ? styles.farAway : styles.displayNone}
        markdownStyle={markdownStyle}
      />
    </>
  );
});

const styles = StyleSheet.create({
  displayNone: {
    display: 'none',
  },
  farAway: {
    position: 'absolute',
    top: 1e8,
    left: 1e8,
  },
});

export type {PartialMarkdownStyle as MarkdownStyle, MarkdownTextInputProps};

export default MarkdownTextInput;
