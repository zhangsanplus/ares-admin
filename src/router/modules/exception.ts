import { RouteNameEnum } from '@/enums/route'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const exception: RouteRecordRaw = {
  path: '/exception',
  name: 'exception',
  component: Layout,
  redirect: '/exception/404',
  meta: {
    title: '异常页',
    icon: 'menu-exception',
    order: -11,
  },
  children: [
    {
      path: '/exception/404',
      name: RouteNameEnum.NOT_FOUND,
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: '404',
      },
    },
    {
      path: '/exception/403',
      name: RouteNameEnum.FORBIDDEN,
      component: () => import('@/views/exception/403.vue'),
      meta: {
        title: '403',
      },
    },
  ],
}

export default exception