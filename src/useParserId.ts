import React from 'react';
import {allocateParserId, registerParser, unregisterParser} from './parserRegistry';
import type {ParserWorklet} from './workletRuntime';

// An insertion effect is the only effect React runs before the host tree commits, does not run twice under StrictMode
// and keeps connected inside a hidden <Activity>. A parser change gets a fresh id because the native side caches ranges
// by text and parser id.
function useParserId(parser: ParserWorklet): number {
  const registration = React.useMemo(() => ({parser, parserId: allocateParserId()}), [parser]);

  React.useInsertionEffect(() => {
    registerParser(registration.parserId, registration.parser);
    return () => unregisterParser(registration.parserId);
  }, [registration]);

  return registration.parserId;
}

export default useParserId;
