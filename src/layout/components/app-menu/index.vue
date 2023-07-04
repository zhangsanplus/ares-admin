<template>
  <el-menu class="app-menu" :default-active="activeMenu" :collapse="isCollapse">
    <app-sub-item :menu-list="menuList" />
  </el-menu>
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

const list = filterRoutes(routes, (route) => {
  if (route.meta?.hideMenu === true) {
    return false
  }
  return userStore.hasRole(route.meta?.role)
})

const menuList = transformRouteToMenu(list)
</script>

<style lang="scss">
@import './index.scss';
</style>