<template>
  <XCard :title="route.path">
    <p>这是一个嵌套菜单页面</p>
  </XCard>
</template>

<script setup lang='ts'>
const route = useRoute()
</script>
