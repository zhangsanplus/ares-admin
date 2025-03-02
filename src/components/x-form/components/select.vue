<template>
  <ElSelect v-bind="$attrs">
    <ElOption
      v-for="option in options"
      :key="option.value"
      v-bind="option"
    >
      {{ option.label }}
    </ElOption>
  </ElSelect>
</template>

<script setup lang="ts">
import type { ElOption, ElSelect } from 'element-plus'

type Option = /* @vue-ignore */ Omit<ComponentProps<typeof ElOption>, 'value'> & {
  value: string | number
}

interface Props extends /* @vue-ignore */ ComponentProps<typeof ElSelect> {
  options: Option[]
}

defineOptions({
  inheritAttrs: false,
})

defineProps<Props>()
</script>
