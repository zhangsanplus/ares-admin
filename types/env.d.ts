interface ImportMetaEnv {
  /** 接口地址 */
  VITE_APP_API_BASE_URL: string

  /** 是否在打包时删除 console 代码 */
  VITE_BUILD_DROP_CONSOLE: 'true' | 'false'

  /** 打包生成的文件目录 */
  VITE_BUILD_OUTPUT_DIR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}