import type { ConfigEnv, UserConfig } from 'vite'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createProxy, createVitePlugins } from './build/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const isBuild = command === 'build'
  const isProd = mode === 'production'
  const env = loadEnv(mode, root) as ImportMetaEnv

  return {
    base: './',
    resolve: {
      alias: [
        {
          find: /^@\/(.*)/,
          replacement: `${fileURLToPath(new URL('./src/', import.meta.url))}$1`,
        },
      ],
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_DEV_PORT,
      proxy: createProxy(env),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    esbuild: {
      pure: isProd ? ['console.log'] : [],
      drop: isProd ? ['debugger'] : [],
      legalComments: 'none',
    },
    build: {
      outDir: env.VITE_BUILD_OUTPUT_DIR,
      chunkSizeWarningLimit: 2 * 1024, // chunk 大小警告阈值（2MB）
      assetsInlineLimit: 4 * 1024, // 小于 4KB 的资源转为 Base64 内联
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 30 * 1024, // 最小 chunk 大小（30KB）
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus', '@element-plus/icons-vue'],
          },
        },
      },
    },
    plugins: createVitePlugins(isBuild),
  }
})
