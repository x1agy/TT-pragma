module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js'],
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'simple-import-sort'],
  rules: {
    'no-shadow': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/require-await': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          [
            // imports not module styles
            '^((?!module).)*\\.?(s?css)$',
            // Packages `react` related packages come first.
            '^react$',
            '^@?\\w',
          ],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          [
            // Side effect imports.
            '^\\u0000',
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          // Icons
          ['.svg\\?react$'],
          // Style imports.
          ['^.+module\\.?(s?css)$'],
        ],
      },
    ],
  },
};
