import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const demo: RouteRecordRaw = {
  path: '/demo',
  name: 'demo',
  component: Layout,
  redirect: '/demo/form',
  meta: {
    title: '常用组件',
    icon: 'menu-demo',
  },
  children: [
    {
      path: '/demo/form',
      name: 'form',
      component: () => import('@/views/demo/form/index.vue'),
      meta: {
        title: '查询表单',
      },
    },
    {
      path: '/demo/table',
      name: 'table',
      component: () => import('@/views/demo/table/index.vue'),
      meta: {
        title: '查询表格',
      },
    },
  ],
}

export default demo