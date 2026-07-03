import {StyleSheet, TextInput, processColor} from 'react-native';
import React from 'react';
import type {TextInputProps} from 'react-native';
import {createSerializable, createWorkletRuntime, registerCustomSerializable} from 'react-native-worklets';
import type {SerializableRef, WorkletFunction, WorkletRuntime} from 'react-native-worklets';
import MarkdownTextInputDecoratorViewNativeComponent from './MarkdownTextInputDecoratorViewNativeComponent';
import type {MarkdownStyle} from './MarkdownTextInputDecoratorViewNativeComponent';
import NativeLiveMarkdownModule from './NativeLiveMarkdownModule';
import {mergeMarkdownStyleWithDefault} from './styleUtils';
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

// The worklet closure of the built-in `parseExpensiMark` parser captures the `Log` singleton from
// `expensify-common`, and serializing the parser worklet fails because `react-native-worklets` 0.10
// can't copy `Logger` class instances. The logger is unused on the worklet runtime, so serialize it as a no-op.
// `registerCustomSerializable` has been available since react-native-worklets 0.7.0, so this stays
// compatible with every supported version (on 0.9.x and older it's a harmless no-op — they don't throw).
function registerLoggerSerializableOnceIfNeeded() {
  type NoopLogger = Record<string, (...args: unknown[]) => void>;
  registerCustomSerializable<NoopLogger, Record<string, never>>({
    name: 'react-native-live-markdown/Logger',
    determine: (value): value is NoopLogger => {
      'worklet';

      return value !== null && typeof value === 'object' && (value as {constructor?: {name?: string}}).constructor?.name === 'Logger';
    },
    pack: () => {
      'worklet';

      return {};
    },
    unpack: () => {
      'worklet';

      const noop = () => undefined;
      return {logToServer: noop, add: noop, info: noop, alert: noop, warn: noop, hmmm: noop, client: noop};
    },
  });
}

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
  registerLoggerSerializableOnceIfNeeded();
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
