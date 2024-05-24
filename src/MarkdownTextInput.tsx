import {StyleSheet, TextInput, processColor} from 'react-native';
import React from 'react';
import type {TextInputProps} from 'react-native';
import MarkdownTextInputDecoratorViewNativeComponent from './MarkdownTextInputDecoratorViewNativeComponent';
import NativeLiveMarkdownModule from './NativeLiveMarkdownModule';
import type * as MarkdownTextInputDecoratorViewNativeComponentTypes from './MarkdownTextInputDecoratorViewNativeComponent';
import * as StyleUtils from './styleUtils';
import type * as StyleUtilsTypes from './styleUtils';
import getMarkdownRuntime from './native/getMarkdownRuntime';

NativeLiveMarkdownModule.install();

const markdownRuntime = getMarkdownRuntime();
// @ts-expect-error TODO
global.setMarkdownRuntime(markdownRuntime);

if (NativeLiveMarkdownModule) {
  NativeLiveMarkdownModule.install();
}

type PartialMarkdownStyle = StyleUtilsTypes.PartialMarkdownStyle;
type MarkdownStyle = MarkdownTextInputDecoratorViewNativeComponentTypes.MarkdownStyle;

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
  return processColorsInMarkdownStyle(StyleUtils.mergeMarkdownStyleWithDefault(input));
}

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>((props, ref) => {
  const IS_FABRIC = 'nativeFabricUIManager' in global;

  const markdownStyle = React.useMemo(() => processMarkdownStyle(props.markdownStyle), [props.markdownStyle]);

  return (
    <>
      <TextInput
        {...props}
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
