import type { RouteRecordRaw } from 'vue-router'

const asyncRoutes: Record<string, RouteRecordRaw> = {
  'async-route': {
    path: '/async-route',
    name: 'async-route',
    component: () => import('@/layout/index.vue'),
    redirect: '/async-route/test1',
    meta: {
      title: '动态路由',
      icon: 'menu-route',
      order: 49,
    },
    children: [],
  },
  'async-route-1': {
    path: '/async-route/test1',
    name: 'async-route-test1',
    component: () => import('@/views/demo/test.vue'),
    meta: {
      title: '权限路由1',
      icon: 'menu-directive',
    },
  },
  'async-route-2': {
    path: '/async-route/test2',
    name: 'async-route-test2',
    component: () => import('@/views/demo/test.vue'),
    meta: {
      title: '权限路由2',
      icon: 'menu-directive',
    },
  },
}

export default asyncRoutes
