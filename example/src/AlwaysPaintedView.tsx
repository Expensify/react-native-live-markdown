import type {ViewProps} from 'react-native';
import {NativeComponentRegistry} from 'react-native';

// RN declares the view config types but does not export them, so they are read back off the registry signature.
type ViewConfigProvider = Parameters<typeof NativeComponentRegistry.get>[1];
type StyleAttributes = NonNullable<
  NonNullable<ReturnType<ViewConfigProvider>['validAttributes']>['style']
>;

// React hides a host view under a hidden <Activity> by setting `display: none` on it.
// Pinning `display` to `contents` in the view config drops that write, so the subtree stays
// painted and native code keeps applying styles to an input whose JS side is hidden.
const pinnedDisplayStyleAttributes: StyleAttributes = {
  display: {process: () => 'contents'},
};

const AlwaysPaintedView = NativeComponentRegistry.get<ViewProps>(
  'AlwaysPaintedView',
  () => ({
    uiViewClassName: 'RCTView',
    validAttributes: {style: pinnedDisplayStyleAttributes},
  }),
);

export default AlwaysPaintedView;
