<template>
  <div class="app-toggle" @click="toggleCollapse">
    <svg-icon name="fold" :class="{ 'is-active': appStore.collapsed }" />
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const { toggleCollapse } = appStore
</script>

<style lang="scss">
.app-toggle {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all .25s;

  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    width: 1px;
    height: 20px;
    background-color: var(--el-border-color-extra-light);
    transform: translateY(-50%);
    transition: opacity .25s;
    content: '';
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);

    &::after {
      opacity: 0;
    }
  }

  svg {
    vertical-align: middle;

    &.is-active {
      transform: rotate(180deg);
    }
  }
}
</style>