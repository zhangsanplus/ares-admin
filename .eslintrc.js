module.exports = {
  root: true,
  extends: ['@antfu'],
  rules: {
    '@typescript-eslint/brace-style': 0,
    '@typescript-eslint/semi': 2,
    'semi': 2,
    'curly': 0,
    'eol-last': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    // antfu
    'antfu/if-newline': 0,
    // vue
    'vue/component-name-in-template-casing': [2, 'kebab-case'],
    'vue/component-tags-order': [
      2,
      {
        order: [
          'template',
          'script',
          'style',
        ],
      },
    ],
    // 模块引入顺序
    'import/order': [
      2,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroupsExcludedImportTypes: ['type'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
      },
    ],
  },
}
