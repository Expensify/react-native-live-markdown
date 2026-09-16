import {createSerializable} from 'react-native-worklets';
import {initializeLiveMarkdownIfNeeded} from './workletRuntime';
import type {ParserWorklet} from './workletRuntime';

const parserIds = new WeakMap<ParserWorklet, number>();
let nextParserId = 1;

// Idempotent, so a render can read the id before any effect registers the worklet under it.
function getParserId(parser: ParserWorklet): number {
  const knownParserId = parserIds.get(parser);
  if (knownParserId !== undefined) {
    return knownParserId;
  }
  const parserId = nextParserId;
  nextParserId += 1;
  parserIds.set(parser, parserId);
  return parserId;
}

// Inputs sharing a parser share its id, so the worklet stays registered until the last one lets go.
const retainCounts = new Map<number, number>();

function retainParser(parser: ParserWorklet, parserId: number) {
  const count = retainCounts.get(parserId) ?? 0;
  if (count === 0) {
    initializeLiveMarkdownIfNeeded();
    global.jsi_registerMarkdownWorklet(parserId, createSerializable(parser));
  }
  retainCounts.set(parserId, count + 1);
}

function releaseParser(parserId: number) {
  const count = retainCounts.get(parserId) ?? 0;
  if (count === 0) {
    return;
  }
  if (count === 1) {
    retainCounts.delete(parserId);
    global.jsi_unregisterMarkdownWorklet(parserId);
    return;
  }
  retainCounts.set(parserId, count - 1);
}

export {getParserId, releaseParser, retainParser};
