import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const user: RouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: Layout,
  redirect: '/user/setting',
  meta: {
    title: '个人信息',
    icon: 'menu-user',
    alwaysShow: true,
  },
  children: [
    {
      path: '/user/setting',
      name: 'userSetting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        title: '用户设置',
      },
    },
    {
      path: '/user/list',
      name: 'userList',
      component: () => import('@/views/user/list/index.vue'),
      meta: {
        title: '用户管理',
        role: [1],
      },
    },
    {
      path: '/user/create',
      name: 'userCreate',
      component: () => import('@/views/user/create/index.vue'),
      meta: {
        title: '新增用户',
        activeMenu: '/user/list',
        hideMenu: true,
      },
    },
  ],
}

export default user