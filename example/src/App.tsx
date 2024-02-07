import * as React from 'react';

import {KeyboardAvoidingView, Pressable, StyleSheet, View} from 'react-native';

import Animated from 'react-native-reanimated';
import {MarkdownTextInput} from '@expensify/react-native-live-markdown';
import {MasonryFlashList} from '@shopify/flash-list';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

interface BigNoteProps {
  tag: string;
  backgroundColor: string;
  text: string;
}

interface SmallNoteProps extends BigNoteProps {
  onPress: () => void;
}

type ParamList = {
  Screen1?: object;
  Screen2: BigNoteProps;
};

const MARKDOWN_STYLE = {
  h1: {
    fontSize: 21,
  },
  pre: {
    backgroundColor: 'transparent',
  },
  code: {
    backgroundColor: 'transparent',
  },
  blockquote: {
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 6,
    marginLeft: 0,
    paddingLeft: 8,
  },
  mentionHere: {
    color: 'brown',
    backgroundColor: 'yellow',
  },
  mentionUser: {
    color: 'dodgerblue',
    backgroundColor: 'lightblue',
  },
};

const AnimatedMarkdownTextInput = Animated.createAnimatedComponent(MarkdownTextInput);

function SmallNote({tag, backgroundColor, text, onPress}: SmallNoteProps) {
  const [value, setValue] = React.useState(text);

  return (
    <Pressable onPress={onPress}>
      <AnimatedMarkdownTextInput
        sharedTransitionTag={tag}
        multiline
        value={value}
        onChangeText={setValue}
        editable={false}
        style={[styles.smallNote, {backgroundColor}]}
        pointerEvents="none"
        markdownStyle={MARKDOWN_STYLE}
        autoCapitalize="none"
      />
    </Pressable>
  );
}

const DATA = [
  {
    tag: 'note1',
    backgroundColor: 'lightgreen',
    value: '# React Native Live Markdown\nhttps://github.com/Expensify/react-native-live-markdown\nDrop-in replacement for `<TextInput>` component',
  },
  {tag: 'note2', backgroundColor: '#ffd3fd', value: 'Made with 💖 at *Software Mansion* for *Expensify*'},
  {tag: 'note6', backgroundColor: 'white', value: '# Heading\n*Bold* _italic_ ~strikethrough~\n*_~nested~_*\n`inline code`\n> Blockquote'},
  {tag: 'note4', backgroundColor: 'lightskyblue', value: '```\nyarn add @expensify/react-native-live-markdown\n```'},
  {tag: 'note5', backgroundColor: '#ffac9d', value: 'this is just a `<TextInput>` with some magic'},
  {
    tag: 'note3',
    backgroundColor: 'lemonchiffon',
    value:
      '> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis est a cursus pellentesque. Phasellus id massa sit amet lacus pellentesque maximus molestie in diam. Morbi commodo pellentesque dignissim. Morbi augue nunc, finibus quis dapibus tincidunt, vulputate vel ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed laoreet feugiat enim, sed condimentum lorem varius non. Mauris quis neque venenatis, mattis massa vel, feugiat felis. Phasellus id augue cursus ex vehicula porttitor. ',
  },
  {tag: 'note7', backgroundColor: 'paleturquoise', value: '🌐 Supports Android, iOS & web'},
  {tag: 'note8', backgroundColor: 'lightgray', value: '⌨️ Live synchronous formatting on every keystroke'},
  {tag: 'note9', backgroundColor: 'lavender', value: '⚡ Fully native experience:\n• selection\n• spellcheck\n• autocomplete'},
  {tag: 'note10', backgroundColor: 'wheat', value: '🎨 Customizable styles'},
];

function Screen1({navigation}: NativeStackScreenProps<ParamList, 'Screen1'>) {
  return (
    <MasonryFlashList
      contentContainerStyle={styles.flashlist}
      data={DATA}
      numColumns={2}
      renderItem={({item}) => (
        <SmallNote
          tag={item.tag}
          backgroundColor={item.backgroundColor}
          text={item.value}
          onPress={() => navigation.navigate('Screen2', {tag: item.tag, backgroundColor: item.backgroundColor, text: item.value})}
        />
      )}
      estimatedItemSize={150}
    />
  );
}

function BigNote({tag, backgroundColor, text}: BigNoteProps) {
  const [value, setValue] = React.useState(text);

  return (
    <AnimatedMarkdownTextInput
      sharedTransitionTag={tag}
      multiline
      value={value}
      onChangeText={setValue}
      style={[styles.bigNote, {backgroundColor}]}
      markdownStyle={MARKDOWN_STYLE}
      autoCapitalize="none"
    />
  );
}

function Screen2({route, navigation}: NativeStackScreenProps<ParamList, 'Screen2'>) {
  return (
    <KeyboardAvoidingView
      style={styles.flexOne}
      behavior="padding"
    >
      <View style={styles.screen2}>
        <View
          style={styles.overlay}
          onTouchStart={() => navigation.navigate('Screen1')}
        />
        <BigNote
          tag={route.params.tag}
          backgroundColor={route.params.backgroundColor}
          text={route.params.text}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const Stack = createNativeStackNavigator<ParamList>();

export default function ManyTagsExample() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="Screen1"
          options={{headerTitle: 'Live Markdown Example'}}
          component={Screen1}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{headerShown: false, presentation: 'transparentModal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flashlist: {
    padding: 6,
  },
  flexOne: {
    flex: 1,
  },
  screen2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  smallNote: {
    fontSize: 16,
    margin: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'gold',
    overflow: 'hidden',
    maxHeight: 200,
  },
  bigNote: {
    fontSize: 16,
    width: 300,
    minHeight: 300,
    maxHeight: 300,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'gold',
  },
});
