import type { XFormColProps, XFormParsedColProps, XFormParsedColumn } from './types'

/**
 * 定义可用的断点
 */
export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const

/**
 * 断点优先级映射表 (从大到小)
 */
const BREAKPOINT_PRIORITY: Record<typeof BREAKPOINTS[number], typeof BREAKPOINTS[number][]> = {
  xl: ['xl'],
  lg: ['lg', 'xl'],
  md: ['md', 'lg', 'xl'],
  sm: ['sm', 'md', 'lg', 'xl'],
  xs: ['xs', 'sm', 'md', 'lg', 'xl'],
}

/**
 * 根据指定断点获取有效列宽
 * @param columnProps 列配置
 * @param targetBreakpoint 目标断点
 * @returns 计算后的列宽数值
 */
export function getSpanForBreakpoint(columnProps: XFormColProps, targetBreakpoint: keyof XFormParsedColProps): number {
  const defaultSpan = columnProps.span ?? 24
  const cascadingBreakpoints = BREAKPOINT_PRIORITY[targetBreakpoint]

  for (const breakpoint of cascadingBreakpoints) {
    const spanValue = columnProps[breakpoint]
    if (spanValue !== undefined) return spanValue
  }
  return defaultSpan
}

/**
 * 计算实际占用列数，自动处理换行逻辑
 * @param usedSpan 已使用列数
 * @param desiredSpan 期望列数
 * @returns 实际占用列数
 */
export function calcEffectiveSpan(usedSpan: number, desiredSpan: number) {
  const availableSpan = 24 - usedSpan % 24
  return availableSpan < desiredSpan ? 24 : availableSpan
}

/**
 * 标准化列配置为全断点格式
 * @param columnProps 原始列配置
 * @returns 标准化后的列配置对象
 */
export function normalizeColProps(columnProps: XFormColProps): XFormParsedColProps {
  return BREAKPOINTS.reduce((normalizedProps, breakpoint) => {
    normalizedProps[breakpoint] = getSpanForBreakpoint(columnProps, breakpoint)
    return normalizedProps
  }, { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 })
}

/**
 * 计算多列在不同断点的列数总和（考虑自动换行）
 * @param spans 列配置数组
 * @returns 各断点总列数对象
 */
export function getTotalSpans(spans: XFormParsedColProps[]): XFormParsedColProps {
  return spans.reduce((totalSpans, currentSpan) => {
    BREAKPOINTS.forEach((breakpoint) => {
      const remainingSpace = 24 - totalSpans[breakpoint] % 24
      totalSpans[breakpoint] += remainingSpace < currentSpan[breakpoint]
        ? (remainingSpace + currentSpan[breakpoint])
        : currentSpan[breakpoint]
    })
    return totalSpans
  }, { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 })
}

/**
 * @description: 合并props
 * @param props 组件props
 * @param defaultProps 默认props
 * @returns 合并后的props
 */
export function mergeProps<T>(props: T, defaultProps?: T): T {
  return props && defaultProps ? { ...defaultProps, ...props } : props
}

/**
 * @description: 判断列是否可见
 * @param column 列配置
 * @param modelValue 表单值
 * @returns 列是否可见
 */
export function isColumnVisible(column: XFormParsedColumn, modelValue: any): boolean {
  if ('show' in column) {
    return typeof column.show === 'function'
      ? column.show(modelValue)
      : column.show === undefined ? true : column.show
  }
  if ('hide' in column) {
    return typeof column.hide === 'function'
      ? !column.hide(modelValue)
      : column.hide === undefined ? false : !column.hide
  }
  return true
}
