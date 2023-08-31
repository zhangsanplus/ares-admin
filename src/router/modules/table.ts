import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const table: RouteRecordRaw = {
  path: '/table',
  name: 'table',
  component: Layout,
  redirect: '/table/form',
  meta: {
    title: '表单表格',
    icon: 'menu-table',
    order: 98,
  },
  children: [
    {
      path: '/table/form',
      name: 'form',
      component: () => import('@/views/demo/form/index.vue'),
      meta: {
        title: '查询表单',
      },
    },
    {
      path: '/table/table1',
      name: 'table',
      component: () => import('@/views/demo/table/table1.vue'),
      meta: {
        title: '查询表格',
      },
    },
    {
      path: '/table/table3',
      name: 'table3',
      component: () => import('@/views/demo/table/table3.vue'),
      meta: {
        title: '表格示例',
      },
    },
    {
      path: '/table/table2',
      name: 'table2',
      component: () => import('@/views/demo/table/table2.vue'),
      meta: {
        title: 'UseTable',
      },
    },
  ],
}

export default table