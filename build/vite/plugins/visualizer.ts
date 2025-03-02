/**
 * 生成打包分析
 */
import { visualizer } from 'rollup-plugin-visualizer'

export function configVisualizerPlugin() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  })
}
