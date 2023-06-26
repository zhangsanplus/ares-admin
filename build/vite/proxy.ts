import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

const API_BASE_URL = '/api'
const API_TARGET_URL = 'http://localhost:3000'

const init: ProxyTargetList = {
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: path => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
  },
}

export default init
