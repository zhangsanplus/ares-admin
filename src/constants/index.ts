/**
 * 权限枚举
 */
export const AUTH_EMUM = {
  ADD: 'ADD', // 新增
  EDIT: 'EDIT', // 修改
  DELETE: 'DELETE', // 删除
  DETAILS: 'DETAILS', // 详情
} as const

/**
 * 路由名称枚举
 */
export const ROUTE_NAME_ENUM = {
  LOGIN: 'login', // 登录页
  DASHBOARD: 'dashboard', // 首页
  REDIRECT: 'redirect', // 重定向页
  FORBIDDEN: 'forbidden', // 403
  NOT_FOUND: 'notfound', // 404
  NOT_MATCH: 'notMatch', // 不匹配
} as const

/**
 * 首页路由信息
 */
export const HOME_ROUTE_INFO = {
  path: '/dashboard',
  name: ROUTE_NAME_ENUM.DASHBOARD,
  meta: {
    title: '首页',
    icon: 'menu-dashboard',
    affixTab: true,
    cache: true,
  },
}
