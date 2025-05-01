import type { RouteRecordRaw } from 'vue-router'
import { HOME_ROUTE_INFO, ROUTE_NAME_ENUM } from '@/constants'
import Layout from '@/layout/index.vue'

const BASE_ROUTE: RouteRecordRaw = {
  path: '/',
  name: 'layout',
  component: Layout,
  redirect: '/dashboard',
  meta: { order: 99 },
  children: [
    {
      ...HOME_ROUTE_INFO,
      component: () => import('@/views/dashboard/index.vue'),
    },
    {
      path: '/redirect/:path(.*)',
      name: ROUTE_NAME_ENUM.REDIRECT,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: 'Redirect',
        hideMenu: true,
      },
    },
  ],
}

const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: ROUTE_NAME_ENUM.LOGIN,
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    hideMenu: true,
  },
}

function formatModules(_modules: Record<string, any>, result: RouteRecordRaw[]) {
  Object.keys(_modules).forEach((key) => {
    const _module = _modules[key]
    if (!_module) return
    const moduleList = Array.isArray(_module)
      ? [..._module]
      : [_module]
    result.push(...moduleList)
  })
  return result
}

const modules = import.meta.glob(['./modules/*.ts'], { import: 'default', eager: true })
const appRoutes = formatModules(modules, [])

export const routes: RouteRecordRaw[] = [
  LOGIN_ROUTE,
  BASE_ROUTE,
  ...appRoutes,
]
