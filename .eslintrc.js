module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  extends: [
    'expensify',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: [
    'react',
    'react-native',
    'import',
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
  ],
  settings: {
    'import/resolver': {
      alias: [['@expensify/react-native-live-markdown', './src/index.tsx']],
    },
  },
  root: true,
  rules: {
    'rulesdir/prefer-underscore-method': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
    'import/no-unresolved': 'error', // no in app
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off', // TODO consider enabling this (currently it reports styles defined at the bottom of the file)
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: false },
    ],
    'tsdoc/syntax': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'no-underscore-dangle': 'off',
    'es/no-nullish-coalescing-operators': 'off',
    'es/no-optional-chaining': 'off',
  },
};
