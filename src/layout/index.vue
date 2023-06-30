<template>
  <div class="app-layout" :class="{ 'is-mobile': hideMenu }" :style="asideStyle">
    <el-drawer
      v-if="hideMenu"
      direction="ltr"
      class="app-layout-drawer"
      :model-value="!appStore.collapsed"
      :size="appStore.menuWidth"
      :with-header="false"
      :lock-scroll="false"
      @close="handleDrawerClose"
    >
      <app-logo />
      <app-menu />
    </el-drawer>

    <div v-else class="app-layout-sider">
      <app-logo />
      <app-menu />
    </div>

    <section class="app-layout-content">
      <header class="app-layout-header">
        <app-header />
      </header>

      <main class="app-layout-main">
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </router-view>
        <app-footer />
      </main>
    </section>
  </div>
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

  &.is-mobile {
    .app-layout-content {
      padding-left: 0;
    }
  }

  &-content {
    padding-left: var(--app-aside-width);
    transition: padding .3s ease-in-out;
  }

  &-drawer {
    .el-drawer__body {
      height: 100vh;
      padding: 0;
    }
  }

  &-sider {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--app-aside-width);
    height: 100vh;
    background-color: var(--el-bg-color-overlay);
    transition: width .3s ease-in-out;
  }

  &-header {
    position: sticky;
    top: 0;
    z-index: 10;
    height: var(--app-header-height);
    background-color: var(--el-bg-color-overlay);
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  &-main {
    padding: var(--app-margin);
  }
}
</style>
