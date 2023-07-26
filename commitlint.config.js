module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     新的特性' },
      { value: 'fix', name: 'fix:      修复缺陷' },
      { value: 'docs', name: 'docs:     文档或注释变更' },
      { value: 'style', name: 'style:    空格，分号等格式修复' },
      { value: 'refactor', name: 'refactor: 代码重构，注意和特性、修复区分开' },
      { value: 'chore', name: 'chore:    开发工具变动(构建、脚手架工具等)' },
      { value: 'perf', name: 'perf:     性能优化' },
      { value: 'revert', name: 'revert:   代码回退' },
      { value: 'test', name: 'test:     添加或修改测试' },
      { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
    ],
  },
}