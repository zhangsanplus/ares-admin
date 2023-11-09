<template>
  <analysis />
</template>

<script setup lang="ts" name="dashboard">
import Analysis from '@/views/demo/analysis/index.vue'

onActivated(() => {
  console.log('/dashboard => onActivated')
})
</script>
