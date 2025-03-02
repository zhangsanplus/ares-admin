<template>
  <ElCheckboxGroup v-bind="$attrs">
    <ElCheckboxButton
      v-for="(option, index) in options"
      :key="index"
      v-bind="option"
    >
      {{ option.label }}
    </ElCheckboxButton>
  </ElCheckboxGroup>
</template>

<script setup lang="ts">
import type { ElCheckboxButton, ElCheckboxGroup } from 'element-plus'

type Option = /* @vue-ignore */ Omit<ComponentProps<typeof ElCheckboxButton>, 'value'> & {
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
