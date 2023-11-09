<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cacheList">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import useTabsStore from '@/store/modules/tabs'

const tabsStore = useTabsStore()
const cacheList = computed(() => [...tabsStore.cacheTabList])
</script>
