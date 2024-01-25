<template>
  <tab-dropdown trigger="contextmenu" :route="route">
    <el-tag
      class="app-tab-item" disable-transitions :closable="closable"
      :type="tab.fullPath === $route.fullPath ? '' : 'info'" @click="handleClick" @close="handleClose"
    >
      {{ tab.title }}
    </el-tag>
  </tab-dropdown>
</template>

<script setup lang='ts'>
import useTabsStore from '@/store/modules/tabs'
import TabDropdown from './tab-dropdown.vue'
import type { RouteLocationNormalized, TabItem } from 'vue-router'

const props = defineProps<{
  index: number
  tab: TabItem
}>()

const tabsStore = useTabsStore()
const router = useRouter()
const visitedTabList = toRef(tabsStore, 'visitedTabList')
const route = computed(() => props.tab as RouteLocationNormalized)
const closable = computed(() => !props.tab.meta?.affixTab)

function handleClose() {
  tabsStore.deleteTab(props.index, props.tab.name as string)
  const prevTab = visitedTabList.value[props.index - 1]
  if (prevTab) {
    router.push(prevTab.fullPath)
  }
}

function handleClick() {
  router.push(props.tab.fullPath)
}
</script>

<style lang="scss">
.app-tab-item {
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all .2s;

  &.el-tag {
    --el-tag-bg-color: var(--el-color-info-light-9);

    .el-tag__close {
      margin-left: 2px;
      transition: all .2s;

      &:hover {
        color: var(--el-color-primary);
        background: transparent;
      }
    }
  }

  &.el-tag--info {
    --el-tag-hover-color: var(--el-color-info-light-7);
    --el-tag-text-color: var(--el-text-color-regular);

    .el-tag__close {
      opacity: 0;
    }

    &:hover {
      --el-tag-text-color: var(--el-text-color-regular);

      .el-tag__close {
        opacity: 1;
      }
    }
  }
}

html.dark {
  .app-tab-item.el-tag {
    --el-tag-bg-color: var(--el-color-info-light-8);
  }
}
</style>
