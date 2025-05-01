import type {
  XFormActionPosition,
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
import FormComponent from './components/field-component'
import useFormColumns from './composables/use-form-columns'
import useFormLayout from './composables/use-form-layout'
import { normalizeColProps } from './utils'
import './index.scss'

type CustomColumn = Extract<XFormParsedColumn, { type: 'custom' }>
type FieldColumn = Exclude<XFormParsedColumn, CustomColumn>

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
      type: String as () => XFormActionPosition,
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

    const getCollapsedColumns = (columns: XFormParsedColumn[]) => {
      const breakpoint = currentBreakpoint.value || 'xs'
      const lastIndex = calcLastVisibleIndex(columns, breakpoint)
      return columns.slice(0, lastIndex)
    }

    const { visibleColumns } = useFormColumns(computed(() => ({
      columns: props.columns,
      modelValue: props.modelValue,
      colProps: props.colProps,
      collapsed: props.defaultCollapsed,
      collapsedRows: props.collapsedRows,
    })))

    const displayColumns = computed(() => {
      const shouldCollapse = collapsed.value
        && props.collapsedRows > 0
        && visibleColumns.value.length > 0
      return shouldCollapse
        ? getCollapsedColumns(visibleColumns.value)
        : visibleColumns.value
    })

    const { actionColProps } = useFormLayout(computed(() => ({
      columns: displayColumns.value,
      colProps: props.colProps,
      actionColProps: props.actionColProps,
      actionPosition: props.actionPosition,
    })))

    const toggleCollapse = () => collapsed.value = !collapsed.value

    const updateModel = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
      props.searchOnChange && emit('submit')
    }

    const renderFieldComponent = (column: FieldColumn) => {
      if (slots[column.prop]) {
        return slots[column.prop]?.(column)
      }
      return (
        column.type === 'divider'
          ? (
              <ElDivider
                {...column.props}
              >
                {column.label}
              </ElDivider>
            )
          : (
              <FormComponent
                {...column.props}
                v-slots={column.slots}
                model-value={props.modelValue[column.prop]}
                onUpdate:model-value={(e: any) => updateModel(e, column.prop)}
                type={column.type}
              />
            )
      )
    }

    const renderFormLabel = (column: XFormColumn, suffix = '') => {
      if (typeof column.label === 'function') return column.label()
      return `${column.label}${suffix}`
    }

    const renderActions = () => (
      <>
        <ElButton type="primary" onClick={() => emit('submit')}>查询</ElButton>
        <ElButton onClick={() => emit('reset')}>重置</ElButton>
        <ElLink underline="never" onClick={toggleCollapse}>
          {collapsed.value ? '展开' : '收起'}
          <ElIcon style="margin-left: 2px;">
            {collapsed.value ? <ArrowDown /> : <ArrowUp />}
          </ElIcon>
        </ElLink>
      </>
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
      if (column.type === 'divider') {
        return renderFieldComponent(column)
      }
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
