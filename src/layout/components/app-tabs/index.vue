<template>
  <div class="app-tabs">
    <el-scrollbar>
      <div class="app-tabs-wrap">
        <tab-item v-for="(tab, index) in visitedTabList" :key="tab.fullPath" :index="index" :tab="tab" />
      </div>

      <!-- <tab-dropdown trigger="click" :route="currentRoute">
        <div class="app-tabs-operation">
          <el-icon>
            <i-ep-more-filled />
          </el-icon>
        </div>
      </tab-dropdown> -->
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes'
import useTabsStore from '@/store/modules/tabs'
import TabItem from './tab-item.vue'

const router = useRouter()
const { currentRoute } = router
const tabsStore = useTabsStore()
const visitedTabList = toRef(tabsStore, 'visitedTabList')

watch(
  currentRoute,
  (route) => {
    tabsStore.addTab(route)
  },
)

onMounted(() => {
  tabsStore.initAffixTabs(routes)
  tabsStore.addTab(currentRoute.value)
})
</script>

<style lang="scss">
.app-tabs {
  border-bottom: 1px solid var(--el-border-color-lighter);

  .el-scrollbar__bar.is-horizontal {
    height: 6px;
  }

  &-wrap {
    padding: 4px 6px;
    white-space: nowrap;
  }

  &-operation {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 32px;
    color: var(--el-color-info);
    border-left: 1px solid var(--el-border-color-lighter);
    cursor: pointer;
    transition: background .25s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}

.tabs-dropdown-popper {
  .el-dropdown-menu__item {
    font-size: 13px;
  }
}
</style>
