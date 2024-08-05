import {StyleSheet, TextInput, processColor} from 'react-native';
import React from 'react';
import type {TextInputProps} from 'react-native';
import {createWorkletRuntime, makeShareableCloneRecursive} from 'react-native-reanimated';
import type {WorkletRuntime} from 'react-native-reanimated';
import type {ShareableRef, WorkletFunction} from 'react-native-reanimated/lib/typescript/commonTypes';

import MarkdownTextInputDecoratorViewNativeComponent from './MarkdownTextInputDecoratorViewNativeComponent';
import NativeLiveMarkdownModule from './NativeLiveMarkdownModule';
import type * as MarkdownTextInputDecoratorViewNativeComponentTypes from './MarkdownTextInputDecoratorViewNativeComponent';
import * as StyleUtils from './styleUtils';
import type * as StyleUtilsTypes from './styleUtils';

declare global {
  // eslint-disable-next-line no-var
  var jsi_setMarkdownRuntime: (runtime: WorkletRuntime) => void;
  // eslint-disable-next-line no-var
  var jsi_registerMarkdownWorklet: (shareableWorklet: ShareableRef<WorkletFunction<[string], Range[]>>) => number;
  // eslint-disable-next-line no-var
  var jsi_unregisterMarkdownWorklet: (parserId: number) => void;
}

let initialized = false;
let workletRuntime: WorkletRuntime | undefined;

function initializeLiveMarkdownIfNeeded() {
  if (initialized) {
    return;
  }
  if (!NativeLiveMarkdownModule) {
    throw new Error('[react-native-live-markdown] NativeLiveMarkdownModule is not available');
  }
  NativeLiveMarkdownModule.install();
  if (!global.jsi_setMarkdownRuntime) {
    throw new Error('[react-native-live-markdown] global.jsi_setMarkdownRuntime is not available');
  }
  workletRuntime = createWorkletRuntime('LiveMarkdownRuntime');
  global.jsi_setMarkdownRuntime(workletRuntime);
  initialized = true;
}

function registerParser(parser: (input: string) => Range[]): number {
  initializeLiveMarkdownIfNeeded();
  const shareableWorklet = makeShareableCloneRecursive(parser) as ShareableRef<WorkletFunction<[string], Range[]>>;
  const parserId = global.jsi_registerMarkdownWorklet(shareableWorklet);
  return parserId;
}

function unregisterParser(parserId: number) {
  global.jsi_unregisterMarkdownWorklet(parserId);
}

type PartialMarkdownStyle = StyleUtilsTypes.PartialMarkdownStyle;
type MarkdownStyle = MarkdownTextInputDecoratorViewNativeComponentTypes.MarkdownStyle;

type MarkdownType = 'bold' | 'italic' | 'strikethrough' | 'emoji' | 'mention-here' | 'mention-user' | 'mention-report' | 'link' | 'code' | 'pre' | 'blockquote' | 'h1' | 'syntax';

interface Range {
  type: MarkdownType;
  start: number;
  length: number;
  depth?: number;
}

interface MarkdownTextInputProps extends TextInputProps {
  markdownStyle?: PartialMarkdownStyle;
  parser: (value: string) => Range[];
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

  if (props.parser === undefined) {
    throw new Error('[react-native-live-markdown] `parser` is undefined');
  }

  // eslint-disable-next-line no-underscore-dangle
  const workletHash = (props.parser as {__workletHash?: number}).__workletHash;
  if (workletHash === undefined) {
    throw new Error('[react-native-live-markdown] `parser` is not a worklet');
  }

  const parserId = React.useMemo(() => {
    return registerParser(props.parser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workletHash]);

  React.useEffect(() => {
    return () => unregisterParser(parserId);
  }, [parserId]);

  return (
    <>
      <TextInput
        {...props}
        ref={ref}
      />
      <MarkdownTextInputDecoratorViewNativeComponent
        style={IS_FABRIC ? styles.farAway : styles.displayNone}
        markdownStyle={markdownStyle}
        parserId={parserId}
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

export type {PartialMarkdownStyle as MarkdownStyle, MarkdownTextInputProps, Range, MarkdownType};

export default MarkdownTextInput;
