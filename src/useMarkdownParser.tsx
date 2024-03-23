import * as React from 'react';
import {makeShareableCloneRecursive} from 'react-native-reanimated';

interface Range {
  type: string;
  start: number;
  length: number;
}

function useMarkdownParser(worklet: (text: string) => Range[], deps: unknown[]) {
  // eslint-disable-next-line no-underscore-dangle
  const workletHash = (worklet as unknown as {__workletHash: number}).__workletHash;

  const parserId = React.useMemo(() => {
    if (parserId !== undefined) {
      // @ts-expect-error TODO
      global.unregisterMarkdownWorklet(parserId);
    }

    const shareableWorklet = makeShareableCloneRecursive(worklet);
    // @ts-expect-error TODO
    global.registerMarkdownWorklet(shareableWorklet);
    return Math.random();
  }, [workletHash, ...deps]);

  return parserId;
}

export default useMarkdownParser;

export type {Range};
