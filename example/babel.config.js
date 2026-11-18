const path = require('path');
const pak = require('../package.json');

const monorepoRootPath = path.resolve(__dirname, '..');

/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
  bundleMode: process.env.BUNDLE_MODE === '1',
  strictGlobal: true,
  importForwarding: {
    moduleNames: [
      'expensify-common',
      'html-entities',
      'react-native-live-markdown',
    ],
    /**
     * The following relative paths look like this due to monorepo structure.
     * In a consumer app this wouldn't be necessary.
     */
    relativePaths: [
      path.join(monorepoRootPath, 'src'),
      path.join(monorepoRootPath, 'lib'),
    ],
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
