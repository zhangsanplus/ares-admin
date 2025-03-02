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

      // // 编译器宏排序
      // 'vue/define-macros-order': [2, {
      //   order: [
      //     'defineOptions',
      //     'defineProps',
      //     'defineEmits',
      //     'defineModel',
      //   ],
      //   defineExposeLast: true, // defineExpose 放在最后
      // }],

      // 导入排序
      // 'import/order': [2, {
      //   groups: [
      //     'builtin', // Node.js 内置模块，如 `fs`, `path` 等
      //     'external', // 第三方模块，从 `node_modules` 导入的模块
      //     'internal', // 项目内部的模块，可以使用通配符,如 `@/**`
      //     'parent', // 父目录中的模块，如 `../../module`
      //     'sibling', // 兄弟目录中的模块，如 `./module`
      //     'index', // 当前目录中的索引模块，如 `./`
      //     'object', // 解构导入的对象，如 `import { named } from 'module'`
      //     'type', // 类型导入，如 `import type { Type } from 'module'`
      //   ],
      //   pathGroups: [
      //     {
      //       pattern: '@/**', // 匹配 @ 开头的路径，作为内部模块处理
      //       group: 'internal', // 归为 internal 组
      //     },
      //     {
      //       pattern: '~/**', // 匹配 ~ 开头的路径，作为内部模块处理
      //       group: 'internal', // 归为 internal 组
      //     },
      //   ],
      //   pathGroupsExcludedImportTypes: ['type'], // 排除类型导入
      //   alphabetize: { order: 'asc', caseInsensitive: false }, // 按字母顺序排列，区分大小写
      // }],
    },
  },
)
