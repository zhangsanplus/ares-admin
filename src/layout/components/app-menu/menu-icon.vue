<template>
  <ElIcon>
    <component :is="icon" />
  </ElIcon>
</template>

<script setup lang="ts">
import MenuDashboard from '~icons/custom-menu/dashboard'
import MenuDirective from '~icons/custom-menu/directive'
import MenuException from '~icons/custom-menu/exception'
import MenuForm from '~icons/custom-menu/form'
import MenuLink from '~icons/custom-menu/link'
import MenuNest from '~icons/custom-menu/nest'
import MenuRoute from '~icons/custom-menu/route'
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
  'menu-route': MenuRoute,
  'menu-table': MenuTable,
  'menu-user': MenuUser,
  'menu-form': MenuForm,
}

const icon = icons[props.name]

if (!icon) {
  console.error(`请检查 [menu-icon.vue] 组件是否配置了 [${props.name}] 图标`)
}
</script>
