const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['react-native-live-markdown'],
      },
    },
    argv,
  );
  config.resolve.fallback = {'@react-native-community': path.join(env.projectRoot, '..', 'node_modules', '@react-native-community'), crypto: false};
  return config;
};
