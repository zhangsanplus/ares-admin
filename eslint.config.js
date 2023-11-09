import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'curly': 0,
    'no-console': 0,
    'style/brace-style': 0,
    'antfu/if-newline': 0,
    'import/order': [2, {
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
    }],
  },
  overrides: {
    vue: {
      'vue/block-order': [2, {
        order: ['template', 'script', 'style'],
      }],
      'vue/component-name-in-template-casing': [2, 'kebab-case', {
        registeredComponentsOnly: false,
      }],
    },
  },
})
