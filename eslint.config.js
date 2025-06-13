const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'prettier': prettier,
      'import': importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'comma-dangle': 'off',
      'no-unused-vars': 'off',
      'camelcase': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: {
      'prettier': prettier,
      'import': importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'comma-dangle': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  }
); 