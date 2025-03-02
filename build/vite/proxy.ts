import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

/**
 * 开发代理
 * 暂只支持单个代理, 如有多个代理, 自行扩展
 * @param env 环境变量
 */
export function createProxy(env: ImportMetaEnv) {
  const { VITE_DEV_PROXY_PATH, VITE_DEV_PROXY_TARGET } = env
  const proxy: ProxyTargetList = {}

  if (VITE_DEV_PROXY_PATH) {
    proxy[VITE_DEV_PROXY_PATH] = {
      target: VITE_DEV_PROXY_TARGET,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${VITE_DEV_PROXY_PATH}`), ''),
    }
  }

  return proxy
}
