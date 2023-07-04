<template>
  <analysis />
</template>

<script setup lang="ts" name="dashboard">
import Analysis from '@/views/analysis/index.vue'

onActivated(() => {
  console.log('/dashboard => onActivated')
})
</script>