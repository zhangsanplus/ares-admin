<template>
  <el-container class="app-layout" :style="asideStyle">
    <el-drawer
      v-if="hideMenu"
      :model-value="!appStore.collapsed"
      :with-header="false"
      :size="appStore.menuWidth"
      direction="ltr"
      class="app-layout-drawer"
      @close="handleDrawerClose"
    >
      <app-logo />
      <app-menu />
    </el-drawer>

    <el-aside v-else class="app-layout-sider">
      <app-logo />
      <app-menu />
    </el-aside>

    <el-container class="app-layout-content">
      <el-header class="app-layout-header">
        <app-header />
      </el-header>
      <el-main class="app-layout-main">
        <router-view v-slot="{ Component, route }">
          <!-- <keep-alive> -->
          <component :is="Component" :key="route.fullPath" />
          <!-- </keep-alive> -->
        </router-view>
        <app-footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import AppFooter from './components/app-footer/index.vue'
import AppHeader from './components/app-header/index.vue'
import AppLogo from './components/app-logo/index.vue'
import AppMenu from './components/app-menu/index.vue'

const appStore = useAppStore()
const hideMenu = computed(() => appStore.device === 'mobile')
const asideStyle = computed(() => {
  return {
    '--app-aside-width': appStore.collapsed ? '64px' : `${appStore.menuWidth}px`,
  }
})

function handleDrawerClose() {
  appStore.setCollapse(true)
}

function resizeHandler() {
  const rect = document.body.getBoundingClientRect()
  const isMobile = rect.width - 1 < 992
  appStore.setDevice(isMobile ? 'mobile' : 'desktop')
  appStore.setCollapse(isMobile)
}

const debounceFn = useDebounceFn(resizeHandler, 100)

onBeforeMount(() => {
  resizeHandler()
  window.addEventListener('resize', debounceFn)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', debounceFn)
})
</script>

<style lang="scss">
.app-layout {
  height: 100%;

  &-header {
    width: 100%;
    height: var(--app-header-height);
    padding: 0;
    background-color: var(--el-bg-color-overlay);
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  &-content {
    height: 100%;
  }

  &-sider {
    width: auto;
    height: 100%;
    background-color: var(--el-bg-color-overlay);
  }

  &-main {
    padding: var(--app-margin);
  }

  &-drawer {
    .el-drawer__body {
      height: 100vh;
      padding: 0;
    }
  }
}
</style>
