const path = require('path');
const pak = require('../package.json');

/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
  bundleMode: true,
  strictGlobal: true,
  importForwarding: {
    moduleNames: ['expensify-common', '@expensify/react-native-live-markdown'],
    relativePaths: ['react-native-live-markdown/src/'],
  },
};

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
    ['react-native-worklets/plugin', workletsPluginOptions],
  ],
};
