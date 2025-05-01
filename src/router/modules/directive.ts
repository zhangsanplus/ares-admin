import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const directive: RouteRecordRaw = {
  path: '/directive',
  name: 'directive',
  component: Layout,
  redirect: '/directive/index',
  meta: {
    title: '常用指令',
    order: 69,
  },
  children: [
    {
      path: '/directive/index',
      name: 'directiveIndex',
      component: () => import('@/views/demo/directive/index.vue'),
      meta: {
        title: '自定义指令',
        icon: 'menu-directive',
      },
    },
  ],
}

export default directive
