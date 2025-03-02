<template>
  <ElRadioGroup v-bind="$attrs">
    <ElRadio
      v-for="option in options"
      :key="option.value"
      v-bind="option"
    >
      {{ option.label }}
    </ElRadio>
  </ElRadioGroup>
</template>

<script setup lang="ts">
import { ElRadio, ElRadioGroup } from 'element-plus'

type Option = /* @vue-ignore */ Omit<ComponentProps<typeof ElRadio>, 'value'> & {
  value: string | number
}

interface Props extends /* @vue-ignore */ ComponentProps<typeof ElRadioGroup> {
  options: Option[]
}

defineOptions({
  inheritAttrs: false,
})

defineProps<Props>()
</script>
