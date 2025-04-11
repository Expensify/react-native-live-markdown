import type {ColorValue, ViewProps} from 'react-native';

import type {Float, Int32} from 'react-native/Libraries/Types/CodegenTypes';
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
    h1NestedFontSize?: Float;
    color: ColorValue;
    backgroundColor: ColorValue;
    borderColor: ColorValue;
    borderWidth: Float;
    borderRadius: Float;
    borderStyle: string;
    padding?: Float;
    paddingVertical?: Float;
    paddingHorizontal?: Float;
  };
  pre: {
    fontFamily: string;
    fontSize: Float;
    color: ColorValue;
    backgroundColor: ColorValue;
    borderColor: string;
    borderRadius: Float;
    padding: Float;
    paddingVertical?: Float;
    paddingHorizontal?: Float;
  };
  mentionHere: {
    color: ColorValue;
    backgroundColor: ColorValue;
    borderRadius?: Float;
  };
  mentionUser: {
    color: ColorValue;
    backgroundColor: ColorValue;
    borderRadius?: Float;
  };
  mentionReport: {
    color: ColorValue;
    backgroundColor: ColorValue;
    borderRadius?: Float;
  };
  inlineImage: {
    minWidth: Float;
    minHeight: Float;
    maxWidth: Float;
    maxHeight: Float;
    marginTop: Float;
    marginBottom: Float;
    borderRadius: Float;
  };
  loadingIndicatorContainer?: {
    backgroundColor?: ColorValue;
    borderWidth?: Float;
    borderColor?: ColorValue;
    borderRadius?: Float;
    width?: Float;
    height?: Float;
  };
  loadingIndicator?: {
    primaryColor?: ColorValue;
    secondaryColor?: ColorValue;
    width?: Float;
    height?: Float;
    borderWidth?: Float;
  };
}

interface NativeProps extends ViewProps {
  markdownStyle: MarkdownStyle;
  parserId: Int32;
}

export default codegenNativeComponent<NativeProps>('MarkdownTextInputDecoratorView', {
  interfaceOnly: true,
});

export type {MarkdownStyle};
