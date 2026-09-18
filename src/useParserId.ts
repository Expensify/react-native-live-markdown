import React from 'react';
import {allocateParserId, registerParser, unregisterParser} from './parserRegistry';
import type {ParserWorklet} from './workletRuntime';

// Returns the id the native decorator view must carry for `parser` and keeps the worklet registered under that id while
// the input is mounted. Every input gets its own id, and a new one whenever `parser` changes, so the native side sees a
// prop change and its (text, parserId) cache never serves ranges from a previous parser.
// The registration lives in an insertion effect because it is the only effect React runs before the host tree commits,
// so the first measure already has the worklet. It is also the only effect a hidden <Activity> keeps connected and the
// only one StrictMode does not run twice, so the id the native view holds stays valid.
function useParserId(parser: ParserWorklet): number {
  const registration = React.useMemo(() => ({parser, parserId: allocateParserId()}), [parser]);

  React.useInsertionEffect(() => {
    registerParser(registration.parserId, registration.parser);
    return () => unregisterParser(registration.parserId);
  }, [registration]);

  return registration.parserId;
}

export default useParserId;
