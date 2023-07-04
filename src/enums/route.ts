export enum RouteNameEnum {
  /**
   * 首页
   */
  DASHBOARD = 'dashboard',
  /**
   * 登录页
   */
  LOGIN = 'login',
  /**
   * 重定向页
   */
  REDIRECT = 'redirect',
  /**
   * 403
   */
  FORBIDDEN = 'forbidden',
  /**
   * 404
   */
  NOT_FOUND = 'notfound',
}

export const HOME_ROUTE_INFO = {
  path: '/dashboard',
  name: RouteNameEnum.DASHBOARD,
  meta: {
    title: '首页',
    icon: 'menu-dashboard',
    affixTab: true,
    cache: true,
  },
}