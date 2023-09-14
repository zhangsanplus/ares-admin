import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { createProxy, createVitePlugins } from './build/vite'
import type { ConfigEnv, UserConfig } from 'vite'

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
          find: /@\//,
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
      ],
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_DEV_PORT,
      https: false,
      proxy: createProxy(env),
    },
    esbuild: {
      pure: isProd ? ['console.log', 'debugger'] : [],
    },
    plugins: createVitePlugins(isBuild),
    build: {
      outDir: env.VITE_BUILD_OUTPUT_DIR,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
          },
        },
      },
    },
  }
})
