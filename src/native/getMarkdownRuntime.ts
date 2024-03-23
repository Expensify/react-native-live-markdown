import {createWorkletRuntime} from 'react-native-reanimated';
import type {WorkletRuntime} from 'react-native-reanimated';

let markdownRuntime: WorkletRuntime | undefined;

function getMarkdownRuntime(): WorkletRuntime {
  if (markdownRuntime === undefined) {
    markdownRuntime = createWorkletRuntime('LiveMarkdownRuntime');
  }
  return markdownRuntime;
}

export default getMarkdownRuntime;
