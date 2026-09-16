import React from 'react';
import {getParserId, releaseParser, retainParser} from './parserRegistry';
import type {ParserWorklet} from './workletRuntime';

// The worklet is registered in an insertion effect on purpose. It is the only effect that runs before the host tree
// commits, so the worklet exists before the first measure, and the only one a hidden <Activity> leaves connected, so
// the id the native view holds stays valid until the input unmounts or the parser changes.
function useParserId(parser: ParserWorklet): number {
  const parserId = getParserId(parser);

  React.useInsertionEffect(() => {
    retainParser(parser, parserId);
    return () => releaseParser(parserId);
  }, [parser, parserId]);

  return parserId;
}

export default useParserId;
