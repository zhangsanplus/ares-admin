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
    order: 98,
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
      path: '/demo/table1',
      name: 'table',
      component: () => import('@/views/demo/table/table1.vue'),
      meta: {
        title: '查询表格',
      },
    },
    {
      path: '/demo/table2',
      name: 'table2',
      component: () => import('@/views/demo/table/table2.vue'),
      meta: {
        title: 'UseTable',
      },
    },
  ],
}

export default demo