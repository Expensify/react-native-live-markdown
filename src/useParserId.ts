import React from 'react';
import {createSerializable} from 'react-native-worklets';
import {initializeLiveMarkdownIfNeeded} from './workletRuntime';
import type {ParserWorklet} from './workletRuntime';

let nextParserId = 1;

// Ids are picked in JS so a render can hand one to the native view before any effect runs.
function allocateParserId(): number {
  const parserId = nextParserId;
  nextParserId += 1;
  return parserId;
}

function registerParser(parserId: number, parser: ParserWorklet) {
  initializeLiveMarkdownIfNeeded();
  global.jsi_registerMarkdownWorklet(parserId, createSerializable(parser));
}

function unregisterParser(parserId: number) {
  global.jsi_unregisterMarkdownWorklet(parserId);
}

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
