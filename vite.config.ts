import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugins'
import proxy from './build/vite/proxy'
import type { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const isBuild = command === 'build'
  const { VITE_BUILD_OUTPUT_DIR, VITE_DROP_CONSOLE } = loadEnv(mode, root) as ImportMetaEnv

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
    plugins: createVitePlugins(isBuild),
    server: {
      host: '0.0.0.0',
      port: 2023,
      https: false,
      proxy,
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE === 'true' ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: VITE_BUILD_OUTPUT_DIR,
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
