/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import vueLegacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { unpluginDeps } from './unplugin'
import type { PluginOption } from 'vite'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: PluginOption[] = [
    vue(),
    // jsx 语法支持
    vueJsx(),
    // 自动导入组件和字体图标等
    ...unpluginDeps(),
  ]

  if (isBuild) {
    // 旧版浏览器支持
    vitePlugins.push(vueLegacy())

    // gzip压缩
    // vitePlugins.push(configCompressPlugin('gzip'))
  }

  return vitePlugins
}
