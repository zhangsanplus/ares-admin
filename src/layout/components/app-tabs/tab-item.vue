<template>
  <TabDropdown trigger="contextmenu" :route="route">
    <ElTag
      class="app-tab-item"
      disable-transitions
      :closable="closable"
      :type="tab.fullPath === $route.fullPath ? 'primary' : 'info'"
      @click="handleClick"
      @close="handleClose"
    >
      {{ tab.title }}
    </ElTag>
  </TabDropdown>
</template>

<script setup lang='ts'>
import type { RouteLocationNormalized, TabItem } from 'vue-router'
import useTabsStore from '@/store/modules/tabs'
import TabDropdown from './tab-dropdown.vue'

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
  &.el-tag {
    --el-tag-bg-color: var(--el-color-info-light-9) !important;
    margin-right: 4px;
    border: none;

    border-radius: 2px;
    cursor: pointer;
    transition: all .2s;

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
    --el-tag-bg-color: var(--el-color-info-light-8) !important;
  }
}
</style>
