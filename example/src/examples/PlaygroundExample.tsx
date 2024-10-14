import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {MarkdownTextInput} from '@expensify/react-native-live-markdown';
import {TextInput} from 'react-native';
import * as TEST_CONST from '../testConstants';
import {ColorPickerInput, IterableInput} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const FONT_SIZES = [24, 32, 8, 12, 16];

export function PlaygroundExample() {
  const [value, setValue] = React.useState(TEST_CONST.EXAMPLE_CONTENT);
  const [textColor, setTextColor] = React.useState('#000000');
  const [linkColor, setLinkColor] = React.useState('#000000');
  const [textFontSize, setTextFontSize] = React.useState(FONT_SIZES[0]);
  const [emojiFontSize, setEmojiFontSize] = React.useState(FONT_SIZES[0]);
  const [selection, setSelection] = React.useState({start: 0, end: 0});
  const {bottom} = useSafeAreaInsets();

  const style = React.useMemo(() => {
    return {
      color: textColor,
      fontSize: textFontSize,
    };
  }, [textColor, textFontSize]);

  const markdownStyle = React.useMemo(() => {
    return {
      emoji: {
        fontSize: emojiFontSize,
      },
      link: {
        color: linkColor,
      },
    };
  }, [linkColor, emojiFontSize]);

  const containerStyle = React.useMemo(
    () => ({paddingBottom: bottom}),
    [bottom],
  );

  const ref = React.useRef<TextInput>(null);

  return (
    <ScrollView>
      <View style={[styles.container, containerStyle]}>
        <MarkdownTextInput
          multiline
          autoCapitalize="none"
          value={value}
          onChangeText={setValue}
          style={[styles.input, style]}
          ref={ref}
          markdownStyle={markdownStyle}
          placeholder="Type here..."
          onSelectionChange={e => setSelection(e.nativeEvent.selection)}
          selection={selection}
          id={TEST_CONST.INPUT_ID}
        />
        <LabelWrapper title="Text Color">
          <ColorPickerInput color={textColor} onChangeColor={setTextColor} />
        </LabelWrapper>
        <LabelWrapper title="Link Color">
          <ColorPickerInput color={linkColor} onChangeColor={setLinkColor} />
        </LabelWrapper>
        <LabelWrapper title="Text Font Size">
          <IterableInput
            data={FONT_SIZES}
            initialIndex={0}
            onChange={fontSize => setTextFontSize(fontSize)}
            resolveTitle={fontSize => String(fontSize)}
          />
        </LabelWrapper>
        <LabelWrapper title="Text Emoji Size">
          <IterableInput
            data={FONT_SIZES}
            initialIndex={0}
            onChange={fontSize => setEmojiFontSize(fontSize)}
            resolveTitle={fontSize => String(fontSize)}
          />
        </LabelWrapper>
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
            setTextColor('#0000000');
            setLinkColor('#0000000');
            setTextFontSize(FONT_SIZES[0]);
            setEmojiFontSize(FONT_SIZES[0]);
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
    </ScrollView>
  );
}

function LabelWrapper({
  title,
  children,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={wrapperStyles.container}>
      {children}
      <Text style={wrapperStyles.title}>{title}</Text>
    </View>
  );
}

const wrapperStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontWeight: 800,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  input: {
    fontSize: 20,
    width: '100%',
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
