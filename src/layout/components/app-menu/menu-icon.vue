<template>
  <el-icon>
    <component :is="icon" />
  </el-icon>
</template>

<script setup lang="ts">
import MenuDashboard from '~icons/custom-menu/dashboard'
import MenuDirective from '~icons/custom-menu/directive'
import MenuException from '~icons/custom-menu/exception'
import MenuLink from '~icons/custom-menu/link'
import MenuNest from '~icons/custom-menu/nest'
import MenuTable from '~icons/custom-menu/table'
import MenuUser from '~icons/custom-menu/user'

const props = defineProps<{
  name: string
}>()

const icons: Record<string, any> = {
  'menu-dashboard': MenuDashboard,
  'menu-directive': MenuDirective,
  'menu-exception': MenuException,
  'menu-link': MenuLink,
  'menu-nest': MenuNest,
  'menu-table': MenuTable,
  'menu-user': MenuUser,
}

const icon = icons[props.name]
</script>