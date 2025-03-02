<template>
  <ElConfigProvider :locale="zhCn" :size="appStore.size">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import useAppStore from './store/modules/app'

const appStore = useAppStore()
</script>
