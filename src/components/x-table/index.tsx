import type { PropType } from 'vue'
import { ElLoading, ElPagination, ElTable, ElTableColumn } from 'element-plus'
import './index.scss'

export default defineComponent({
  name: 'XTable',
  directives: {
    loading: ElLoading.directive,
  },
  inheritAttrs: false,
  props: {
    /**
     * 表格的列描述信息
     */
    columns: {
      type: Array as PropType<XTableColumn[]>,
      required: true,
    },

    /**
     * 表格的数据
     */
    dataSource: {
      type: Array as PropType<XTableData[]>,
      required: true,
    },

    /**
     * loading
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * 最大高度，包含分页高度
     */
    maxHeight: {
      type: [Number, String] as PropType<number | 'auto'>,
      default: 'auto',
    },

    /**
     * 是否显示分页
     * 为 always 时，将一直显示
     * 为 false 时，总是不显示
     * 为 true 时，只有有数据时才显示
     */
    pageable: {
      type: [Boolean, String] as PropType<boolean | 'always'>,
      default: true,
      validator(value: boolean | 'always') {
        return ['always', true, false].includes(value)
      },
    },

    /**
     * 分页布局
     */
    pagerLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next',
      validator(value: string) {
        return value.split(',')
          .map(item => item.trim())
          .every(item => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'].includes(item))
      },
    },

    /**
     * 总条数
     */
    total: {
      type: Number,
      default: 0,
    },

    /**
     * 每页显示数量
     */
    pageSize: {
      type: Number,
      default: 10,
    },

    /**
     * 页码
     */
    pageNum: {
      type: Number,
      default: 1,
    },

    /**
     * 分页选择器的选项设置
     */
    pageSizes: {
      type: Array as PropType<number[]>,
      default() {
        return [10, 20, 30, 50]
      },
    },

    /**
     * 行数据的 Key
     */
    rowKey: {
      type: [Function, String] as PropType<(row: XTableData) => string | string>,
      default: 'id',
    },

    /**
     * 默认排序
     */
    defaultSort: {
      type: Object as PropType<XTableSort>,
    },

    /**
     * 表格的类
     */
    class: {
      type: [String, Object] as PropType<string | Record<string, any>>,
      default: () => ({}),
    },

    /**
     * 表格的样式
     */
    style: {
      type: [String, Object] as PropType<string | Record<string, any>>,
      default: () => ({}),
    },
  },
  emits: ['change'],
  setup(props, { slots, attrs, emit }) {
    const nonPropsAttrs = attrs
    const { prop: sortBy, order: sortOrder } = props.defaultSort || {}

    const tableState = reactive<XTableState>({
      tid: 0,
      sortBy,
      sortOrder,
    })

    const showPagination = computed(() => {
      if (props.pageable === 'always') return true
      return props.pageable && props.dataSource.length > 0
    })

    const mHeight = computed(() => {
      if (props.maxHeight === 'auto') return 'auto'
      return showPagination.value ? props.maxHeight - 44 : props.maxHeight
    })

    /**
     * 获取表格列插槽
     */
    function getColumnSlot(column: XTableColumn, suffix?: string) {
      const name = column.prop || column.type
      if (name) {
        const key = suffix ? `${name}-${suffix}` : name
        return slots[key]
      }
    }

    /**
     * 改变表格列的排序和分页
     */
    function onChange(data: XTableChangeData) {
      emit('change', data)
    }

    /**
     * 改变页数
     */
    function handlePageNumChange(pageNum: number) {
      const { sortBy, sortOrder } = tableState
      const { pageSize } = props
      onChange({ pageNum, pageSize, prop: sortBy, order: sortOrder, type: 'number' })
    }

    /**
     * 改变每页显示的条数
     */
    function handlePageSizeChange(pageSize: number) {
      const { sortBy, sortOrder } = tableState
      nextTick(() => {
        // 下拉框溢出可能导致溢出 body 出现滚动条
        // 加个延迟，等下拉隐藏
        onChange({ pageNum: 1, pageSize, prop: sortBy, order: sortOrder, type: 'size' })
      })
    }

    /**
     * 排序
     */
    function handleTableSortChange({ prop, order }: XTableSort) {
      const { pageSize } = props
      onChange({ pageNum: 1, pageSize, prop, order, type: 'sort' })
    }

    /**
     * 获取表格列的属性
     */
    function getColumnProps(column: XTableColumn) {
      const col = { ...column }
      Reflect.deleteProperty(col, 'children')
      Reflect.deleteProperty(col, 'hidden')
      col.key = column.key || column.prop || column.type
      col.showOverflowTooltip = col.showOverflowTooltip ?? true
      col.showOverflowTooltip = column.prop === 'action' ? false : column.showOverflowTooltip
      return col
    }

    /**
     * 渲染特殊列
     * selection/index/expand
     */
    function renderTypeColumn(column: XTableColumn) {
      const columnSlot = getColumnSlot(column)
      const columnProps = getColumnProps(column)

      const renderDefaultSlot = (scope: Record<string, any>) => {
        return columnSlot?.(scope)
      }

      const renderIndexSlot = (scope: Record<string, any>) => {
        return columnSlot?.(scope) ?? (props.pageNum - 1) * props.pageSize + scope.$index + 1
      }

      switch (column.type) {
        case 'index':
          return (
            <ElTableColumn {...columnProps}>
              {{ default: renderIndexSlot }}
            </ElTableColumn>
          )
        case 'expand':
          return (
            <ElTableColumn {...columnProps}>
              {{ default: renderDefaultSlot }}
            </ElTableColumn>
          )
        default:
          return <ElTableColumn {...columnProps} />
      }
    }

    /**
     * 渲染普通列
     */
    function renderBaseColumn(column: XTableColumn) {
      const columnSlots: {
        default?: (scope: Record<string, any>) => any
        header?: (scope: Record<string, any>) => any
      } = {}
      const columnSlot = getColumnSlot(column)
      const headerSlot = getColumnSlot(column, 'header')

      if (columnSlot) {
        columnSlots.default = scope => columnSlot(scope)
      }

      if (headerSlot) {
        columnSlots.header = scope => headerSlot(scope)
      }

      return (
        <ElTableColumn {...getColumnProps(column)}>
          {columnSlots}
        </ElTableColumn>
      )
    }

    /**
     * 渲染列
     */
    function renderTableColumn(column: XTableColumn) {
      if (column.hidden) return
      if (column.type) {
        return renderTypeColumn(column)
      }
      return renderBaseColumn(column)
    }

    /**
     * 渲染多级列
     */
    function renderColumnChildren(column: XTableColumn, children: Required<XTableColumn>['children']) {
      if (column.hidden) return
      return (
        <ElTableColumn {...getColumnProps(column)}>
          {children.map(column => renderTableColumn(column))}
        </ElTableColumn>
      )
    }

    /**
     * 渲染分页
     */
    function renderPagination() {
      const paginationProps = {
        background: true,
        total: props.total,
        layout: props.pagerLayout,
        pageSize: props.pageSize,
        pageSizes: props.pageSizes,
        currentPage: props.pageNum,
        onSizeChange: handlePageSizeChange,
        onCurrentChange: handlePageNumChange,
      } as const

      return (
        <div class="x-table-pagination">
          <ElPagination {...paginationProps} />
        </div>
      )
    }

    return () => {
      const tableProps = {
        ref: 'elTableRef',
        ...nonPropsAttrs,
        maxHeight: mHeight.value,
        data: props.dataSource,
        defaultSort: props.defaultSort,
        rowKey: props.rowKey,
        onSortChange: handleTableSortChange,
      }

      const extraSlots: {
        append?: () => any
        empty?: () => any
      } = {}

      if (slots.append) {
        extraSlots.append = () => slots.append?.()
      }

      if (slots.empty) {
        extraSlots.empty = () => slots.empty?.()
      }

      return (
        <div class={['x-table', props.class]} style={props.style}>
          <ElTable
            {...tableProps}
            v-loading={props.loading}
            v-slots={extraSlots}
          >
            {
              props.columns.map((column) => {
                if (Array.isArray(column.children)) {
                  return renderColumnChildren(column, column.children)
                }
                return renderTableColumn(column)
              })
            }
          </ElTable>
          {showPagination.value && renderPagination()}
        </div>
      )
    }
  },
})
