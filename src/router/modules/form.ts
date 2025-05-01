import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const form: RouteRecordRaw = {
  path: '/form',
  name: 'form',
  component: Layout,
  redirect: '/form/form1',
  meta: {
    title: '表单示例',
    order: 78,
  },
  children: [
    {
      path: '/form/form1',
      name: 'form1',
      component: () => import('@/views/demo/form/form1.vue'),
      meta: {
        title: '表单组件',
        icon: 'menu-form',
      },
    },
  ],
}

export default form
