<template>
  <x-card :title="route.path">
    <p>这是一个嵌套菜单页面</p>
  </x-card>
</template>

<script setup lang='ts'>
const route = useRoute()
</script>
