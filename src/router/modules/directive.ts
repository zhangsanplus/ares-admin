import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const directive: RouteRecordRaw = {
  path: '/directive',
  name: 'directive',
  component: Layout,
  redirect: '/directive/index',
  meta: {
    title: '常用指令',
    order: 99,
  },
  children: [
    {
      path: '/directive/index',
      name: 'directiveIndex',
      component: () => import('@/views/directive/index.vue'),
      meta: {
        title: '自定义指令',
        icon: 'menu-directive',
      },
    },
  ],
}

export default directive