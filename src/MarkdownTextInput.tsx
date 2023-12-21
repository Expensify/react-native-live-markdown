import { StyleSheet, TextInput } from 'react-native';

import MarkdownTextInputViewNativeComponent from './MarkdownTextInputViewNativeComponent';
import React from 'react';
import type { TextInputProps } from 'react-native';

export interface MarkdownTextInputProps extends TextInputProps {
  // nothing here
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>(
  (props, ref) => {
    // @ts-ignore TODO - add global to type augumentation
    const IS_FABRIC = 'nativeFabricUIManager' in global;
    return (
      <>
        <TextInput {...props} ref={ref} />
        <MarkdownTextInputViewNativeComponent
          style={IS_FABRIC ? styles.farAway : styles.displayNone}
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
