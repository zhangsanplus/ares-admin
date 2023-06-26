import BlankLayout from '@/layout/blank-layout.vue'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const nest: RouteRecordRaw = {
  path: '/nest',
  name: 'nest',
  component: Layout,
  redirect: '/nest/nest1',
  meta: {
    title: '多级菜单',
    icon: 'menu-nest',
  },
  children: [
    {
      path: '/nest/nest1',
      name: 'nest1',
      component: () => import('@/views/nest/index.vue'),
      meta: {
        title: '测试1',
      },
    },
    {
      path: '/nest/nest2',
      name: 'nest2',
      component: () => import('@/views/nest/index.vue'),
      meta: {
        title: '测试2',
      },
    },
    {
      path: '/nest/nest3',
      name: 'nest3',
      component: BlankLayout,
      redirect: '/nest/nest3/1',
      meta: {
        title: '测试3',
      },
      children: [
        {
          path: '/nest/nest3/1',
          name: 'nest3-1',
          component: () => import('@/views/nest/index.vue'),
          meta: {
            title: '测试3-1',
          },
        },
        {
          path: '/nest/nest3/2',
          name: 'nest3-2',
          component: () => import('@/views/nest/index.vue'),
          meta: {
            title: '测试3-2',
          },
        },
      ],
    },
  ],
}

export default nest