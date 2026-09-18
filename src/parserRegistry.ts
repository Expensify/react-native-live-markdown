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

export {allocateParserId, registerParser, unregisterParser};
