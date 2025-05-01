/**
 * 代码混淆插件示例
 * 该插件会混淆打包后的代码，增加代码难度，防止代码被轻易反编译
 */
import bundleObfuscator from 'vite-plugin-bundle-obfuscator'

export default function configImageminPlugin() {
  return bundleObfuscator({
    log: false,
    threadPool: true,
    autoExcludeNodeModules: {
      enable: true,
      // 手动排除的核心库列表
      manualChunks: [
        'vue',
        'element-plus',
        'echarts',
        '@vueuse',
      ],
    },
    options: {
      compact: true,
      controlFlowFlattening: false,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      // 使用字符串数组，如果生产环境报错：xxx is not a function，可尝试设置为 false
      stringArray: true,
    },
  })
}
