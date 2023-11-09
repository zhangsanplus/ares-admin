import { isExternal } from '@/utils/is'
import type { MenuItem, RouteRecordRaw } from 'vue-router'

/**
 * 将两个路径拼接为一个
 * @param path1 路径 1
 * @param path2 路径 2
 */
function joinPath(path1: string, path2: string) {
  if (path2.startsWith('/')) return path2
  const p1 = path1.endsWith('/') ? path1.slice(0, -1) : path1
  return `${p1}/${path2}`
}

/**
 * 将自定义路由转成菜单
 * 将只有一个子菜单的父菜单替换成子菜单
 */
function getMenuItem(route: RouteRecordRaw): MenuItem {
  const { alwaysShow } = route.meta || {}
  const showChildren = route.children ?? []
  if (!alwaysShow && showChildren.length === 1) {
    const _route = showChildren[0]
    return {
      path: _route.path,
      meta: _route.meta,
      children: _route.children,
    }
  }

  return {
    path: route.path,
    meta: route.meta,
    children: transformRouteToMenu(route.children),
  }
}

/**
 * 给路由 path 转成 fullpath
 */
function transformRouterPath(routes: RouteRecordRaw[], baseUrl = '/') {
  return routes.map((route) => {
    if (!isExternal(route.path) && route.path !== '/:pathMatch(.*)*') {
      route.path = joinPath(baseUrl, route.path)
      route.children = route.children || []
      route.children = transformRouterPath(route.children, route.path)
    }
    return route
  })
}

// 路由转菜单
export function transformRouteToMenu(routes: RouteRecordRaw[] = []) {
  return transformRouterPath(routes).map(getMenuItem)
}

// 过滤路由
export function filterRoutes(routes: RouteRecordRaw[], predicate: (route: RouteRecordRaw) => boolean) {
  return routes.reduce((result: RouteRecordRaw[], route: RouteRecordRaw) => {
    if (predicate(route)) {
      if (route.children) {
        result.push({ ...route, children: filterRoutes(route.children, predicate) })
      } else {
        result.push({ ...route })
      }
    }
    return result
  }, [])
}
