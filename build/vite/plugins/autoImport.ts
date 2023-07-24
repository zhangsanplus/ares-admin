/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function autoImportDeps() {
  return [
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox...
        ElementPlusResolver({
          importStyle: false,
        }),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/core',
        'pinia',
      ],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dirs: [], // Avoid parsing src/components. 避免解析到src/components
      deep: false,
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: false,
        }),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      dts: 'types/components.d.ts',
    }),

    Icons(),
  ]
}
