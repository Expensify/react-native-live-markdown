import { TextInput } from 'react-native';

import React from 'react';
import type { TextInputProps } from 'react-native';

export interface MarkdownTextInputProps extends TextInputProps {
  // nothing here
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>(
  (props, ref) => {
    // TODO: add web implementation here
    return <TextInput {...props} ref={ref} />;
  }
);

export default MarkdownTextInput;
