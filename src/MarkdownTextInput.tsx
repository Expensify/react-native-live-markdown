import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import type {TextInputProps} from 'react-native';
import {createSerializable, createWorkletRuntime} from 'react-native-worklets';
import type {SerializableRef, WorkletFunction, WorkletRuntime} from 'react-native-worklets';
import MarkdownTextInputDecoratorViewNativeComponent from './MarkdownTextInputDecoratorViewNativeComponent';
import NativeLiveMarkdownModule from './NativeLiveMarkdownModule';
import {processMarkdownStyle} from './styleUtils';
import type {PartialMarkdownStyle} from './styleUtils';
import type {InlineImagesInputProps, MarkdownRange} from './commonTypes';

declare global {
  // eslint-disable-next-line no-var
  var jsi_setMarkdownRuntime: (runtime: WorkletRuntime) => void;
  // eslint-disable-next-line no-var
  var jsi_registerMarkdownWorklet: (shareableWorklet: SerializableRef<WorkletFunction<[string], MarkdownRange[]>>) => number;
  // eslint-disable-next-line no-var
  var jsi_unregisterMarkdownWorklet: (parserId: number) => void;
}

let initialized = false;
let workletRuntime: WorkletRuntime | undefined;

function getWorkletRuntime(): WorkletRuntime {
  if (workletRuntime === undefined) {
    throw new Error(
      "[react-native-live-markdown] Worklet runtime hasn't been created yet. Please avoid calling `getWorkletRuntime()` in top-level scope. Instead, call `getWorkletRuntime()` directly in `runOnRuntime` arguments list.",
    );
  }
  return workletRuntime;
}

function initializeLiveMarkdownIfNeeded() {
  if (initialized) {
    return;
  }
  if (NativeLiveMarkdownModule) {
    NativeLiveMarkdownModule.install();
  }
  if (!global.jsi_setMarkdownRuntime) {
    throw new Error('[react-native-live-markdown] global.jsi_setMarkdownRuntime is not available');
  }
  workletRuntime = createWorkletRuntime({name: 'LiveMarkdownRuntime'});
  global.jsi_setMarkdownRuntime(workletRuntime);
  initialized = true;
}

function registerParser(parser: (input: string) => MarkdownRange[]): number {
  initializeLiveMarkdownIfNeeded();
  const serializableWorklet = createSerializable(parser as WorkletFunction<[string], MarkdownRange[]>);
  const parserId = global.jsi_registerMarkdownWorklet(serializableWorklet);
  return parserId;
}

function unregisterParser(parserId: number) {
  global.jsi_unregisterMarkdownWorklet(parserId);
}

interface MarkdownTextInputProps extends TextInputProps, InlineImagesInputProps {
  markdownStyle?: PartialMarkdownStyle;
  formatSelection?: (text: string, selectionStart: number, selectionEnd: number, formatCommand: string) => FormatSelectionResult;
  parser: (value: string) => MarkdownRange[];
}

type FormatSelectionResult = {
  updatedText: string;
  cursorOffset: number;
};

type MarkdownTextInput = TextInput & React.Component<MarkdownTextInputProps>;

const MarkdownTextInput = React.forwardRef<MarkdownTextInput, MarkdownTextInputProps>((props, ref) => {
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
  }, [props.parser]);

  React.useEffect(() => {
    return () => unregisterParser(parserId);
  }, [parserId]);

  return (
    <MarkdownTextInputDecoratorViewNativeComponent
      style={styles.displayContents}
      markdownStyle={markdownStyle}
      parserId={parserId}
    >
      <TextInput
        {...props}
        ref={ref}
      />
    </MarkdownTextInputDecoratorViewNativeComponent>
  );
});

const styles = StyleSheet.create({
  displayContents: {
    display: 'contents',
  },
});

export type {PartialMarkdownStyle as MarkdownStyle, MarkdownTextInputProps};

export default MarkdownTextInput;

export {getWorkletRuntime};
