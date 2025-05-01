<template>
  <Analysis />
</template>

<script setup lang="ts">
import Analysis from '@/views/demo/analysis/index.vue'

onActivated(() => {
  console.log('/dashboard => onActivated')
})
</script>
