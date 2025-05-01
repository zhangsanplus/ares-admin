/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 * TODO: TSX 中无法自动导入 Element Plus 组件，需要手动导入
 */
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function configUnplugin() {
  return [
    // 自动导入函数、指令等
    AutoImport({
      resolvers: [
        ElementPlusResolver({ importStyle: false }),
      ],
      dirs: ['src/composables'],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'types/auto-imports.d.ts',
    }),

    // 自动导入组件
    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: false }),
        IconsResolver({
          enabledCollections: ['ep'],
          customCollections: ['custom'],
        }),
      ],
      // dirs: [], // 避免解析到src/components
      dirs: ['src/components/x-*'],
      extensions: ['vue', 'tsx'],
      deep: false,
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
