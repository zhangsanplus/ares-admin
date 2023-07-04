import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /** title */
    title?: string;
    /** icon */
    icon?: string;
    /**
     * keep-alive
     * 页面组件需要定义 name 才生效，默认关闭
     */
    cache?: boolean;
    /** 根菜单排序 */
    order?: number
    /** 高亮菜单 */
    activeMenu?: string;
    /** 当子菜单数量为1个时总是展示 */
    alwaysShow?: boolean;
    /** 菜单中隐藏 */
    hideMenu?: boolean; //
    /** 标签页中隐藏 */
    hideTab?: boolean;
    /** 标签页中固定 */
    affixTab?: boolean;
    /** 菜单角色 */
    role?: number[];
  }

  /** 菜单 */
  interface MenuItem extends Pick<RouteRecordRaw, 'path' | 'meta'> {
    children?: MenuItem[]
  }

  /** 标签页 */
  interface TabItem {
    name: string
    path: string
    fullPath: string
    title?: string
    meta: RouteRecordRaw['meta']
  }
}
