import NProgress from 'nprogress'
import { RouteNameEnum } from '@/enums/route'
import useUserStore from '@/store/modules/user'
import type { LocationQueryRaw, Router } from 'vue-router'

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

    // 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
    if (to.path === RouteNameEnum.LOGIN) {
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
        path: RouteNameEnum.LOGIN,
        query: {
          redirect: to.fullPath,
          ...to.query,
        } as LocationQueryRaw,
        replace: true,
      })
    }

    // 页面权限验证
    if (!userStore.hasRole(to.meta.role)) {
      return next({
        path: RouteNameEnum.FORBIDDEN,
      })
    }

    // 正常访问页面
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError((error) => {
    NProgress.start()
    console.warn('路由错误 =>', error.message)
  })
}
