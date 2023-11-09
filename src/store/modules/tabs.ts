import { RouteNameEnum } from '@/enums/route'
import type { RouteLocationNormalized, RouteRecordRaw, TabItem } from 'vue-router'

const BAN_LIST = [
  RouteNameEnum.REDIRECT,
  RouteNameEnum.LOGIN,
  RouteNameEnum.REDIRECT,
  RouteNameEnum.FORBIDDEN,
  RouteNameEnum.NOT_FOUND,
]

function getAffixTabs(routes: RouteRecordRaw[]) {
  return routes.reduce<RouteRecordRaw[]>((acc, route) => {
    if (route.meta?.affixTab) {
      acc.push(route)
    }
    if (route.children) {
      acc = acc.concat(getAffixTabs(route.children))
    }
    return acc
  }, [])
}

function formatTab(route: RouteLocationNormalized) {
  return {
    name: route.name as string,
    path: route.path,
    fullPath: route.fullPath ?? route.path,
    meta: route.meta,
    title: route.meta?.title,
  }
}

const useTabsStore = defineStore('tabs', () => {
  const affixTabList = ref<TabItem[]>([])
  const visitedTabList = ref<TabItem[]>([])
  const cacheTabList = ref<Set<string>>(new Set([]))

  /**
   * 固定项
   */
  function initAffixTabs(routes: RouteRecordRaw[]) {
    affixTabList.value = getAffixTabs(routes).map(i => formatTab(i as any))
    resetTabList()
  }

  /**
   * 增加 tab
   */
  function addTab(route: RouteLocationNormalized) {
    if (BAN_LIST.includes(route.name as RouteNameEnum)) return
    if (route.meta?.hideTab) return
    if (visitedTabList.value.some(i => i.path === route.path)) return

    const tab = formatTab(route)
    visitedTabList.value.push(tab)

    if (tab.meta?.cache) {
      cacheTabList.value.add(tab.name)
    }
  }

  /**
   * 删除 tab
   */
  function deleteTab(idx: number, name: string) {
    visitedTabList.value.splice(idx, 1)
    cacheTabList.value.delete(name)
  }

  /**
   * 重置
   */
  function resetTabList() {
    visitedTabList.value = []
    cacheTabList.value.clear()

    affixTabList.value.forEach((i) => {
      visitedTabList.value.push(i)
      cacheTabList.value.add(i.name)
    })
  }

  /**
   * 新增缓存
   */
  function addCache(name: string) {
    cacheTabList.value.add(name)
  }

  /**
   * 删除缓存
   */
  function deleteCache(name: string) {
    cacheTabList.value.delete(name)
  }

  return {
    visitedTabList,
    cacheTabList,
    addTab,
    deleteTab,
    addCache,
    deleteCache,
    resetTabList,
    initAffixTabs,
  }
})

export default useTabsStore
