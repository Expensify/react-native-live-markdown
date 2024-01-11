module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-classes'],
};
