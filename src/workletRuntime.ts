import {createWorkletRuntime} from 'react-native-worklets';
import type {SerializableRef, WorkletRuntime} from 'react-native-worklets';
import NativeLiveMarkdownModule from './NativeLiveMarkdownModule';
import type {MarkdownRange} from './commonTypes';

type ParserWorklet = (input: string) => MarkdownRange[];

declare global {
  // eslint-disable-next-line no-var
  var jsi_setMarkdownRuntime: (runtime: WorkletRuntime) => void;
  // eslint-disable-next-line no-var
  var jsi_registerMarkdownWorklet: (parserId: number, shareableWorklet: SerializableRef<ParserWorklet>) => void;
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

export type {ParserWorklet};
export {getWorkletRuntime, initializeLiveMarkdownIfNeeded};
