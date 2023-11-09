<template>
  <div class="app-header">
    <app-toggle />
    <app-breadcrumb v-if="!isMobile" />
    <app-nav-bar />
  </div>
</template>

<script setup lang='ts'>
import useAppStore from '@/store/modules/app'
import AppBreadcrumb from './app-breadcrumb.vue'
import AppNavBar from './app-nav-bar.vue'
import AppToggle from './app-toggle.vue'

const appStore = useAppStore()
const isMobile = computed(() => appStore.device === 'mobile')
</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--app-navbar-height));
  border-bottom: 1px solid var(--el-border-color-lighter);
}
</style>
