<template>
  <el-menu class="app-menu" :default-active="activeMenu" :collapse="isCollapse">
    <app-sub-item :menu-list="menuList" />
  </el-menu>
</template>

<script setup lang='ts'>
import { routes } from '@/router'
import { filterRoute, transformRouteToMenu } from '@/router/utils'
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import AppSubItem from './app-sub-item.vue'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const activeMenu = computed(() => route.meta?.activeMenu ?? route.path)
const isCollapse = computed(() => appStore.collapsed)

const filterRoutes = filterRoute(routes, (route) => {
  if (route.meta?.hideMenu === true) {
    return false
  }
  return userStore.hasRole(route.meta?.role)
})
const menuList = transformRouteToMenu(filterRoutes)
</script>

<style lang="scss">
.app-menu {
  height: calc(100% - var(--app-header-height));
}
</style>