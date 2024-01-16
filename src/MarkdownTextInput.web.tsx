import {TextInput} from 'react-native';

import React from 'react';
import type {TextInputProps} from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MarkdownTextInputProps extends TextInputProps {
  // nothing here
}

// eslint-disable-next-line arrow-body-style
const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>((props, ref) => {
  // TODO: add web implementation here
  return (
    <TextInput
      {...props}
      ref={ref}
    />
  );
});

export default MarkdownTextInput;

export type {MarkdownTextInputProps};
