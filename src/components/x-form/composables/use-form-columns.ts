import type { XFormColProps, XFormColumn, XFormParsedColumn } from '../types'
import { defaultProps } from '../components/field-component'
import { isColumnVisible, mergeProps, normalizeColProps } from '../utils'

export interface UseFormColumnsParams {
  columns: XFormColumn[]
  modelValue: Record<string, any>
  colProps: XFormColProps
  collapsed?: boolean
  collapsedRows?: number
}

export default function useFormColumns(params: ComputedRef<UseFormColumnsParams>) {
  const getColumnColProps = (column: XFormColumn): XFormColProps => {
    return column.type === 'divider'
      ? { span: 24 }
      : column.colProps ?? params.value.colProps
  }

  const normalizeColumn = (column: XFormColumn): XFormParsedColumn => {
    const base = {
      ...column,
      colProps: normalizeColProps(getColumnColProps(column)),
    }
    if (column.type === 'custom') return base
    return {
      ...base,
      props: mergeProps(column.props, defaultProps[column.type]),
    } as XFormParsedColumn
  }

  const normalizedColumns = computed(() => {
    return params.value.columns.map(normalizeColumn)
  })

  const visibleColumns = computed(() => {
    return normalizedColumns.value.filter(column => isColumnVisible(
      column,
      params.value.modelValue,
    ))
  })

  return {
    normalizedColumns,
    visibleColumns,
  }
}
