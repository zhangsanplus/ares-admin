export const points = ['xs', 'sm', 'md', 'lg', 'xl'] as const

/**
 * @description: 获取实际占有列数
 * @param {number} a 已用列数
 * @param {number} b 期望占有列数
 * @return 实际占有列数
 */
export function getGreaterSpan(a: number, b: number) {
  const c = 24 - a % 24 // 可用列数
  return c < b ? 24 : c // 可用列数小于期望列数时，则占满24列
}

/**
 * @description: 根据断点获取列数
 * @param cols 配置
 * @param point 当前断点
 * @returns 列数
 */
export function getSpanByPoint(
  cols: XFormColProps,
  point: keyof XFormParsedColProps,
): number {
  const defaultSpan = cols.span || 24
  switch (point) {
    case 'xl':
      return cols.xl ?? defaultSpan
    case 'lg':
      return cols.lg ?? cols.xl ?? defaultSpan
    case 'md':
      return cols.md ?? cols.lg ?? cols.xl ?? defaultSpan
    case 'sm':
      return cols.sm ?? cols.md ?? cols.lg ?? cols.xl ?? defaultSpan
    default:
      return cols.xs ?? cols.sm ?? cols.md ?? cols.lg ?? cols.xl ?? defaultSpan
  }
}

/**
 * @description: 解析配置，获取每个断点列数
 * @param cols 配置
 * @returns 每个断点列数
 */
export function normalizeColProps(cols: XFormColProps) {
  return points.reduce((acc, key) => {
    acc[key] += getSpanByPoint(cols, key)
    return acc
  }, { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 })
}

/**
 * @description: 获取每个断点总占列数
 * @param list 配置列表
 * @returns 每个断点总占列数
 */
export function getSumColProps(list: XFormParsedColProps[]) {
  return list.reduce((acc, item) => {
    points.forEach((point) => {
      // acc[point] += item[point]
      // 如果增加的列在当前行放不下，会在下一行显示
      const ramain = 24 - acc[point] % 24
      acc[point] += ramain < item[point] ? (ramain + item[point]) : item[point]
    })
    return acc
  }, { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 })
}
