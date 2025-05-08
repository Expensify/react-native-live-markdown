import * as React from 'react';
import {Button, ScrollView, StyleSheet, Text} from 'react-native';
import {
  MarkdownTextInput,
  parseExpensiMark,
} from '@expensify/react-native-live-markdown';
import * as TEST_CONST from './testConstants';
import {PlatformInfo} from './PlatformInfo';
import {handleFormatSelection} from './formatSelectionUtils';

export default function App() {
  const [value, setValue] = React.useState(TEST_CONST.EXAMPLE_CONTENT);
  const [multiline, setMultiline] = React.useState(true);
  const [textColorState, setTextColorState] = React.useState(false);
  const [linkColorState, setLinkColorState] = React.useState(false);
  const [textFontSizeState, setTextFontSizeState] = React.useState(false);
  const [emojiFontSizeState, setEmojiFontSizeState] = React.useState(false);
  const [caretHidden, setCaretHidden] = React.useState(false);
  const [selection, setSelection] = React.useState({start: 0, end: 0});

  const style = React.useMemo(() => {
    return {
      color: textColorState ? 'gray' : 'black',
      fontSize: textFontSizeState ? 15 : 20,
    };
  }, [textColorState, textFontSizeState]);

  const markdownStyle = React.useMemo(() => {
    return {
      emoji: {
        fontSize: emojiFontSizeState ? 15 : 20,
      },
      link: {
        color: linkColorState ? 'red' : 'blue',
      },
    };
  }, [emojiFontSizeState, linkColorState]);

  const ref = React.useRef<MarkdownTextInput>(null);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.content}>
      <PlatformInfo />
      <MarkdownTextInput
        multiline={multiline}
        formatSelection={handleFormatSelection}
        autoCapitalize="none"
        caretHidden={caretHidden}
        value={value}
        onChangeText={setValue}
        style={[styles.input, style]}
        ref={ref}
        markdownStyle={markdownStyle}
        parser={parseExpensiMark}
        placeholder="Type here..."
        onSelectionChange={e => setSelection(e.nativeEvent.selection)}
        selection={selection}
        id={TEST_CONST.INPUT_ID}
        maxLength={30000}
      />
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
          setTextColorState(false);
          setLinkColorState(false);
          setTextFontSizeState(false);
          setEmojiFontSizeState(false);
          setSelection({start: 0, end: 0});
        }}
      />
      <Button
        testID="clear"
        title="Clear"
        onPress={() => {
          setValue('');
        }}
      />
      <Button
        title="Toggle multiline"
        onPress={() => setMultiline(prev => !prev)}
      />
      <Button
        title="Toggle text color"
        onPress={() => setTextColorState(prev => !prev)}
      />
      <Button
        title="Toggle link color"
        onPress={() => setLinkColorState(prev => !prev)}
      />
      <Button
        title="Toggle text font size"
        onPress={() => setTextFontSizeState(prev => !prev)}
      />
      <Button
        title="Toggle emoji font size"
        onPress={() => setEmojiFontSizeState(prev => !prev)}
      />
      <Button
        title="Toggle caret hidden"
        onPress={() => setCaretHidden(prev => !prev)}
      />
      <Button
        title="Toggle all"
        onPress={() => {
          setTextColorState(prev => !prev);
          setLinkColorState(prev => !prev);
          setTextFontSizeState(prev => !prev);
          setEmojiFontSizeState(prev => !prev);
          setCaretHidden(prev => !prev);
        }}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  content: {
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
