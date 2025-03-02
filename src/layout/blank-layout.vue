<template>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive :include="cacheList">
      <component :is="Component" :key="route.fullPath" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
import useTabsStore from '@/store/modules/tabs'

const tabsStore = useTabsStore()
const cacheList = computed(() => [...tabsStore.cacheTabList])
</script>
