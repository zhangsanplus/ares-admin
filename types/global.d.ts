/**
 * 普通函数
 */
interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

/**
 * 异步函数
 */
interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

/**
 * 普通对象
 */
type AnyObject<T = unknown> = Record<string, T>

/**
 * 选项
 */
interface Option<T = unknown, R = string> {
  value: T
  label: R
}

/**
 * 节点项
 */
interface NodeOptions extends Option {
  children?: NodeOptions[]
}

/**
 * 分页请求
 */
interface PagingRequest {
  pageNum: number
  pageSize: number
}

/**
 * 排序请求
 */
interface SortRequest {
  sortField: string
  sortOrder: 'ascending' | 'descending'
}

/**
 * 返回分页信息
 */
interface PagingResult<T> {
  count: number
  list: T
}

/**
 * 返回封装
 */
interface HttpResponse<T = unknown> {
  msg: string
  code: number
  data: T
}

/**
 * 组件属性
 */
// type ComponentProps<T> = T extends DefineComponent<infer P, any, any> ? P : never
type ComponentProps<T> = T extends new (...args: any[]) => any ? InstanceType<T>['$props'] : never
