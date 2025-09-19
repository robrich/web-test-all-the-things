export default [
  { ignores: ['node_modules', 'dist'] },
  (await import('@eslint/js')).default.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: (await import('globals')).browser,
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'padded-blocks': 'off',
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }]
    }
  },
  ...((await import('typescript-eslint')).default.configs.recommended),
  ...((await import('eslint-plugin-vue')).default.configs['flat/essential'] ?? []),
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: (await import('typescript-eslint')).default.parser }
    }
  },
];
