import NProgress from 'nprogress'
import { RouteNameEnum } from '@/enums/route'
import useUserStore from '@/store/modules/user'
import { NOT_FOUND_ROUTE } from './routes'
import type { Router } from 'vue-router'

NProgress.configure({
  // easing: 'ease', // 动画方式
  // speed: 500, // 递增进度条的速度
  // minimum: 0.1, // 初始化时的最小百分比
  // trickle: true, // 自动递增
  // trickleSpeed: 200, // 自动递增间隔
  showSpinner: false, // 是否显示加载icon
})

const ROUTER_WHITE_LIST = [
  RouteNameEnum.FORBIDDEN,
  RouteNameEnum.NOT_FOUND,
  RouteNameEnum.REDIRECT,
]

export default function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const userStore = useUserStore()

    // 判断访问的页面是登陆页，如果有 Token 就不需要再去登录了
    if (to.name === RouteNameEnum.LOGIN) {
      if (userStore.token) return next(from.fullPath)
      return next()
    }

    // 判断访问页面是否在路由白名单地址中，如果存在直接放行
    if (ROUTER_WHITE_LIST.includes(to.name as RouteNameEnum)) {
      return next()
    }

    // 判断是否有 Token，没有重定向到 login 页面
    if (!userStore.token) {
      return next({
        name: RouteNameEnum.LOGIN,
        query: {
          redirect: to.fullPath,
          ...to.query,
        },
        replace: true,
      })
    }

    // 获取动态路由
    if (!userStore.isMenuLoaded) {
      await userStore.getMenuData()

      userStore.asyncRoutes.forEach(route => router.addRoute(route))
      router.addRoute(NOT_FOUND_ROUTE)

      return next({ ...to, replace: true })
    }

    // 角色验证（角色验证和动态路由使用一种即可）
    // if (!userStore.hasRole(to.meta.role)) {
    //   return next({
    //     name: RouteNameEnum.FORBIDDEN,
    //   })
    // }

    // 正常访问页面
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError((error) => {
    NProgress.done()
    console.warn('路由错误 =>', error.message)
  })
}
