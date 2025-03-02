import type { ElDivider, ElFormItem, ElRow } from 'element-plus'
import type components from './components'

interface XFormBaseColumn<F> {
  prop: string
  label?: string | Component
  colProps?: XFormColProps
  formItemProps?: ComponentProps<typeof ElFormItem>
  formItemSlots?: Partial<Record<'error', string | (() => VNode)>>
  show?: boolean | ((form: F) => boolean)
  hide?: boolean | ((form: F) => boolean)
}

interface XFormDividerColumn<F> {
  type: 'divider'
  prop: string
  props?: ComponentProps<typeof ElDivider>
  label?: string | Component
  show?: boolean | ((form: F) => boolean)
  hide?: boolean | ((form: F) => boolean)
}

interface XFormTypeColumn<S> {
  type: keyof S | 'custom'
  props?: ComponentProps<S[keyof S]>
}

declare global {
  export interface XFormColProps {
    span?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  export type XFormParsedColProps = Required<Omit<XFormColProps, 'span'>>
  export type XFormRowProps = ComponentProps<typeof ElRow>

  export type XFormColumn<F = Record<string, any>> =
    | (XFormBaseColumn<F> & XFormTypeColumn<typeof components>)
    | XFormDividerColumn<F>

  export type XFormParsedColumn = Omit<XFormColumn, 'colProps'> & {
    colProps: XFormParsedColProps
  }
}
