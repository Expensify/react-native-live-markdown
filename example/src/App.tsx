import * as React from 'react';

import {
  Button,
  Platform,
  PlatformColor,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { MarkdownTextInput } from 'react-native-markdown-text-input';

const MARKDOWN_STYLE = {
  syntax: {
    color: 'gray',
  },
  link: {
    color: Platform.select({
      android: PlatformColor('@android:color/holo_blue_bright'),
      ios: PlatformColor('linkColor'),
    }),
  },
  h1: {
    fontSize: 25,
  },
  quote: {
    borderColor: 'gray',
    borderWidth: 10,
    marginLeft: 10,
    paddingLeft: 10,
  },
  code: {
    color: 'rgb(6,25,109)',
    backgroundColor: '#eee',
  },
  pre: {
    color: 'rgb(6,25,109)',
    backgroundColor: '#eee',
  },
  mentionHere: {
    backgroundColor: 'rgb(252,232,142)',
  },
  mentionUser: {
    backgroundColor: 'rgb(176,217,255)',
  },
};

function isWeb() {
  return Platform.OS === 'web';
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
  const { major, minor, patch } = Platform.constants.reactNativeVersion;
  return `${major}.${minor}.${patch}`;
}

export default function App() {
  const [value, setValue] = React.useState(
    'Hello, *world*!\nhttps://swmansion.com'
  );

  // TODO: use MarkdownTextInput ref instead of TextInput ref
  const ref = React.useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <View style={styles.platform}>
        <Text>
          Platform: {getPlatform()} {getPlatformVersion()}
        </Text>
        <Text>Bundle: {getBundle()}</Text>
        {!isWeb() && (
          <>
            <Text>Architecture: {getArchitecture()}</Text>
            <Text>RN version: {getReactNativeVersion()}</Text>
            <Text>RN runtime: {getRuntime()}</Text>
          </>
        )}
      </View>
      <Text>MarkdownTextInput singleline</Text>
      <MarkdownTextInput
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        markdownStyle={MARKDOWN_STYLE}
        ref={ref}
      />
      <Text>MarkdownTextInput multiline</Text>
      <MarkdownTextInput
        multiline
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        markdownStyle={MARKDOWN_STYLE}
      />
      <Text>TextInput singleline</Text>
      <TextInput
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
      <Text>TextInput multiline</Text>
      <TextInput
        multiline
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
      <Text style={styles.text}>{JSON.stringify(value)}</Text>
      <Button title="Focus" onPress={() => ref.current?.focus()} />
      <Button title="Blur" onPress={() => ref.current?.blur()} />
      <Button title="Reset" onPress={() => setValue('Hello, *world*!')} />
      <Button title="Clear" onPress={() => setValue('')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  platform: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    width: 300,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  text: {
    fontFamily: 'Courier New',
    marginTop: 10,
    height: 100,
  },
});
