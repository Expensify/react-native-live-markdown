module.exports = (api) => {
    const isWeb = api.caller((caller) => caller && caller.target === 'web');
    if (isWeb) {
        return {
            // Default browser list is a reasonable preset covering a wide list of non-dead browsers
            // https://github.com/browserslist/browserslist#best-practices
            targets: 'defaults',
            presets: ['@babel/preset-env', '@babel/preset-react'],
        };
    }

    return {
        presets: ['module:metro-react-native-babel-preset'],
    };
};
