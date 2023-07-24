/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import vueLegacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { autoImportDeps } from './autoImport'
import { svgIconsPlugin } from './svgIcons'
import type { PluginOption } from 'vite'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: PluginOption[] = [
    vue(),
    vueJsx(),
    // setup name
    vueSetupExtend(),
    // svg
    svgIconsPlugin(isBuild),
    // 自动引入组件和图标
    // 自动按需注册组件
    ...autoImportDeps(),
  ]

  if (isBuild) {
    // 旧版浏览器支持
    vitePlugins.push(vueLegacy())

    // gzip压缩
    // vitePlugins.push(configCompressPlugin('gzip'))
  }

  return vitePlugins
}
