<template>
  <el-dropdown
    ref="elDropdownRef" :trigger="trigger" placement="bottom-start" popper-class="tabs-dropdown-popper"
    @command="handleSelect" @visible-change="onVisibleChange"
  >
    <span ref="elDropdownSlotRef">
      <slot />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :command="CommandEnum.reload" :disabled="!isActivated">
          <el-icon><i-ep-refresh-right /></el-icon>
          重新加载
        </el-dropdown-item>

        <el-dropdown-item :command="CommandEnum.current" :disabled="!closable">
          <el-icon><i-ep-close /></el-icon>
          关闭标签页
        </el-dropdown-item>

        <el-dropdown-item :command="CommandEnum.others" divided>
          <el-icon><i-ep-switch /></el-icon>
          关闭其他标签页
        </el-dropdown-item>

        <el-dropdown-item :command="CommandEnum.all">
          <el-icon><i-ep-semi-select /></el-icon>
          关闭全部标签页
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { RouteNameEnum } from '@/enums/route'
import useTabsStore from '@/store/modules/tabs'
import type { RouteLocationNormalized } from 'vue-router'

const props = defineProps<{
  route: RouteLocationNormalized
  trigger: 'hover' | 'click' | 'contextmenu'
}>()

enum CommandEnum {
  reload = 'reload',
  current = 'current',
  others = 'others',
  all = 'all',
}

const router = useRouter()
const closable = computed(() => !props.route.meta?.affixTab)
const isActivated = computed(() => props.route.fullPath === router.currentRoute.value.fullPath)

const tabsStore = useTabsStore()
const visitedTabList = toRef(tabsStore, 'visitedTabList')

const elDropdownRef = ref()
const elDropdownSlotRef = ref()
const visible = ref(false)

async function handleSelect(command: string) {
  const fullPath = props.route.fullPath

  if (command === CommandEnum.reload) {
    tabsStore.deleteCache(props.route.name as string)
    await router.push({
      name: RouteNameEnum.REDIRECT,
      params: {
        path: fullPath,
      },
    })
    tabsStore.addCache(props.route.name as string)
  }
  else if (command === CommandEnum.current) {
    const index = visitedTabList.value.findIndex(i => i.fullPath === fullPath)
    tabsStore.deleteTab(index, props.route.name as string)

    if (isActivated.value) {
      const prevTab = visitedTabList.value[index - 1]
      if (prevTab) {
        router.push(prevTab.fullPath)
      }
    }
  }
  else if (command === CommandEnum.others) {
    tabsStore.resetTabList()

    if (isActivated.value) {
      tabsStore.addTab(props.route)
    } else {
      router.push(props.route.fullPath)
    }
  }
  else if (command === CommandEnum.all) {
    tabsStore.resetTabList()
    router.push({ name: RouteNameEnum.DASHBOARD })
  }
}

function onVisibleChange(value: boolean) {
  visible.value = value
}

function contextmenuHandler(e: MouseEvent) {
  if (!elDropdownSlotRef.value.contains(e.target) && visible.value) {
    elDropdownRef.value.handleClose?.()
  }
}

const cleanup = useEventListener(window, 'contextmenu', contextmenuHandler)

onBeforeUnmount(() => {
  cleanup()
})
</script>
