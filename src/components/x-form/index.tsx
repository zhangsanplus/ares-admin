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
import { computed, defineComponent, ref } from 'vue'
import FormComponent, { defaultProps } from './form-component'
import {
  getGreaterSpan,
  getSumColProps,
  isColumnVisible,
  mergeProps,
  normalizeColProps,
  points,
} from './utils'
import './index.scss'

type DividerParsedColumn = Extract<XFormParsedColumn, { type: 'divider' }>
type ExcludeDividerParsedColumn = Exclude<XFormParsedColumn, DividerParsedColumn>
type RestParsedColumn = Exclude<XFormParsedColumn, { type: 'custom' } | { type: 'divider' }>

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
    labelSuffix: String,
    search: Boolean,
    searchOnChange: Boolean,
  },
  emits: ['update:modelValue', 'submit', 'reset'],
  setup(props, { emit, attrs, expose, slots }) {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const collapsed = ref(false)
    const breakpoints = useBreakpoints(breakpointsElement)
    const currentBreakpoint = breakpoints.active()

    const normalizedColumns = computed<XFormParsedColumn[]>(() => {
      return props.columns.map((column) => {
        if (column.type === 'custom') {
          return {
            ...column,
            colProps: normalizeColProps(getColProps(column)),
          }
        }

        const _props = defaultProps[column.type]
        return {
          ...column,
          props: mergeProps(column.props, _props),
          colProps: normalizeColProps(getColProps(column)),
        } as XFormParsedColumn
      })
    })

    const displayColumns = computed(() => {
      const columns = normalizedColumns.value
        .filter(column => isColumnVisible(column, props.modelValue))

      if (!collapsed.value || props.collapsedRows <= 0) return columns

      const lastIndex = getLastIndex(columns, currentBreakpoint.value || 'xs')
      return columns.slice(0, lastIndex)
    })

    const actionDefaultCols = computed(() => {
      return normalizeColProps(props.actionColProps ?? props.colProps)
    })

    const actionColProps = computed(() => {
      const cols = { ...actionDefaultCols.value }
      if (props.actionPosition === 'right') {
        const list = displayColumns.value.map(column => column.colProps)
        const sumCols = getSumColProps(list)
        points.forEach((point) => {
          cols[point] = getGreaterSpan(sumCols[point], cols[point])
        })
      }
      return cols
    })

    function getColProps(column: XFormColumn) {
      if (column.type === 'divider') return { span: 24 }
      return column.colProps ?? props.colProps
    }

    function getLastIndex(columns: XFormParsedColumn[], point: keyof XFormParsedColProps) {
      const rowSpan = 24 * props.collapsedRows
      const remainingSpan = rowSpan - actionDefaultCols.value[point]
      const span = remainingSpan <= 0 ? rowSpan : remainingSpan

      let spanSum = 0
      for (let i = 0; i < columns.length; i++) {
        const colProps = columns[i].colProps!
        spanSum += colProps[point]
        if (spanSum > span) {
          return i
        }
      }

      return columns.length
    }

    function toggleCollapse() {
      collapsed.value = !collapsed.value
    }

    function handleValueUpdate(value: any, field: string) {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
      props.searchOnChange && emit('submit')
    }

    function renderFormLabel({ label }: XFormColumn, suffix = '') {
      if (typeof label === 'function') return label
      return () => `${label}${suffix}`
    }

    function renderActions() {
      return (
        <>
          <ElButton type="primary" onClick={() => emit('submit')}>
            查询
          </ElButton>
          <ElButton onClick={() => emit('reset')}>
            重置
          </ElButton>
          <ElLink underline={false} onClick={toggleCollapse}>
            {collapsed.value ? '展开' : '收起'}
            <ElIcon style="margin-left: 2px;">
              {collapsed.value ? <ArrowDown /> : <ArrowUp />}
            </ElIcon>
          </ElLink>
        </>
      )
    }

    function renderDivider(column: DividerParsedColumn) {
      return (<ElDivider {...column.props}>{ renderFormLabel(column) }</ElDivider>)
    }

    function renderFormField(column: RestParsedColumn) {
      return (
        <FormComponent
          {...column.props}
          model-value={props.modelValue[column.prop ?? '']}
          onUpdate:model-value={(e: any) => handleValueUpdate(e, column.prop ?? '')}
          type={column.type}
          slots={column.slots}
        />
      )
    }

    function renderFormItem(column: ExcludeDividerParsedColumn) {
      return (
        <ElFormItem
          {...column.formItemProps}
          prop={column.prop}
          v-slots={{
            ...column.formItemSlots,
            label: renderFormLabel(column, props.labelSuffix),
          }}
        >
          {
            column.type === 'custom'
              ? slots[column.prop]?.()
              : renderFormField(column)
          }
        </ElFormItem>
      )
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
        <ElRow
          gutter={props.gutter}
          justify={props.justify}
        >
          {displayColumns.value.map(column => (
            <ElCol {...column.colProps} key={column.prop}>
              {
                column.type === 'divider'
                  ? renderDivider(column)
                  : renderFormItem(column)
              }
            </ElCol>
          ))}

          {(props.search || slots.action) && (
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
