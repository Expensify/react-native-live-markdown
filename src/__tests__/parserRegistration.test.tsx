import {expect} from '@jest/globals';
import React, {Activity, StrictMode, Suspense, act} from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import type {SerializableRef} from 'react-native-worklets';
import type {MarkdownRange} from '../commonTypes';
import MarkdownTextInput from '../MarkdownTextInput';
import type {MarkdownTextInputProps} from '../MarkdownTextInput';

/**
 * The parser worklet lives in a C++ registry keyed by the `parserId` prop the decorator view carries. The registry is
 * replaced by a map of worklets here, the decorator view by an element that exposes its `parserId` as a DOM attribute and
 * counts its renders, and the native text input by a plain `<input>`, so the component renders in jsdom through `react-dom`.
 */
type Parser = MarkdownTextInputProps['parser'];

// `createSerializable` is mocked to return the worklet itself, so the map holds the parser functions.
const liveParsers = new Map<number, SerializableRef<Parser>>();
const registerWorklet = jest.fn((parserId: number, worklet: SerializableRef<Parser>) => {
  liveParsers.set(parserId, worklet);
});
const unregisterWorklet = jest.fn((parserId: number) => {
  liveParsers.delete(parserId);
});
let decoratorRenderCount = 0;

jest.mock('react-native', () => ({
  Platform: {OS: 'ios', select: (options: {ios?: unknown; default?: unknown}) => options.ios ?? options.default},
  StyleSheet: {create: <T,>(styles: T) => styles},
  TextInput: (props: {testID?: string}) => <input data-testid={props.testID} />,
  TurboModuleRegistry: {get: () => null},
  processColor: (color: unknown) => color,
}));

jest.mock('react-native-worklets', () => ({
  createSerializable: (worklet: unknown) => worklet,
  createWorkletRuntime: () => ({}),
}));

jest.mock('../MarkdownTextInputDecoratorViewNativeComponent', () => ({
  __esModule: true,
  default: (props: {parserId: number; children: React.ReactNode}) => {
    decoratorRenderCount += 1;
    return <div data-parser-id={props.parserId}>{props.children}</div>;
  },
}));

// The worklets babel plugin does not run under Jest, so the hash that marks a function as a worklet is attached by hand.
function createParserWorklet() {
  return Object.assign((): MarkdownRange[] => [], {__workletHash: 1});
}

const parser = createParserWorklet();

let container: HTMLDivElement;
let root: Root;

function renderIntoRoot(element: React.ReactElement) {
  act(() => {
    root.render(element);
  });
}

function renderInActivity(isHidden: boolean, currentParser: Parser = parser) {
  renderIntoRoot(
    <Activity mode={isHidden ? 'hidden' : 'visible'}>
      <MarkdownTextInput parser={currentParser} />
    </Activity>,
  );
}

function getDecoratorParserIds(): number[] {
  return Array.from(container.querySelectorAll('[data-parser-id]'), (element) => {
    const attribute = element.getAttribute('data-parser-id');
    const parserId = Number(attribute);
    if (attribute == null || !Number.isInteger(parserId) || parserId <= 0) {
      throw new Error('The decorator view rendered without a parser id');
    }
    return parserId;
  });
}

function getDecoratorParserId(): number {
  const parserIds = getDecoratorParserIds();
  const [parserId] = parserIds;
  if (parserId === undefined || parserIds.length !== 1) {
    throw new Error(`Expected one decorator view, found ${parserIds.length}`);
  }
  return parserId;
}

function expectDecoratorOnTheOnlyLiveParserId(expectedParser: Parser = parser) {
  expect(liveParsers.get(getDecoratorParserId())).toBe(expectedParser);
  expect(liveParsers.size).toBe(1);
}

describe('MarkdownTextInput parser registration', () => {
  beforeEach(() => {
    liveParsers.clear();
    registerWorklet.mockClear();
    unregisterWorklet.mockClear();
    decoratorRenderCount = 0;
    global.jsi_setMarkdownRuntime = jest.fn();
    global.jsi_registerMarkdownWorklet = registerWorklet;
    global.jsi_unregisterMarkdownWorklet = unregisterWorklet;

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    expect(liveParsers.size).toBe(0);
  });

  it('registers the parser once and carries its id in the first render', () => {
    renderIntoRoot(<MarkdownTextInput parser={parser} />);

    expect(decoratorRenderCount).toBe(1);
    expect(registerWorklet).toHaveBeenCalledTimes(1);
    expectDecoratorOnTheOnlyLiveParserId();
  });

  it('unregisters the parser on unmount', () => {
    renderIntoRoot(<MarkdownTextInput parser={parser} />);
    const parserId = getDecoratorParserId();

    act(() => {
      root.unmount();
    });

    expect(unregisterWorklet).toHaveBeenCalledWith(parserId);
    expect(liveParsers.size).toBe(0);
  });

  it('keeps the registration when rerendering with the same parser', () => {
    renderIntoRoot(<MarkdownTextInput parser={parser} />);
    const initialParserId = getDecoratorParserId();

    renderIntoRoot(
      <MarkdownTextInput
        parser={parser}
        value="*updated*"
      />,
    );

    expect(getDecoratorParserId()).toBe(initialParserId);
    expect(registerWorklet).toHaveBeenCalledTimes(1);
    expect(unregisterWorklet).not.toHaveBeenCalled();
    expectDecoratorOnTheOnlyLiveParserId();
  });

  it('registers the parser of an initially hidden <Activity> and drops it when the Activity is removed while hidden', () => {
    renderInActivity(true);
    expectDecoratorOnTheOnlyLiveParserId();

    renderIntoRoot(<div />);

    expect(liveParsers.size).toBe(0);
  });

  it('does not register a parser when React abandons a suspended render', () => {
    const pending = new Promise<never>(() => {
      // Keep the subtree suspended until its render is abandoned.
    });
    function Suspend(): React.ReactNode {
      throw pending;
    }

    renderIntoRoot(
      <Suspense fallback={<span>Loading</span>}>
        <MarkdownTextInput parser={parser} />
        <Suspend />
      </Suspense>,
    );

    expect(container.textContent).toBe('Loading');
    expect(registerWorklet).not.toHaveBeenCalled();
    expect(liveParsers.size).toBe(0);

    renderIntoRoot(<MarkdownTextInput parser={parser} />);
    expectDecoratorOnTheOnlyLiveParserId();
  });

  it('registers once under StrictMode', () => {
    renderIntoRoot(
      <StrictMode>
        <MarkdownTextInput parser={parser} />
      </StrictMode>,
    );

    expect(registerWorklet).toHaveBeenCalledTimes(1);
    expect(unregisterWorklet).not.toHaveBeenCalled();
    expectDecoratorOnTheOnlyLiveParserId();
  });

  it('keeps the same registration while a <Activity> is hidden and revealed', () => {
    renderInActivity(false);
    const parserId = getDecoratorParserId();

    renderInActivity(true);
    expect(getDecoratorParserId()).toBe(parserId);
    expectDecoratorOnTheOnlyLiveParserId();

    const renderCountBeforeReveal = decoratorRenderCount;
    renderInActivity(false);

    expect(getDecoratorParserId()).toBe(parserId);
    expect(decoratorRenderCount).toBe(renderCountBeforeReveal + 1);
    expect(registerWorklet).toHaveBeenCalledTimes(1);
    expect(unregisterWorklet).not.toHaveBeenCalled();
    expectDecoratorOnTheOnlyLiveParserId();
  });

  it('switches to a replacement parser while the <Activity> is still hidden', () => {
    renderInActivity(false);
    const initialParserId = getDecoratorParserId();

    renderInActivity(true);
    const nextParser = createParserWorklet();
    renderInActivity(true, nextParser);

    expect(getDecoratorParserId()).not.toBe(initialParserId);
    expect(unregisterWorklet).toHaveBeenCalledWith(initialParserId);
    expectDecoratorOnTheOnlyLiveParserId(nextParser);

    renderInActivity(false, nextParser);

    expect(registerWorklet).toHaveBeenCalledTimes(2);
    expectDecoratorOnTheOnlyLiveParserId(nextParser);
  });

  it('unregisters an input removed inside a hidden <Activity>', () => {
    renderInActivity(false);
    renderInActivity(true);
    const parserId = getDecoratorParserId();

    renderIntoRoot(
      <Activity mode="hidden">
        <div />
      </Activity>,
    );

    expect(unregisterWorklet).toHaveBeenCalledWith(parserId);
    expect(liveParsers.size).toBe(0);
  });

  it('shares one registration between inputs using the same parser', () => {
    renderIntoRoot(
      <div>
        <MarkdownTextInput
          key="first"
          parser={parser}
        />
        <MarkdownTextInput
          key="second"
          parser={parser}
        />
      </div>,
    );
    const ids = getDecoratorParserIds();
    expect(ids).toHaveLength(2);
    expect(ids[0]).toBe(ids[1]);
    expect(registerWorklet).toHaveBeenCalledTimes(1);
    expect(liveParsers.size).toBe(1);

    renderIntoRoot(
      <div>
        <MarkdownTextInput
          key="second"
          parser={parser}
        />
      </div>,
    );
    expect(unregisterWorklet).not.toHaveBeenCalled();
    expectDecoratorOnTheOnlyLiveParserId();

    renderIntoRoot(<div />);
    expect(unregisterWorklet).toHaveBeenCalledTimes(1);
    expect(liveParsers.size).toBe(0);
  });

  it('moves the decorator to a new id and drops the previous one when the parser changes identity', () => {
    renderIntoRoot(<MarkdownTextInput parser={parser} />);
    const initialParserId = getDecoratorParserId();

    const nextParser = createParserWorklet();
    renderIntoRoot(<MarkdownTextInput parser={nextParser} />);

    expect(getDecoratorParserId()).not.toBe(initialParserId);
    expect(unregisterWorklet).toHaveBeenCalledWith(initialParserId);
    expectDecoratorOnTheOnlyLiveParserId(nextParser);
  });
});
