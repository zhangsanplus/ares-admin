import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const external: RouteRecordRaw = {
  path: '/external',
  name: 'external',
  component: Layout,
  children: [
    {
      path: 'https://github.com/zhangsanplus/ares-admin',
      name: 'router4',
      component: () => null,
      meta: {
        title: 'github',
        icon: 'menu-link',
      },
    },
  ],
}

export default external
