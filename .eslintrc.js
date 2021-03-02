const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
  .reduce((acc, rule) => { acc[`jsx-a11y/${rule}`] = 'off'; return acc; }, {});

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    ...a11yOff,
    'operator-assignment': [
      2,
      'never',
    ],
    'prefer-destructuring': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
  },
};
