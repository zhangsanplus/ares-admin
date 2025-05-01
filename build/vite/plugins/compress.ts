/**
 * gzip 压缩
 * https://github.com/anncwb/vite-plugin-compression
 */
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
  compress: 'gzip' | 'brotli', // 压缩算法，可选 'gzip' 或 'brotli'
  deleteOriginFile = false, // 是否删除原始文件
) {
  if (compress === 'brotli') {
    return compressPlugin({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile,
    })
  }

  return compressPlugin({
    ext: '.gz',
    deleteOriginFile,
  })
}
