module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  extends: [
    'expensify',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
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
    'import/no-unresolved': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off', // TODO consider enabling this (currently it reports styles defined at the bottom of the file)
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-var-requires': 'warn',
    'eqeqeq': 'error',
    'no-unreachable': 'error',
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
  },
};
