import type { PluginOption } from 'vite'
import process from 'node:process'
import vueLegacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configUnplugin } from './unplugin'

/**
 * @name createVitePlugins
 * @description Vite 插件
 */
export function createVitePlugins(isBuild: boolean) {
  // 基础插件
  const vitePlugins: PluginOption[] = [
    vue(),
    vueJsx(),
  ]

  // unplugin 相关插件
  vitePlugins.push(...configUnplugin())

  // 生产环境插件
  if (isBuild) {
    vitePlugins.push(configHtmlPlugin())
    vitePlugins.push(configCompressPlugin('gzip'))
  }

  // 语法降级插件
  if (process.env.LEGACY === 'true') {
    vitePlugins.push(
      vueLegacy({
        targets: [
          'defaults',
          'not IE 11',
          'Chrome >= 60',
          'Firefox >= 60',
          'Safari >= 10',
        ],
        renderModernChunks: false, // 仅生成传统包，开启后生成现代包（ESM）和传统包（降级语法）
      }),
    )
  }

  // 打包分析插件
  if (process.env.REPORT === 'true') {
    vitePlugins.push(visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }))
  }

  return vitePlugins
}
