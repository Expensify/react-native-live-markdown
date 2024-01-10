import type { ColorValue, ViewProps } from 'react-native';

import type { Float } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface MarkdownStyle {
  syntax: {
    color: ColorValue;
  };
  link: {
    color: ColorValue;
  };
  h1: {
    fontSize: Float;
  };
  quote: {
    borderColor: ColorValue;
    borderWidth: Float;
    marginLeft: Float;
    paddingLeft: Float;
  };
  code: {
    color: ColorValue;
    backgroundColor: ColorValue;
  };
  pre: {
    color: ColorValue;
    backgroundColor: ColorValue;
  };
  mentionHere: {
    backgroundColor: ColorValue;
  };
  mentionUser: {
    backgroundColor: ColorValue;
  };
}

interface NativeProps extends ViewProps {
  markdownStyle: MarkdownStyle;
}

export default codegenNativeComponent<NativeProps>(
  'MarkdownTextInputDecoratorView'
);
