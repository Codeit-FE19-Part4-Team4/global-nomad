import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next'; // ✅ 추가
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    ignores: ['dist', 'node_modules', '.next', 'out'], // ✅ 변경: .next, out 추가
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'], // ✅ 변경: js, jsx도 포함
    languageOptions: {
      parser: typescriptParser, // ✅ 추가
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node, // ✅ 추가: Next.js는 Node.js 환경도 필요
        ...globals.es2021,
        React: 'readonly', // ✅ 추가: React 타입 네임스페이스 허용
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint, // ✅ 추가
      react: reactPlugin,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin, // ✅ 추가
      import: importPlugin,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // React
      'react/prop-types': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-pascal-case': 'error',
      'react/react-in-jsx-scope': 'off', // ✅ 추가: Next.js는 React import 불필요

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js 특화 규칙 ✅ 추가
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',

      // Import
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // 기타
      curly: ['error', 'all'],
      'no-var': 'error',
      'no-console': 'off', // ✅ 변경: Next.js는 서버 로그 많이 씀
      'no-debugger': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json', // ✅ 변경
        },
      },
    },
  },

  eslintConfigPrettier,
];
