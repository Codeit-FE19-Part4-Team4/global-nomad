import next from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  next.configs['core-web-vitals'],
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  prettier,
  {
    rules: {
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
