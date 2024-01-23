<template>
  <x-card :title="route.path">
    <p>这是由接口返回的动态路由页面，只有 `admin` 才展示</p>
  </x-card>
</template>

<script setup lang='ts'>
const route = useRoute()
</script>
