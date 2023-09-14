<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <menu-icon v-if="subItem.meta?.icon" :name="`${subItem.meta.icon}`" />
        <span>{{ subItem.meta?.title }}</span>
      </template>
      <app-sub-item :menu-list="subItem.children" :show-icon="false" />
    </el-sub-menu>

    <el-menu-item v-else :index="subItem.path" @click="handleClick(subItem.path)">
      <menu-icon v-if="showIcon && subItem.meta?.icon" :name="`${subItem.meta.icon}`" />
      <template #title>
        <span>{{ subItem.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts" name="app-sub-item">
import { RouteNameEnum } from '@/enums/route'
import { isExternal } from '@/utils/is'
import MenuIcon from './menu-icon.vue'
import type { MenuItem } from 'vue-router'

withDefaults(defineProps<{
  menuList: MenuItem[]
  showIcon?: boolean
}>(),
{
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
