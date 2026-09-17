import React from 'react';
import {getParserId, releaseParser, retainParser} from './parserRegistry';
import type {ParserWorklet} from './workletRuntime';

// Returns the id the native decorator view must carry for `parser` and keeps the worklet registered under that id while
// the input is mounted. The registration lives in an insertion effect because it is the only effect React runs before
// the host tree commits, so the first measure already has the worklet. It is also the only effect a hidden <Activity>
// keeps connected and the only one StrictMode does not run twice, so the id the native view holds stays valid.
function useParserId(parser: ParserWorklet): number {
  const parserId = getParserId(parser);

  React.useInsertionEffect(() => {
    retainParser(parser, parserId);
    return () => releaseParser(parserId);
  }, [parser, parserId]);

  return parserId;
}

export default useParserId;
