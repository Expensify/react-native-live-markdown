import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

interface Spec extends TurboModule {
  install: () => boolean;
}

export default TurboModuleRegistry.get<Spec>('RCTLiveMarkdownModule');
