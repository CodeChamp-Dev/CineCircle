/* Base ESLint configuration for CineCircle monorepo */
module.exports = {
  root: true,
  env: { node: true, es2022: true, browser: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { project: null, ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint','import','unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: { 'import/resolver': { typescript: { project: './tsconfig.base.json' } } },
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'import/order': [
      'error',
      { groups: ['builtin','external','internal','parent','sibling','index'], 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } }
    ],
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  overrides: [
    {
      files: ['**/*.ts','**/*.tsx'],
      excludedFiles: ['dist/**']
    }
  ]
};
