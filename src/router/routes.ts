import { HOME_ROUTE_INFO, RouteNameEnum } from '@/enums/route'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', { import: 'default', eager: true })

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

const BASE_ROUTE: RouteRecordRaw = {
  path: '/',
  name: 'layout',
  component: Layout,
  redirect: '/dashboard',
  children: [
    {
      ...HOME_ROUTE_INFO,
      component: () => import('@/views/dashboard/index.vue'),
    },
    {
      path: '/redirect/:path(.*)',
      name: RouteNameEnum.REDIRECT,
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
  name: RouteNameEnum.LOGIN,
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    hideMenu: true,
  },
}

const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'pathMatch',
  redirect: '/exception/404',
  meta: {
    hideMenu: true,
  },
}

const appRoutes = formatModules(modules, [])

appRoutes.sort((a, b) => {
  return (b.meta?.order ?? 0) - (a.meta?.order ?? 0)
})

export const routes: RouteRecordRaw[] = [
  LOGIN_ROUTE,
  BASE_ROUTE,
  ...appRoutes,
  NOT_FOUND_ROUTE,
]
