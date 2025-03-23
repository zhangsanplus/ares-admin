import type { ElFormItem, ElRow } from 'element-plus'
import type { FromComponentPropsMap, FromComponentSlotsMap, FromComponentType } from './field-component'

export type XFormRowProps = ComponentProps<typeof ElRow>

export interface XFormColProps {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export type XFormParsedColProps = Required<Omit<XFormColProps, 'span'>>

interface FormBaseColumn<F> {
  prop: string
  label?: string | ((...args: any[]) => VNode)
  formItemProps?: ComponentProps<typeof ElFormItem>
  formItemSlots?: Partial<Record<'error' | 'label', string | ((...args: any[]) => VNode)>>
  colProps?: XFormColProps
  show?: boolean | ((form: F) => boolean)
  hide?: boolean | ((form: F) => boolean)
}

type FormTypeColumn<O> = {
  [K in FromComponentType]: {
    type: K
    props?: FromComponentPropsMap[K]
    slots?: FromComponentSlotsMap[K]
  } & O
}[FromComponentType]

type FormParsedBaseColumn<F> = Omit<FormBaseColumn<F>, 'colProps'> & {
  colProps: XFormParsedColProps
}

export type XFormColumn<F = Record<string, any>> =
  | FormTypeColumn<FormBaseColumn<F>>
  | ({ type: 'custom' } & FormBaseColumn<F>)

export type XFormParsedColumn<F = Record<string, any>> =
  | FormTypeColumn<FormParsedBaseColumn<F>>
  | ({ type: 'custom' } & FormParsedBaseColumn<F>)
