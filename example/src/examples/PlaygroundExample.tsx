import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {MarkdownTextInput} from '@expensify/react-native-live-markdown';
import {TextInput} from 'react-native';
import * as TEST_CONST from '../testConstants';

const FONT_SIZES = [24, 32, 8, 12, 16];
const COLORS = ['black', 'red', 'cyan', 'magenta', 'orange'];

export function PlaygroundExample() {
  const [value, setValue] = React.useState(TEST_CONST.EXAMPLE_CONTENT);
  const [textColorIndex, setTextColorIndex] = React.useState(0);
  const [linkColorIndex, setLinkColorIndex] = React.useState(0);
  const [textFontSizeIndex, setTextFontSizeIndex] = React.useState(0);
  const [emojiFontSizeIndex, setEmojiFontSizeIndex] = React.useState(0);
  const [selection, setSelection] = React.useState({start: 0, end: 0});

  const style = React.useMemo(() => {
    return {
      color: COLORS[textColorIndex],
      fontSize: FONT_SIZES[textFontSizeIndex],
    };
  }, [textColorIndex, textFontSizeIndex]);

  const markdownStyle = React.useMemo(() => {
    return {
      emoji: {
        fontSize: FONT_SIZES[emojiFontSizeIndex],
      },
      link: {
        color: COLORS[linkColorIndex],
      },
    };
  }, [linkColorIndex, emojiFontSizeIndex]);

  const ref = React.useRef<TextInput>(null);

  return (
    <ScrollView>
      <View style={styles.container}>
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
        <View style={styles.controlsGrid}>
          <View style={styles.row}>
            <View style={styles.col}>
              <ColorPicker
                color={COLORS[textColorIndex]}
                title="Text Color"
                testID="change-text-color"
                onPress={() => setTextColorIndex(i => (i + 1) % COLORS.length)}
              />
            </View>
            <View style={styles.col}>
              <ColorPicker
                color={COLORS[linkColorIndex]}
                title="Link Color"
                testID="change-text-color"
                onPress={() => setLinkColorIndex(i => (i + 1) % COLORS.length)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <FontPicker
                title="Text Font Size"
                fontSize={FONT_SIZES[textFontSizeIndex]}
                onPress={() =>
                  setTextFontSizeIndex(i => (i + 1) % FONT_SIZES.length)
                }
              />
            </View>
            <View style={styles.col}>
              <FontPicker
                title="Emoji Font Size"
                fontSize={FONT_SIZES[emojiFontSizeIndex]}
                onPress={() =>
                  setEmojiFontSizeIndex(i => (i + 1) % FONT_SIZES.length)
                }
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Btn
                testID="focus"
                title="Focus"
                onPress={() => {
                  if (!ref.current) {
                    return;
                  }
                  ref.current.focus();
                }}
              />
            </View>
            <View style={styles.col}>
              <Btn
                testID="blur"
                title="Blur"
                onPress={() => {
                  if (!ref.current) {
                    return;
                  }
                  ref.current.blur();
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Btn
                testID="reset"
                title="Reset"
                onPress={() => {
                  setValue(TEST_CONST.EXAMPLE_CONTENT);
                  setTextColorIndex(0);
                  setLinkColorIndex(0);
                  setTextFontSizeIndex(0);
                  setEmojiFontSizeIndex(0);
                  setSelection({start: 0, end: 0});
                }}
              />
            </View>
            <View style={styles.col}>
              <Btn
                testID="clear"
                title="Clear"
                onPress={() => {
                  setValue('');
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Btn
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function FontPicker({
  title,
  testID,
  onPress,
  fontSize,
}: {
  title?: string;
  testID?: string;
  fontSize?: number;
  onPress: () => void;
}) {
  return (
    <View style={pickerStyles.container}>
      <Btn testID={testID} onPress={onPress}>
        <Text style={pickerStyles.title}>{fontSize}</Text>
      </Btn>
      <Text style={pickerStyles.title}>{title}</Text>
    </View>
  );
}

function ColorPicker({
  title,
  testID,
  onPress,
  color,
}: {
  title?: string;
  testID?: string;
  color?: string;
  onPress: () => void;
}) {
  const boxStyle = React.useMemo(
    () => [pickerStyles.box, {backgroundColor: color}],
    [color],
  );
  return (
    <View style={pickerStyles.container}>
      <Btn testID={testID} onPress={onPress}>
        <View style={boxStyle} />
      </Btn>
      <Text style={pickerStyles.title}>{title}</Text>
    </View>
  );
}

function Btn({
  title,
  testID,
  onPress,
  children,
}: {
  title?: string;
  testID?: string;
  children?: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      testID={testID}
      style={btnStyles.button}
      onPress={onPress}>
      {title && <Text style={btnStyles.text}>{title}</Text>}
      {children && <>{children}</>}
    </TouchableOpacity>
  );
}
const btnStyles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 8,
    minHeight: 50,
    minWidth: 50,
    borderColor: 'black',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 800,
  },
});

const pickerStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  box: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  title: {
    fontWeight: 800,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  controlsGrid: {
    flex: 2,
    paddingTop: 8,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  col: {
    flex: 1,
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
