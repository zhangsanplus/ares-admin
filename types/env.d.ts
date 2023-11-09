interface ImportMetaEnv {
  /** 环境变量 */
  VITE_APP_ENV: 'production' | 'development' | 'test'

  /** 项目名称 */
  VITE_APP_NAME: string

  /** 端口号 */
  VITE_DEV_PORT: number

  /** 开发代理路径 */
  VITE_DEV_PROXY_PATH?: string

  /** 开发代理域名 */
  VITE_DEV_PROXY_TARGET?: string

  /** 打包生成的文件目录 */
  VITE_BUILD_OUTPUT_DIR: string

  /** 接口地址 */
  VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
