import * as React from 'react';

import {Button, Platform, StyleSheet, Text, View} from 'react-native';

import {MarkdownTextInput} from '@expensify/react-native-live-markdown';
import type {TextInput} from 'react-native';
import * as TEST_CONST from '../../testConstants';

function isWeb() {
  return Platform.OS === 'web';
}

function getPlatform() {
  if (isWeb()) {
    return 'web';
  }
  // @ts-expect-error it works
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
      // @ts-expect-error this is fine
      // eslint-disable-next-line es/no-optional-chaining
      global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'];
    return `Hermes (${version})`;
  }
  if ('_v8runtime' in global) {
    // @ts-expect-error this is fine
    // eslint-disable-next-line no-underscore-dangle
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

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

export default function App() {
  const [value, setValue] = React.useState(TEST_CONST.EXAMPLE_CONTENT);
  const [markdownStyle, setMarkdownStyle] = React.useState({});
  const [selection, setSelection] = React.useState({start: 0, end: 0});

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
      {/* <Text>MarkdownTextInput singleline</Text>
      <MarkdownTextInput
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      /> */}
      <Text>MarkdownTextInput multiline</Text>
      <MarkdownTextInput
        multiline
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        ref={ref}
        markdownStyle={markdownStyle}
        placeholder="Type here..."
        onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
        selection={selection}
        id={TEST_CONST.INPUT_ID}
      />
      {/* <Text>TextInput singleline</Text>
      <TextInput
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      /> */}
      {/* <Text>TextInput multiline</Text>
      <TextInput
        multiline
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      /> */}
      <Text style={styles.text}>{JSON.stringify(value)}</Text>
      <Button
        testID="focus"
        title="Focus"
        onPress={() => {
          if (!ref.current) {
            return;
          }
          ref.current.focus();
        }}
      />
      <Button
        testID="blur"
        title="Blur"
        onPress={() => {
          if (!ref.current) {
            return;
          }
          ref.current.blur();
        }}
      />
      <Button
        testID="reset"
        title="Reset"
        onPress={() => {
          setValue(TEST_CONST.EXAMPLE_CONTENT);
          setMarkdownStyle({});
        }}
      />
      <Button
        testID="clear"
        title="Clear"
        onPress={() => setValue('')}
      />
      <Button
        title="Change style"
        onPress={() =>
          setMarkdownStyle({
            link: {
              color: getRandomColor(),
            },
          })
        }
      />
      <Button
        title="Change selection"
        onPress={() => {
          if (!ref.current) {
            return;
          }
          ref.current.focus();
          setSelection({start: 0, end: 20});
        }}
      />
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
