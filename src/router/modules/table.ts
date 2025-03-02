import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const table: RouteRecordRaw = {
  path: '/table',
  name: 'table',
  component: Layout,
  redirect: '/table/table1',
  meta: {
    title: '表单表格',
    icon: 'menu-table',
    order: 79,
  },
  children: [
    {
      path: '/table/table1',
      name: 'table1',
      component: () => import('@/views/demo/table/table1.vue'),
      meta: {
        title: '查询表格',
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
    {
      path: '/table/table3',
      name: 'table3',
      component: () => import('@/views/demo/table/table3.vue'),
      meta: {
        title: '表格示例',
      },
    },
    {
      path: '/table/form1',
      name: 'form1',
      component: () => import('@/views/demo/table/form1.vue'),
      meta: {
        title: '表单示例',
      },
    },

  ],
}

export default table
