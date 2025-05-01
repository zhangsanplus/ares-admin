// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'dist-*',
      '.history',
    ],
  },
  {
    rules: {
      // 禁用必须使用大括号的规则
      'antfu/curly': 0,

      // 禁用 antfu 插件中的 if-newline 规则
      'antfu/if-newline': 0,

      // 允许使用 console
      'no-console': 0,

      // 函数前后需要空行
      'style/padding-line-between-statements': [
        2,
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
      ],

      // 禁用控制代码块的风格规则
      'style/brace-style': [2, '1tbs', { allowSingleLine: true }],

      // 组件中模板中组件名应使用 kebab-case
      'vue/component-name-in-template-casing': [
        2,
        // 'kebab-case',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],

      // 属性换行
      'vue/max-attributes-per-line': [2, {
        singleline: { max: 3 }, // 单行最多允许 3 个属性
        multiline: { max: 1 }, // 多行最多允许 1 个属性
      }],

      // 规定 Vue 组件中块的顺序为 template、script、style
      'vue/block-order': [2, { order: ['template', 'script', 'style'] }],
    },
  },
)
