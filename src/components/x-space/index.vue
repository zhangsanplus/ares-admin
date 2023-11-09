<template>
  <el-space :spacer="spacer" :size="2" v-bind="$attrs">
    <slot />
  </el-space>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus'

const spacer = h(ElDivider, { direction: 'vertical' })
</script>
