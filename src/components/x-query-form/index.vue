<template>
  <el-form class="x-query-form" v-bind="formAttrs">
    <div class="x-query-form__content" :style="contentStyle">
      <slot />
    </div>

    <el-space v-if="$slots.action" class="x-query-form__action" v-bind="spaceAttrs">
      <slot name="action" />
    </el-space>
  </el-form>
</template>

<script setup lang="ts">
import useQueryForm from './use-query-form'
import type { XQueryFormProps } from './use-query-form'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<XQueryFormProps>(),
  {
    direction: 'horizontal',
    xl: 3,
    md: 2,
    xs: 1,
  },
)

const attrs = useAttrs()
const { breakpoints, cols } = useQueryForm(props)
const isMobile = breakpoints.smallerOrEqual('md')

const dir = computed(() => {
  return isMobile.value ? 'vertical' : props.direction
})

const formAttrs = computed(() => {
  return {
    ...attrs,
    class: `is-${dir.value}`,
    labelPosition: isMobile.value ? 'top' : 'right',
  } as const
})

const spaceAttrs = computed(() => ({
  size: 8,
  fill: dir.value === 'vertical',
  direction: dir.value,
}))

const contentStyle = computed(() => {
  return {
    'grid-template-columns': `repeat(${cols.value}, 1fr)`,
  }
})
</script>

<style lang="scss">
.x-query-form {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: flex-start;

  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }

  &__content {
    display: grid;
    flex: 1 1 0%;
    gap: var(--app-margin);
  }

  &__action {
    margin-left: var(--app-margin);
  }
}

@media only screen and (width <=768px) {
  .x-query-form {
    display: block;

    &__action {
      width: 100%;
      margin-top: var(--app-margin);
      margin-left: 0;
    }
  }
}
</style>
