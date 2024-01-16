import { StyleSheet, Text, processColor } from 'react-native';

import type { MarkdownStyle } from './MarkdownTextDecoratorViewNativeComponent';
import MarkdownTextDecoratorViewNativeComponent from './MarkdownTextDecoratorViewNativeComponent';
import React from 'react';
import type { TextProps } from 'react-native';

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
    quote: {
      borderColor: 'gray',
      borderWidth: 6,
      marginLeft: 6,
      paddingLeft: 6,
    },
    code: {
      color: 'black',
      backgroundColor: 'lightgray',
    },
    pre: {
      color: 'black',
      backgroundColor: 'lightgray',
    },
    mentionHere: {
      backgroundColor: 'yellow',
    },
    mentionUser: {
      backgroundColor: 'cyan',
    },
  };
}

export type PartialMarkdownStyle = Partial<{
  [K in keyof MarkdownStyle]: Partial<MarkdownStyle[K]>;
}>;

function mergeMarkdownStyleWithDefault(
  input: PartialMarkdownStyle | undefined
): MarkdownStyle {
  const output = makeDefaultMarkdownStyle();

  if (input !== undefined) {
    for (const key in input) {
      if (key in output) {
        Object.assign(
          output[key as keyof MarkdownStyle],
          input[key as keyof MarkdownStyle]
        );
      }
    }
  }

  return output;
}

function processColorsInMarkdownStyle(input: MarkdownStyle): MarkdownStyle {
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

  return output;
}

function processMarkdownStyle(
  input: PartialMarkdownStyle | undefined
): MarkdownStyle {
  return processColorsInMarkdownStyle(mergeMarkdownStyleWithDefault(input));
}

export interface MarkdownTextProps extends TextProps {
  markdownStyle?: PartialMarkdownStyle;
}

const MarkdownText = React.forwardRef<Text, MarkdownTextProps>((props, ref) => {
  const IS_FABRIC = 'nativeFabricUIManager' in global;

  const markdownStyle = React.useMemo(
    () => processMarkdownStyle(props.markdownStyle),
    [props.markdownStyle]
  );

  return (
    <>
      <Text {...props} ref={ref} />
      <MarkdownTextDecoratorViewNativeComponent
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

export default MarkdownText;
