import { StyleSheet, TextInput } from 'react-native';

import MarkdownTextInputViewNativeComponent from './MarkdownTextInputViewNativeComponent';
import React from 'react';
import type { TextInputProps } from 'react-native';

export interface MarkdownTextInputProps extends TextInputProps {
  // nothing here
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>(
  (props, ref) => {
    return (
      <>
        <TextInput {...props} ref={ref} />
        <MarkdownTextInputViewNativeComponent style={styles.displayNone} />
      </>
    );
  }
);

const styles = StyleSheet.create({
  displayNone: {
    display: 'none',
  },
});

export default MarkdownTextInput;
