<template>
  <div class="app-logo">
    <img src="/logo.svg" alt="logo" width="32">
    <div v-show="!appStore.collapsed" class="app-name">
      {{ appStore.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
</script>

<style lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  height: var(--app-navbar-height);
  padding: 0 16px;
  overflow: hidden;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.app-name {
  padding-left: 8px;
  font-weight: 500;
  font-size: 17px;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
