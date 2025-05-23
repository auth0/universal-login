// eslint.config.js
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unsafe-optional-chaining': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.test.ts', '**/*.spec.ts'] }
      ],
      'no-implicit-globals': 'error',
      'no-shadow': 'error',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
];
