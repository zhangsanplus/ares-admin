<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <ElSubMenu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <MenuIcon v-if="subItem.meta?.icon" :name="`${subItem.meta.icon}`" />
        <span>{{ subItem.meta?.title }}</span>
      </template>
      <AppSubItem :menu-list="subItem.children" :show-icon="false" />
    </ElSubMenu>

    <ElMenuItem v-else :index="subItem.path" @click="handleClick(subItem.path)">
      <MenuIcon v-if="showIcon && subItem.meta?.icon" :name="`${subItem.meta.icon}`" />
      <template #title>
        <span>{{ subItem.meta?.title }}</span>
      </template>
    </ElMenuItem>
  </template>
</template>

<script setup lang="ts" name="app-sub-item">
import type { MenuItem } from 'vue-router'
import { RouteNameEnum } from '@/enums/route'
import { isExternal } from '@/utils/is'
import MenuIcon from './menu-icon.vue'

withDefaults(defineProps<{
  menuList: MenuItem[]
  showIcon?: boolean
}>(), {
  showIcon: true,
})

const route = useRoute()
const router = useRouter()

function handleClick(path: string) {
  const { fullPath } = route
  if (isExternal(path)) {
    window.open(path, '_blank', 'noopener,noreferrer')
  } else if (fullPath === path) {
    router.replace({
      name: RouteNameEnum.REDIRECT,
      params: { path: fullPath },
    })
  } else {
    router.push(path)
  }
}
</script>
