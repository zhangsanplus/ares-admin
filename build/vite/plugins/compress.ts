/**
 * gzip压缩
 * https://github.com/anncwb/vite-plugin-compression
 */
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
  compress: 'gzip' | 'brotli',
  deleteOriginFile = false,
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
