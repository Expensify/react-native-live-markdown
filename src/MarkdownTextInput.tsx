import {StyleSheet, TextInput, processColor} from 'react-native';
import React from 'react';
import type {TextInputProps} from 'react-native';
import MarkdownTextInputDecoratorViewNativeComponent from './MarkdownTextInputDecoratorViewNativeComponent';
import type {MarkdownStyle} from './MarkdownTextInputDecoratorViewNativeComponent';
import NativeLiveMarkdownModule from './NativeLiveMarkdownModule';
import {mergeMarkdownStyleWithDefault} from './styleUtils';
import type {PartialMarkdownStyle} from './styleUtils';

if (NativeLiveMarkdownModule) {
  NativeLiveMarkdownModule.install();
}

interface MarkdownTextInputProps extends TextInputProps {
  markdownStyle?: PartialMarkdownStyle;
}

function processColorsInMarkdownStyle(input: MarkdownStyle): MarkdownStyle {
  const output = JSON.parse(JSON.stringify(input));

  Object.keys(output).forEach((key) => {
    const obj = output[key];
    Object.keys(obj).forEach((prop) => {
      // TODO: use ReactNativeStyleAttributes from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
      if (!(prop === 'color' || prop.endsWith('Color'))) {
        return;
      }
      obj[prop] = processColor(obj[prop]);
    });
  });

  return output as MarkdownStyle;
}

function processMarkdownStyle(input: PartialMarkdownStyle | undefined): MarkdownStyle {
  return processColorsInMarkdownStyle(mergeMarkdownStyleWithDefault(input));
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>(({value, maxLength, onChangeText, ...props}, ref) => {
  const IS_FABRIC = 'nativeFabricUIManager' in global;

  const markdownStyle = React.useMemo(() => processMarkdownStyle(props.markdownStyle), [props.markdownStyle]);

  const onChangeTextRef = React.useRef(onChangeText);
  onChangeTextRef.current = onChangeText;

  const processedText = React.useMemo(() => {
    if (maxLength !== undefined) {
      return value?.slice(0, maxLength);
    }
    return value;
  }, [value, maxLength]);

  React.useLayoutEffect(() => {
    if (maxLength === undefined || !value || value.length <= maxLength || !onChangeTextRef.current) {
      return;
    }
    onChangeTextRef.current(value.slice(0, maxLength));
  }, [value, maxLength]);

  return (
    <>
      <TextInput
        {...props}
        value={processedText}
        onChangeText={onChangeText}
        maxLength={maxLength}
        ref={ref}
      />
      <MarkdownTextInputDecoratorViewNativeComponent
        style={IS_FABRIC ? styles.farAway : styles.displayNone}
        markdownStyle={markdownStyle}
      />
    </>
  );
});

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

export type {PartialMarkdownStyle as MarkdownStyle, MarkdownTextInputProps};

export default MarkdownTextInput;
