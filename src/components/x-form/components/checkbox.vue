<template>
  <ElCheckboxGroup v-bind="$attrs">
    <ElCheckbox v-for="option in options" :key="option.value" v-bind="option">
      {{ option.label }}
    </ElCheckbox>
  </ElCheckboxGroup>
</template>

<script setup lang="ts">
import type { ElCheckbox, ElCheckboxGroup } from 'element-plus'

type Option = /* @vue-ignore */ Omit<ComponentProps<typeof ElCheckbox>, 'value'> & {
  value: string | number
}

interface Props extends /* @vue-ignore */ ComponentProps<typeof ElCheckboxGroup> {
  options: Option[]
}

defineOptions({
  inheritAttrs: false,
})

defineProps<Props>()
</script>
