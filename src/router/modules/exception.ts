import { PathEnum } from '@/enums/page'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const exception: RouteRecordRaw = {
  path: '/exception',
  name: 'exception',
  component: Layout,
  redirect: PathEnum.NOT_FOUND,
  meta: {
    title: '异常页',
    icon: 'menu-exception',
  },
  children: [
    {
      path: PathEnum.FORBIDDEN,
      name: 'exception403',
      component: () => import('@/views/exception/403.vue'),
      meta: {
        title: '403',
      },
    },
    {
      path: PathEnum.NOT_FOUND,
      name: 'exception404',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: '404',
      },
    },
  ],
}

export default exception