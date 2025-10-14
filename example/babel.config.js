const path = require('path');
const pak = require('../package.json');

let workletsPlugin = null;
try {
  require.resolve('react-native-worklets');
  workletsPlugin = 'react-native-worklets/plugin';
} catch (e) {
  workletsPlugin = 'react-native-reanimated/plugin';
}

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pak.name]: path.join(__dirname, '..', pak.source),
        },
      },
    ],
    workletsPlugin,
  ],
};
