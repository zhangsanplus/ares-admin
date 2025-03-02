import type { PluginOption } from 'vite'
import process from 'node:process'
import vueLegacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configUnplugin } from './unplugin'
import { configVisualizerPlugin } from './visualizer'

/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: PluginOption[] = [
    vue(),
    vueJsx(),
    ...configUnplugin(),
  ]

  // 生产环境
  if (isBuild) {
    vitePlugins.push(vueLegacy())
    vitePlugins.push(configHtmlPlugin())
    vitePlugins.push(configCompressPlugin('gzip'))
  }

  // 打包分析
  if (process.env.REPORT === 'true') {
    vitePlugins.push(configVisualizerPlugin())
  }

  return vitePlugins
}
