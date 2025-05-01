import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME_ENUM } from '@/constants'
import Layout from '@/layout/index.vue'

const exception: RouteRecordRaw = {
  path: '/exception',
  name: 'exception',
  component: Layout,
  redirect: '/exception/404',
  meta: {
    title: '异常页',
    icon: 'menu-exception',
    order: 39,
  },
  children: [
    {
      path: '/exception/404',
      name: ROUTE_NAME_ENUM.NOT_FOUND,
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: '404',
      },
    },
    {
      path: '/exception/403',
      name: ROUTE_NAME_ENUM.FORBIDDEN,
      component: () => import('@/views/exception/403.vue'),
      meta: {
        title: '403',
      },
    },
  ],
}

export default exception
