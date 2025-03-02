<template>
  <XCard :title="route.path" />
</template>

<script setup lang='ts'>
const route = useRoute()
</script>
