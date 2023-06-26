<template>
  <x-card>
    <h5 style="font-weight: normal;font-size: 18px;">
      欢迎使用 {{ appStore.title }}！
    </h5>
  </x-card>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
</script>