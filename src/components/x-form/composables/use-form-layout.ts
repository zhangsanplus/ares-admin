import type { XFormActionPosition, XFormColProps, XFormParsedColumn } from '../types'
import { BREAKPOINTS, calcEffectiveSpan, getTotalSpans, normalizeColProps } from '../utils'

interface UseFormLayoutParams {
  columns: XFormParsedColumn[]
  colProps: XFormColProps
  actionColProps?: XFormColProps
  actionPosition?: XFormActionPosition
}

export default function useFormLayout(params: ComputedRef<UseFormLayoutParams>) {
  const actionColProps = computed(() => {
    const base = normalizeColProps(params.value.actionColProps ?? params.value.colProps)

    if (params.value.actionPosition !== 'right') return base

    const totalCols = getTotalSpans(params.value.columns.map(c => c.colProps))
    BREAKPOINTS.forEach((point) => {
      base[point] = calcEffectiveSpan(totalCols[point], base[point])
    })
    return base
  })

  return {
    actionColProps,
  }
}
