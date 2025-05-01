<template>
  <div class="x-card" :class="{ 'x-card--fullpage': fullpage, 'x-card--header': showHeader }">
    <div v-if="showHeader" class="x-card-header">
      <h3 v-if="title || $slots.title">
        <slot name="title">
          {{ title }}
        </slot>
      </h3>
      <slot name="right" />
    </div>

    <div class="x-card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  fullpage?: boolean
}>()

const slots = useSlots()
const showHeader = computed(() => {
  return props.title || slots.title || slots.right
})
</script>

<style lang="scss">
.x-card {
  padding: var(--app-margin);
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--app-card-border);
  border-radius: 4px;

  &.x-card--fullpage {
    display: flex;
    flex-direction: column;
    height: calc(var(--app-main-height) - var(--app-margin) - var(--app-footer-height));

    .x-card-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 1px;
    }
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    margin-bottom: 12px;

    h3 {
      position: relative;
      margin: 0;
      padding-left: 14px;
      font-weight: normal;
      font-size: 16px;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 3px;
        height: 18px;
        margin-top: -8px;
        background-color: var(--el-color-primary);
        border-radius: 20px;
        content: '';
      }
    }
  }

  &-content {
    position: relative;
  }

  &+& {
    margin-top: var(--app-margin);
  }
}
</style>
