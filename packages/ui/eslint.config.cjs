const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    ignores: ['dist', 'node_modules', 'storybook-static'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...(tsPlugin.configs.recommended && tsPlugin.configs.recommended.rules),
      ...(reactPlugin.configs.recommended && reactPlugin.configs.recommended.rules),
      ...(reactHooks.configs.recommended && reactHooks.configs.recommended.rules),
      'react/react-in-jsx-scope': 'off',
      // TypeScript gère les types globaux, évite les faux positifs
      'no-undef': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  prettier,
];
