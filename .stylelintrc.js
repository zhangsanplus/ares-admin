module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'no-empty-source': null,
    'alpha-value-notation': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'for', 'else', 'each', 'include', 'mixin'],
      },
    ],
    'color-function-notation': null,
    'color-hex-length': 'short',
    'custom-property-pattern': null,
    'font-family-no-missing-generic-family-keyword': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['fade'],
      },
    ],
    'function-url-quotes': null,
    'no-descending-specificity': null,
    'property-no-vendor-prefix': null,
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(((-{1,2})|(_{2}))[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be BEM, more: http://getbem.com/naming/',
      },
    ],
    'value-no-vendor-prefix': null,
    'declaration-empty-line-before': null,
    'import-notation': 'string',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
      },
    ],
  },
  overrides: [
    {
      files: '**/*.scss',
      customSyntax: 'postcss-scss',
    },
    {
      files: '**/*.html',
      customSyntax: 'postcss-html',
    },
  ],
};
