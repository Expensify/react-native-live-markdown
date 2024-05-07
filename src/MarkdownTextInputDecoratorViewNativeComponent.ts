import type {ColorValue, ViewProps} from 'react-native';

import type {Float} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface MarkdownStyle {
  syntax: {
    color: ColorValue;
  };
  emoji: {
    fontSize: Float;
  };
  link: {
    color: ColorValue;
  };
  h1: {
    fontSize: Float;
  };
  blockquote: {
    borderColor: ColorValue;
    borderWidth: Float;
    marginLeft: Float;
    paddingLeft: Float;
  };
  code: {
    fontFamily: string;
    fontSize: Float;
    color: ColorValue;
    backgroundColor: ColorValue;
    borderColor: ColorValue;
    borderWidth: Float;
    borderRadius: Float;
    borderStyle: string;
    padding: Float;
  };
  pre: {
    fontFamily: string;
    fontSize: Float;
    color: ColorValue;
    backgroundColor: ColorValue;
    borderColor: ColorValue;
    borderWidth: Float;
    borderRadius: Float;
    borderStyle: string;
    padding: Float;
    marginTop: Float;
    marginBottom: Float;
  };
  mentionHere: {
    color: ColorValue;
    backgroundColor: ColorValue;
  };
  mentionUser: {
    color: ColorValue;
    backgroundColor: ColorValue;
  };
}

interface NativeProps extends ViewProps {
  markdownStyle: MarkdownStyle;
}

export default codegenNativeComponent<NativeProps>('MarkdownTextInputDecoratorView', {
  interfaceOnly: true,
});

export type {MarkdownStyle};
