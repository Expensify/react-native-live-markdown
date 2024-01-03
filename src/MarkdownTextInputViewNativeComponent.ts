import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type { ProcessedMarkdownStyle as UnsafeMixed } from './MarkdownStyle'; // trick

interface NativeProps extends ViewProps {
  markdownStyle?: UnsafeMixed;
}

export default codegenNativeComponent<NativeProps>('MarkdownTextInputView');
