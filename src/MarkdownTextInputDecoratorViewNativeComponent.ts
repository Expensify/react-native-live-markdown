import {codegenNativeComponent} from 'react-native';
import type {CodegenTypes, ColorValue, ViewProps} from 'react-native';

interface CodeBlockStyle {
  fontFamily: string;
  fontSize: CodegenTypes.Float;
  color: ColorValue;
  backgroundColor: ColorValue;
  borderColor?: ColorValue;
  borderWidth?: CodegenTypes.Float;
  borderRadius?: CodegenTypes.Float;
  borderStyle?: string;
  padding?: CodegenTypes.Float;
  paddingVertical?: CodegenTypes.Float;
  paddingHorizontal?: CodegenTypes.Float;
}

interface MarkdownStyle {
  syntax: {
    color: ColorValue;
  };
  emoji: {
    fontSize: CodegenTypes.Float;
    fontFamily: string;
  };
  link: {
    color: ColorValue;
  };
  h1: {
    fontSize: CodegenTypes.Float;
  };
  blockquote: {
    borderColor: ColorValue;
    borderWidth: CodegenTypes.Float;
    marginLeft: CodegenTypes.Float;
    paddingLeft: CodegenTypes.Float;
  };
  code: CodeBlockStyle & {
    h1NestedFontSize?: CodegenTypes.Float;
  };
  pre: CodeBlockStyle;
  mentionHere: {
    color: ColorValue;
    backgroundColor: ColorValue;
    borderRadius?: CodegenTypes.Float;
  };
  mentionUser: {
    color: ColorValue;
    backgroundColor: ColorValue;
    borderRadius?: CodegenTypes.Float;
  };
  mentionReport: {
    color: ColorValue;
    backgroundColor: ColorValue;
    borderRadius?: CodegenTypes.Float;
  };
  inlineImage: {
    minWidth: CodegenTypes.Float;
    minHeight: CodegenTypes.Float;
    maxWidth: CodegenTypes.Float;
    maxHeight: CodegenTypes.Float;
    marginTop: CodegenTypes.Float;
    marginBottom: CodegenTypes.Float;
    borderRadius: CodegenTypes.Float;
  };
  loadingIndicatorContainer?: {
    backgroundColor?: ColorValue;
    borderWidth?: CodegenTypes.Float;
    borderColor?: ColorValue;
    borderRadius?: CodegenTypes.Float;
    width?: CodegenTypes.Float;
    height?: CodegenTypes.Float;
  };
  loadingIndicator?: {
    primaryColor?: ColorValue;
    secondaryColor?: ColorValue;
    width?: CodegenTypes.Float;
    height?: CodegenTypes.Float;
    borderWidth?: CodegenTypes.Float;
  };
}

interface NativeProps extends ViewProps {
  markdownStyle: MarkdownStyle;
  parserId: CodegenTypes.Int32;
}

export default codegenNativeComponent<NativeProps>('MarkdownTextInputDecoratorView', {
  interfaceOnly: true,
});

export type {MarkdownStyle};
