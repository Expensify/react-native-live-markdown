import * as React from 'react';

import {StyleSheet, View} from 'react-native';
import {MarkdownTextInput} from '@expensify/react-native-live-markdown';

export default function App() {
  return (
    <View style={{marginTop: 200}}>
      <MarkdownTextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    lineHeight: 25,
    height: 25,
    fontSize: 15,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
