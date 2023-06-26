import { createRouter, createWebHashHistory } from 'vue-router'
import { PathEnum } from '@/enums/page'
import Layout from '@/layout/index.vue'
import createPermissionGuard from './guard'
import demo from './modules/demo'
import directive from './modules/directive'
import exception from './modules/exception'
import external from './modules/external'
import nest from './modules/nest'
import user from './modules/user'
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: PathEnum.LOGIN,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hideMenu: true,
    },
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: PathEnum.DASHBOARD,
    children: [
      {
        path: PathEnum.DASHBOARD,
        name: 'dashboard',
        // component: () => import('@/views/dashboard/index.vue'),
        component: () => import('@/views/analysis/index.vue'),
        meta: {
          title: '首页',
          icon: 'menu-dashboard',
        },
      },
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'Redirect',
          hideMenu: true,
        },
      },
    ],
  },
  directive,
  demo,
  user,
  nest,
  exception,
  external,
  {
    path: '/:pathMatch(.*)*',
    name: 'pathMatch',
    redirect: PathEnum.NOT_FOUND,
    meta: {
      hideMenu: true,
    },
  },
]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

function setupRouter(app: App) {
  app.use(router)
  createPermissionGuard(router)
}

export { router, setupRouter }
