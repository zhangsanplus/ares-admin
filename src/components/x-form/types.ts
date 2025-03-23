import type { ElFormItem, ElRow } from 'element-plus'
import type { FromComponentPropsMap, FromComponentSlotsMap, FromComponentType } from './form-component'

export type XFormRowProps = ComponentProps<typeof ElRow>

export interface XFormColProps {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

interface FormBaseColumn<F> {
  prop: string
  label?: string | ((...args: any[]) => VNode)
  formItemProps?: ComponentProps<typeof ElFormItem>
  formItemSlots?: Partial<Record<'error' | 'label', string | ((...args: any[]) => VNode)>>
  colProps?: XFormColProps
  show?: boolean | ((form: F) => boolean)
  hide?: boolean | ((form: F) => boolean)
}

type XFormParsedBaseColumn<F> = Omit<FormBaseColumn<F>, 'colProps'> & {
  colProps: XFormParsedColProps
}

type FormTypeColumn = {
  [K in FromComponentType]: {
    type: K
    props?: FromComponentPropsMap[K]
    slots?: FromComponentSlotsMap[K]
  }
}[FromComponentType]

type MergedFormColumn<B> =
  | (B & { type: 'custom' })
  | (B & FormTypeColumn)

export type XFormParsedColProps = Required<Omit<XFormColProps, 'span'>>
export type XFormParsedColumn<F = Record<string, any>> = MergedFormColumn<XFormParsedBaseColumn<F>>
export type XFormColumn<F = Record<string, any>> = MergedFormColumn<FormBaseColumn<F>>
