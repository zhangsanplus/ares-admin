<template>
  <div class="x-card" :class="{ 'is-full': full }">
    <!-- title -->
    <div v-if="title || $slots['header-right']" class="x-card-header">
      <h3 v-if="title">
        {{ title }}
      </h3>

      <slot name="header-right" />
    </div>

    <!-- content -->
    <div class="x-card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  full?: boolean
}>()
</script>

<style lang="scss">
.x-card {
  padding: var(--app-margin);
  background-color: var(--el-bg-color-overlay);
  border-radius: 4px;

  &.is-full {
    min-height: var(--app-main-height);
  }

  &+& {
    margin-top: var(--app-margin);
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
}
</style>
