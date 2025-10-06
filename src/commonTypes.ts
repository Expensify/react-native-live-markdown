type MarkdownType =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'emoji'
  | 'mention-here'
  | 'mention-user'
  | 'mention-short'
  | 'mention-report'
  | 'link'
  | 'code'
  | 'pre'
  | 'blockquote'
  | 'h1'
  | 'syntax'
  | 'inline-image'
  | 'codeblock';

interface MarkdownRange {
  type: MarkdownType;
  start: number;
  length: number;
  depth?: number;
}

type InlineImagesInputProps = {
  addAuthTokenToImageURLCallback?: (url: string) => string;
  imagePreviewAuthRequiredURLs?: string[];
};

// Temporary types from `react-native-reanimated` and `react-native-worklets`
// TODO: remove once `react-native-reanimated` dependency is removed

type WorkletStackDetails = [error: Error, lineOffset: number, columnOffset: number];

type WorkletClosure = Record<string, unknown>;

interface WorkletInitData {
  code: string;
  /** Only in dev builds. */
  location?: string;
  /** Only in dev builds. */
  sourceMap?: string;
}

interface WorkletProps {
  __closure: WorkletClosure;
  __workletHash: number;
  /** Only in Legacy Bundling. */
  __initData?: WorkletInitData;
  /** Only for Handles. */
  __init?: () => unknown;
  /** `__stackDetails` is removed after parsing. */
  __stackDetails?: WorkletStackDetails;
  /** Only in dev builds. */
  __pluginVersion?: string;
}

type WorkletFunctionWorklets<TArgs extends unknown[] = unknown[], TReturn = unknown> = ((...args: TArgs) => TReturn) & WorkletProps;

interface WorkletInitDataCommon {
  code: string;
}

type WorkletInitDataRelease = WorkletInitDataCommon;

interface WorkletInitDataDev extends WorkletInitDataCommon {
  location: string;
  sourceMap: string;
  version: string;
}

interface WorkletBaseCommon {
  __closure: WorkletClosure;
  __workletHash: number;
}

interface WorkletBaseRelease extends WorkletBaseCommon {
  __initData: WorkletInitDataRelease;
}

interface WorkletBaseDev extends WorkletBaseCommon {
  __initData: WorkletInitDataDev;
  /** `__stackDetails` is removed after parsing. */
  __stackDetails?: WorkletStackDetails;
}

type WorkletFunctionDev<Args extends unknown[] = unknown[], ReturnValue = unknown> = ((...args: Args) => ReturnValue) & WorkletBaseDev;

type WorkletFunctionRelease<Args extends unknown[] = unknown[], ReturnValue = unknown> = ((...args: Args) => ReturnValue) & WorkletBaseRelease;

type WorkletFunctionReanimated<Args extends unknown[] = unknown[], ReturnValue = unknown> = WorkletFunctionDev<Args, ReturnValue> | WorkletFunctionRelease<Args, ReturnValue>;

type WorkletFunction<T extends unknown[], U> = WorkletFunctionWorklets<T, U> | WorkletFunctionReanimated<T, U>;

type ShareableRef<T = unknown> = {
  __hostObjectShareableJSRef: T;
};

type WorkletRuntime = {
  __hostObjectWorkletRuntime: never;
  readonly name: string;
};

export type {MarkdownType, MarkdownRange, InlineImagesInputProps, WorkletFunction, ShareableRef, WorkletRuntime};
