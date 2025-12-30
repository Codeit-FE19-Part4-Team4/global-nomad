import next from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
  next.configs['core-web-vitals'],
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  prettier,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // ✅ React Hooks 규칙 추가
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고
      // 일반
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // import
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js 내장 모듈
            'external', // npm 패키지
            'internal', // 프로젝트 내부 절대경로
            'parent', // ../
            'sibling', // ./
            'index', // ./index
          ],
          'newlines-between': 'always', // 그룹 사이 빈 줄
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'off',
    },
  },
];
