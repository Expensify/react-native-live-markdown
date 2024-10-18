import {Platform, Text, View, StyleSheet} from 'react-native';
import React from 'react';

function isWeb() {
  return Platform.OS === 'web';
}

function isBridgeless() {
  return (global as Record<string, unknown>)._IS_BRIDGELESS;
}

function getPlatform() {
  if (isWeb()) {
    return 'web';
  }
  // @ts-ignore it works
  return Platform.constants.systemName || Platform.constants.Brand;
}
function getPlatformVersion() {
  return Platform.Version;
}

function getBundle() {
  return __DEV__ ? 'dev' : 'production';
}

function getRuntime() {
  if ('HermesInternal' in global) {
    const version =
      // @ts-ignore this is fine
      global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'];
    return `Hermes (${version})`;
  }
  if ('_v8runtime' in global) {
    // @ts-ignore this is fine
    const version = global._v8runtime().version;
    return `V8 (${version})`;
  }
  return 'JSC';
}

function getArchitecture() {
  return 'nativeFabricUIManager' in global ? 'Fabric' : 'Paper';
}

function getReactNativeVersion() {
  const {major, minor, patch} = Platform.constants.reactNativeVersion;
  return `${major}.${minor}.${patch}`;
}

export function AboutExample() {
  return (
    <View style={styles.platform}>
      <Text>
        Platform: {getPlatform()} {getPlatformVersion()}
      </Text>
      <Text>Bundle: {getBundle()}</Text>
      {!isWeb() && (
        <>
          <Text>Architecture: {getArchitecture()}</Text>
          <Text>Bridgeless: {isBridgeless() ? 'yes' : 'no'}</Text>
          <Text>RN version: {getReactNativeVersion()}</Text>
          <Text>RN runtime: {getRuntime()}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  platform: {
    alignItems: 'center',
    marginTop: 20,
  },
});
