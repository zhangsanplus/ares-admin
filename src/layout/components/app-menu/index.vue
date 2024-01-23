<template>
  <el-scrollbar class="app-menu">
    <el-menu :default-active="activeMenu" :collapse="isCollapse">
      <app-sub-item :menu-list="menuItems" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang='ts'>
import { routes } from '@/router/routes'
import { filterRoutes, transformRouteToMenu } from '@/router/utils'
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import AppSubItem from './app-sub-item.vue'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const activeMenu = computed(() => route.meta?.activeMenu ?? route.path)
const isCollapse = computed(() => appStore.collapsed)

const menuItems = computed(() => {
  const allRoutes = [...routes, ...userStore.asyncRoutes]

  // 过滤掉不展示在菜单中的路由
  const filteredRoutes = filterRoutes(allRoutes, (route) => {
    if (route.meta?.hideMenu) return false
    // return userStore.hasRole(route.meta?.role)
    return true
  })

  // 菜单排序
  filteredRoutes.sort((a, b) => {
    return (b.meta?.order ?? 0) - (a.meta?.order ?? 0)
  })

  // 路由数据转为菜单数据
  return transformRouteToMenu(filteredRoutes)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
