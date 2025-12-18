import nextPlugin from '@next/eslint-plugin-next';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist', 'node_modules', '.next', 'out', 'commitlint.config.cjs'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs.recommended,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'no-console': 'warn',
    },
  },
];
