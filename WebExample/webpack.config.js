const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const pak = require('../package.json');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [pak.name],
      },
    },
    argv
  );
  return config;
};
