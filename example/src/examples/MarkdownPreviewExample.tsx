import {View, StyleSheet, Text} from 'react-native';
import {useMemo} from 'react';
import {MarkdownTextInput} from '@expensify/react-native-live-markdown';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';

type MarkdownExample = {
  title: string;
  content: string;
};

const MARKDOWN_EXAMPLES: MarkdownExample[] = [
  {
    title: 'Bold Text',
    content: 'Hello, *world*!',
  },
  {
    title: 'Emoji',
    content: '😀🍕🍔',
  },
  {
    title: 'Url',
    content: 'https://expensify.com',
  },
  {
    title: 'Header',
    content: '# header1',
  },
  {
    title: 'Blockquote',
    content: '> blockquote',
  },
  {
    title: 'Inline Code',
    content: '`inline code`',
  },
  {
    title: 'Code Block',
    content: '```\ncodeblock\n```',
  },
  {
    title: 'Mentions',
    content: '@here',
  },
  {
    title: 'Email Mentions',
    content: '@someone@swmansion.com',
  },
  {
    title: 'Hashtag',
    content: '#mention-report',
  },
  {
    title: 'Image',
    content: '![demo image](https://picsum.photos/id/1067/200/300)',
  },
  {
    title: 'Autocorrect',
    content: 'trailing space ',
  },
];

export function MarkdownPreviewExample() {
  const {bottom} = useSafeAreaInsets();

  const style = useMemo(() => ({paddingBottom: bottom}), [bottom]);

  return (
    <ScrollView>
      <View style={[styles.container, style]}>
        {MARKDOWN_EXAMPLES.map(({title, content}) => {
          return (
            <View style={styles.exampleWrapper} key={title}>
              <Text style={styles.header}>{title}</Text>
              <MarkdownTextInput
                multiline
                autoCapitalize="none"
                style={styles.input}
                placeholder="123"
                defaultValue={content}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    gap: 20,
    alignItems: 'center',
  },
  exampleWrapper: {
    gap: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    fontSize: 20,
    width: 350,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: 'rgb(253,253,253)',
  },
});