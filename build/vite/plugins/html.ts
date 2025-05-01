/**
 * @description HTML中增加构建日期
 */
import type { Plugin } from 'vite'

export function configHtmlPlugin() {
  const plugin: Plugin = {
    name: 'build-date',
    apply: 'build',
    transformIndexHtml(html) {
      const buildDate = new Date().toLocaleString()
      return html.replace('<head>', `<head>\n    <meta name="build-date" content="${buildDate}">`)
    },
  }
  return plugin
}
