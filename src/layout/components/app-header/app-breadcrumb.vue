<template>
  <el-breadcrumb class="app-breadcrumb" :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="index === breadcrumbs.length - 1" class="no-redirect">{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { HOME_ROUTE_INFO, RouteNameEnum } from '@/enums/route'
import type { RouteLocationMatched } from 'vue-router'

const router = useRouter()
const currentRoute = useRoute()
const breadcrumbs = ref<RouteLocationMatched[]>([])

function isDashboard(route: RouteLocationMatched) {
  return route.name === RouteNameEnum.DASHBOARD
}

function getBreadcrumb() {
  let matched = currentRoute.matched.filter(item => item.meta && item.meta.title)
  if (!isDashboard(matched[0])) {
    matched = [HOME_ROUTE_INFO as any].concat(matched)
  }

  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title
  })
}

function handleLink(item: RouteLocationMatched) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(path)
}

watch(
  () => currentRoute.path,
  () => {
    getBreadcrumb()
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss">
.app-breadcrumb.el-breadcrumb {
  margin-left: 10px;
  font-size: 14px;

  .el-breadcrumb__inner,
  .el-breadcrumb__inner a {
    font-weight: 400 !important;
  }

  .el-breadcrumb__inner a  {
    &:hover {
      color: var(--el-color-primary);
    }
  }

  .no-redirect {
    color: #999;
    cursor: text;
  }
}
</style>
