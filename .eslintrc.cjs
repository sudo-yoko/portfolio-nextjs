module.exports = {
  ignorePatterns: ['.eslintrc.*', '*.config.*', 'node_modules', 'dist'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['tsdoc', 'tailwindcss', 'promise'],
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'plugin:tailwindcss/recommended'],
  rules: {
    'tsdoc/syntax': 'warn',
    'jest/expect-expect': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    // TODO: コメントを警告に表示する（TODO: の位置は行頭）
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme', 'hack'], location: 'start' }],
    // 非同期関数にawaitつけ忘れ検知
    '@typescript-eslint/no-floating-promises': 'warn',
    // awaitできないものにawaitがついているものを検知
    '@typescript-eslint/await-thenable': 'error',
  },
  overrides: [
    {
      files: ['*.js', '*.mjs'],
      rules: {
        'tsdoc/syntax': 'off',
      },
    },
  ],
};
