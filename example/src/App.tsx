import {
  HeaderBackButton,
  type HeaderBackButtonProps,
} from '@react-navigation/elements';
import type {
  NavigationProp,
  NavigationState,
  PathConfigMap,
} from '@react-navigation/native';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {NavigationContainer, useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  createStackNavigator,
  type StackNavigationProp,
} from '@react-navigation/stack';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import {EXAMPLES} from './examples';
import {useReducedMotion} from 'react-native-reanimated';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function noop() {
  // do nothing
}

type RootStackParamList = {[P in keyof typeof EXAMPLES]: undefined} & {
  Home: undefined;
};

interface HomeScreenProps {
  navigation:
    | StackNavigationProp<RootStackParamList, 'Home'>
    | NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const EXAMPLES_NAMES = Object.keys(EXAMPLES);

function HomeScreen({navigation}: HomeScreenProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [wasClicked, setWasClicked] = React.useState<string[]>([]);

  return (
    <FlatList
      data={EXAMPLES_NAMES}
      initialNumToRender={EXAMPLES_NAMES.length}
      renderItem={({item: name}) => (
        <Item
          icon={EXAMPLES[name]?.icon ?? 'ℹ️'}
          title={EXAMPLES[name]?.title ?? ''}
          onPress={() => {
            navigation.navigate(name);
            if (!wasClicked.includes(name)) {
              setTimeout(() => setWasClicked([...wasClicked, name]), 500);
            }
          }}
          wasClicked={wasClicked.includes(name)}
        />
      )}
      renderScrollComponent={props => <ScrollView {...props} />}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.list}
    />
  );
}

interface ItemProps {
  icon?: string;
  title: string;
  onPress: () => void;
  missingOnFabric?: boolean;
  wasClicked?: boolean;
}

function Item({icon, title, onPress, wasClicked}: ItemProps) {
  const Button = Platform.OS === 'macos' ? Pressable : RectButton;
  return (
    <Button
      style={[styles.button, wasClicked && styles.visitedItem]}
      onPress={onPress}>
      {icon && <Text style={styles.title}>{icon + '  '}</Text>}
      <Text style={styles.title}>{title}</Text>
    </Button>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const Stack =
  Platform.OS === 'macos'
    ? createStackNavigator<RootStackParamList>()
    : createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: [],
  config: {
    screens: EXAMPLES_NAMES.reduce<PathConfigMap<RootStackParamList>>(
      (acc, name) => {
        acc[name] = name;
        return acc;
      },
      {Home: ''},
    ),
  },
};

function BackButton(props: HeaderBackButtonProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <HeaderBackButton {...props} onPress={() => navigation.navigate('Home')} />
  );
}

// copied from https://reactnavigation.org/docs/state-persistence/
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

export default function App() {
  const [isReady, setIsReady] = React.useState(!__DEV__);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (
          Platform.OS !== 'web' &&
          Platform.OS !== 'macos' &&
          initialUrl == null
        ) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState().catch(noop);
    }
  }, [isReady]);

  const persistNavigationState = React.useCallback(
    (state?: NavigationState) => {
      AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state)).catch(noop);
    },
    [],
  );

  const shouldReduceMotion = useReducedMotion();

  if (!isReady) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          {/* <MarkdownPreviewExample /> */}
          {/* <PlaygroundExample /> */}
          <NavigationContainer
            linking={linking}
            initialState={initialState}
            onStateChange={persistNavigationState}>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: 'React-native-live-markdown',
                  title: 'Reanimated examples',
                  headerLeft: Platform.OS === 'web' ? () => null : undefined,
                }}
              />
              {EXAMPLES_NAMES.map(name => (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={EXAMPLES[name]!.screen}
                  options={{
                    headerTitle: EXAMPLES[name]?.title ?? '',
                    animation: shouldReduceMotion ? 'fade' : 'default',
                    title: EXAMPLES[name]?.title ?? '',
                    headerLeft: Platform.OS === 'web' ? BackButton : undefined,
                  }}
                />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  disabledButton: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  visitedItem: {
    backgroundColor: '#e6f0f7',
  },
});
