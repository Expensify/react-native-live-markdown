import { StyleSheet, TextInput } from 'react-native';

import MarkdownTextInputViewNativeComponent from './MarkdownTextInputViewNativeComponent';
import React from 'react';
import type { TextInputProps } from 'react-native';
import { processMarkdownStyle } from './MarkdownStyle';
import type { MarkdownStyle } from './MarkdownStyle';

export interface MarkdownTextInputProps extends TextInputProps {
  markdownStyle?: MarkdownStyle;
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>(
  (props, ref) => {
    const IS_FABRIC = 'nativeFabricUIManager' in global;
    return (
      <>
        <TextInput {...props} ref={ref} />
        <MarkdownTextInputViewNativeComponent
          style={IS_FABRIC ? styles.farAway : styles.displayNone}
          markdownStyle={processMarkdownStyle(props.markdownStyle)}
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
