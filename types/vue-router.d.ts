import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title?: string;
    icon?: string;
    hideMenu?: boolean;
    alwaysShow?: boolean;
    activeMenu?: string;
    role?: number[]
  }

  interface MenuItem extends Pick<RouteRecordRaw, 'path' | 'meta'> {
    children?: MenuItem[]
  }
}
