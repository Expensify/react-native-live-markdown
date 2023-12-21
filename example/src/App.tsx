import * as React from 'react';

import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { MarkdownTextInput } from 'react-native-markdown-text-input';

function getPlatform() {
  return Platform.select({
    android: 'Android',
    ios: 'iOS',
    default: Platform.OS,
  });
}

function getArchitecture() {
  return 'nativeFabricUIManager' in global ? 'Fabric' : 'Paper';
}

export default function App() {
  const [value, setValue] = React.useState('Hello, *world*!');

  // TODO: use MarkdownTextInput ref instead of TextInput ref
  const ref = React.useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Text>{getPlatform()}</Text>
      {Platform.OS !== 'web' && <Text>{getArchitecture()}</Text>}
      <Text>MarkdownTextInput singleline</Text>
      <MarkdownTextInput
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        ref={ref}
      />
      <Text>MarkdownTextInput multiline</Text>
      <MarkdownTextInput
        multiline
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        style={styles.input}
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
