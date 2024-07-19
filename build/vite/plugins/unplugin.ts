/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function unpluginDeps() {
  return [
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox...
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
      ],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dirs: [], // 避免解析到src/components
      deep: false,
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: false,
        }),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
          customCollections: ['custom', 'custom-menu'],
        }),
      ],
      dts: 'types/components.d.ts',
    }),

    // https://github.com/unplugin/unplugin-icons
    Icons({
      compiler: 'vue3',
      defaultStyle: 'vertical-align: -0.15em;fill: currentcolor;',
      customCollections: {
        'custom': FileSystemIconLoader('src/icons'),
        'custom-menu': FileSystemIconLoader('src/icons/menu'),
      },
      iconCustomizer(collection, icon, props) {
        props.width = '1em'
        props.height = '1em'
      },
    }),
  ]
}
