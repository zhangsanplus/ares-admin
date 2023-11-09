<template>
  <x-card title="测试页面">
    vue-test {{ route.path }}
  </x-card>
</template>

<script setup lang='ts'>
const route = useRoute()
</script>
