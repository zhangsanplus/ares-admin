import type {
  XFormColProps,
  XFormColumn,
  XFormParsedColProps,
  XFormParsedColumn,
  XFormRowProps,
} from './types'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { breakpointsElement, useBreakpoints } from '@vueuse/core'
import {
  ElButton,
  ElCol,
  ElDivider,
  ElForm,
  ElFormItem,
  ElIcon,
  ElLink,
  ElRow,
  ElSpace,
} from 'element-plus'
import FormComponent, { defaultProps } from './field-component'
import {
  BREAKPOINTS,
  calcEffectiveSpan,
  getTotalSpans,
  isColumnVisible,
  mergeProps,
  normalizeColProps,
} from './utils'
import './index.scss'

type DividerColumn = Extract<XFormParsedColumn, { type: 'divider' }>
type CustomColumn = Extract<XFormParsedColumn, { type: 'custom' }>
type FieldColumn = Exclude<XFormParsedColumn, DividerColumn | CustomColumn>

export default defineComponent({
  name: 'XForm',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array as () => XFormColumn[],
      required: true,
    },
    gutter: {
      type: Number,
      default: 18,
    },
    justify: {
      type: String as () => XFormRowProps['justify'],
      default: 'start',
    },
    actionColProps: Object as () => XFormColProps,
    actionPosition: {
      type: String as () => 'inline' | 'right',
      default: 'right',
    },
    colProps: {
      type: Object as () => XFormColProps,
      default: () => ({ xs: 24, sm: 24, md: 12, lg: 8, xl: 6 }),
    },
    collapsedRows: {
      type: Number,
      default: 1,
    },
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    labelSuffix: String,
    searchable: Boolean,
    searchOnChange: Boolean,
  },
  emits: ['update:modelValue', 'submit', 'reset'],
  setup(props, { emit, attrs, expose, slots }) {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const collapsed = ref(props.defaultCollapsed)
    const breakpoints = useBreakpoints(breakpointsElement)
    const currentBreakpoint = breakpoints.active()

    const getColumnColProps = (column: XFormColumn): XFormColProps => {
      return column.type === 'divider'
        ? { span: 24 }
        : column.colProps ?? props.colProps
    }

    const normalizeColumn = (column: XFormColumn): XFormParsedColumn => {
      const base = {
        ...column,
        colProps: normalizeColProps(getColumnColProps(column)),
      }
      return column.type === 'custom'
        ? base
        : { ...base, props: mergeProps(column.props, defaultProps[column.type]) } as XFormParsedColumn
    }

    const calcLastVisibleIndex = (
      columns: XFormParsedColumn[],
      breakpoint: keyof XFormParsedColProps,
    ) => {
      const totalSpan = 24 * props.collapsedRows
      const actionSpan = normalizeColProps(props.actionColProps ?? props.colProps)[breakpoint]
      const availableSpan = totalSpan - (actionSpan > 0 ? actionSpan : 0)

      let accumulatedSpan = 0
      return columns.findIndex((column) => {
        accumulatedSpan += column.colProps[breakpoint]
        return accumulatedSpan > availableSpan
      }) || columns.length
    }

    const shouldCollapse = (columns: XFormParsedColumn[]) => {
      return collapsed.value && props.collapsedRows > 0 && columns.length > 0
    }

    const getCollapsedColumns = (columns: XFormParsedColumn[]) => {
      const breakpoint = currentBreakpoint.value || 'xs'
      const lastIndex = calcLastVisibleIndex(columns, breakpoint)
      return columns.slice(0, lastIndex)
    }

    const calcActionColProps = (columns: XFormParsedColumn[]) => {
      const base = normalizeColProps(props.actionColProps ?? props.colProps)
      if (props.actionPosition !== 'right') return base

      const totalCols = getTotalSpans(columns.map(c => c.colProps))
      BREAKPOINTS.forEach((point) => {
        base[point] = calcEffectiveSpan(totalCols[point], base[point])
      })

      return base
    }

    const normalizedColumns = computed(() => {
      return props.columns.map(normalizeColumn)
    })

    const displayColumns = computed(() => {
      const visibleColumns = normalizedColumns.value
        .filter(column => isColumnVisible(column, props.modelValue))

      return shouldCollapse(visibleColumns)
        ? getCollapsedColumns(visibleColumns)
        : visibleColumns
    })

    const actionColProps = computed(() => {
      return calcActionColProps(displayColumns.value)
    })

    const toggleCollapse = () => collapsed.value = !collapsed.value

    const updateModel = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
      props.searchOnChange && emit('submit')
    }

    const renderFieldComponent = (column: FieldColumn) => (
      slots[column.prop]?.(column)
      || (
        <FormComponent
          {...column.props}
          model-value={props.modelValue[column.prop]}
          onUpdate:model-value={(e: any) => updateModel(e, column.prop)}
          type={column.type}
          slots={column.slots}
        />
      )
    )

    const renderFormLabel = (column: XFormColumn, suffix = '') => {
      if (typeof column.label === 'function') return column.label()
      return `${column.label}${suffix}`
    }

    const renderActions = () => (
      <>
        <ElButton type="primary" onClick={() => emit('submit')}>查询</ElButton>
        <ElButton onClick={() => emit('reset')}>重置</ElButton>
        <ElLink underline={false} onClick={toggleCollapse}>
          {collapsed.value ? '展开' : '收起'}
          <ElIcon style="margin-left: 2px;">
            {collapsed.value ? <ArrowDown /> : <ArrowUp />}
          </ElIcon>
        </ElLink>
      </>
    )

    const renderDivider = (column: DividerColumn) => (
      <ElDivider {...column.props}>
        {renderFormLabel(column)}
      </ElDivider>
    )

    const renderFormItem = (column: FieldColumn | CustomColumn) => (
      <ElFormItem
        {...column.formItemProps}
        prop={column.prop}
        v-slots={{
          ...column.formItemSlots,
          label: () => renderFormLabel(column, props.labelSuffix),
        }}
      >
        {column.type === 'custom'
          ? slots[column.prop]?.(column)
          : renderFieldComponent(column)}
      </ElFormItem>
    )

    const renderColumnContent = (column: XFormParsedColumn) => {
      if (column.type === 'divider') return renderDivider(column)
      return renderFormItem(column)
    }

    expose({ formRef })

    return () => (
      <ElForm
        ref={formRef}
        class={['x-form', `x-form-action--${props.actionPosition}`]}
        {...attrs}
        model={props.modelValue}
        labelSuffix={props.labelSuffix}
      >
        <ElRow gutter={props.gutter} justify={props.justify}>
          {displayColumns.value.map(column => (
            <ElCol {...column.colProps} key={column.prop}>
              {renderColumnContent(column)}
            </ElCol>
          ))}

          {(props.searchable || slots.action) && (
            <ElCol {...actionColProps.value}>
              <ElFormItem label-width="0px" class="is-suffix-item">
                <ElSpace wrap>
                  {slots.action?.() || renderActions()}
                </ElSpace>
              </ElFormItem>
            </ElCol>
          )}
        </ElRow>
      </ElForm>
    )
  },
})
