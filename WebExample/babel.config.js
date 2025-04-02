const path = require('path');
const pak = require('../package.json');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            react: path.join(__dirname, '..', 'node_modules', 'react'),
            'react-native': path.join(__dirname, '..', 'node_modules', 'react-native-web'),
            [pak.name]: path.join(__dirname, '..', pak.source),
          },
        },
      ],
    ],
  };
};
