import { StyleSheet, TextInput, processColor } from 'react-native';

import type { MarkdownStyle } from './MarkdownTextInputViewNativeComponent';
import MarkdownTextInputViewNativeComponent from './MarkdownTextInputViewNativeComponent';
import React from 'react';
import type { TextInputProps } from 'react-native';

function processMarkdownStyle(input: MarkdownStyle) {
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

export interface MarkdownTextInputProps extends TextInputProps {
  markdownStyle: MarkdownStyle; // TODO: support and merge with default Markdown style
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>(
  (props, ref) => {
    const IS_FABRIC = 'nativeFabricUIManager' in global;

    const markdownStyle = React.useMemo(
      () => processMarkdownStyle(props.markdownStyle),
      [props.markdownStyle]
    );

    return (
      <>
        <TextInput {...props} ref={ref} />
        <MarkdownTextInputViewNativeComponent
          style={IS_FABRIC ? styles.farAway : styles.displayNone}
          markdownStyle={markdownStyle}
        />
      </>
    );
  }
);

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

export default MarkdownTextInput;
