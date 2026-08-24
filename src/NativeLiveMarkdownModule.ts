import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Spec extends TurboModule {}

export default TurboModuleRegistry.get<Spec>('LiveMarkdownModule');
