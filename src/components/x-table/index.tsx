import { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import XColumn from '@/components/x-column/index.vue'
import { isFunction, isUndefined } from '@/utils/is'
import type { PropType } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'XTable',
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
     * 初始排序
     */
    defaultSort: {
      type: Object as PropType<{ prop: string; order: 'ascending' | 'descending' }>,
      default() {
        return { prop: '', order: '' }
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
     * 打开自定义列
     */
    visibleColumn: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ['change', 'columnChange', 'update:visibleColumn'],
  setup(props, { slots, attrs, emit }) {
    // 定义需要继承的非 props 属性
    const nonPropsAttrs = attrs
    const { prop, order } = props.defaultSort
    const tableState = reactive<{
      tid: number
      currentPage: number
      sortBy: string
      sortOrder: 'ascending' | 'descending'
      tableData: XTableData[]
    }>({
      tid: 0,
      currentPage: 1,
      sortBy: prop,
      sortOrder: order,
      tableData: [],
    })

    const showPagination = computed(() => {
      if (props.pageable === 'always') return true
      return props.pageable && props.dataSource.length > 0
    })

    const mHeight = computed(() => {
      if (props.maxHeight === 'auto') {
        return 'auto'
      }
      return showPagination.value ? props.maxHeight - 44 : props.maxHeight
    })

    watch(
      () => props.dataSource,
      (value) => {
        tableState.tableData = value
      },
      { immediate: true },
    )

    watch(
      () => props.pageNum,
      () => {
        tableState.currentPage = props.pageNum
      },
    )

    /**
     * 改变表格列的排序和分页
     */
    function onChange(data: XTableChangeParams) {
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
    function handleTableSortChange({ prop, order }: any) {
      const { pageSize } = props
      onChange({ pageNum: 1, pageSize, prop, order, type: 'sort' })
    }

    /**
     * 自定义列回调
     */
    function handleColumnChange(cols: XTableColumn[]) {
      emit('columnChange', cols)
    }

    /**
     * 自定义列隐藏
     */
    function handleVisibleChange(val: boolean) {
      emit('update:visibleColumn', val)
    }

    /**
     * 获取表格列的属性
     */
    function getColumnProps(column: XTableColumn) {
      const col = { ...column }
      Reflect.deleteProperty(col, 'children')
      Reflect.deleteProperty(col, 'format')
      col.key = column.key || column.prop || column.type
      col.minWidth = column.minWidth ?? 100
      col.showOverflowTooltip = col.showOverflowTooltip ?? true
      col.showOverflowTooltip = column.prop === 'action' ? false : column.showOverflowTooltip
      return col
    }

    /**
     * 渲染列
     */
    function renderFormatColumn(column: XTableColumn, row: XTableData) {
      const value = row[column.prop]
      return isFunction(column.format)
        ? column.format({ prop: column.prop, value, row })
        : value
    }

    /**
     * 渲染特殊列
     */
    function renderTypeColumn(column: XTableColumn) {
      if (column.type === 'expand') {
        return (
          <ElTableColumn {...getColumnProps(column)}>
            {{
              default: (scope: any) => {
                const slot = slots[column.prop]
                return slot ? slot(scope) : null
              },
            }}
          </ElTableColumn>
        )
      }
      return (
        <ElTableColumn {...getColumnProps(column)} />
      )
    }

    /**
     * 渲染 字段列 和 字段头 插槽
     */
    function renderTableColumn(column: XTableColumn) {
      if (column.hidden) return null
      if (column.type) {
        return renderTypeColumn(column)
      }
      return (
        <ElTableColumn {...getColumnProps(column)} >
          {{
            default: (scope: XTableColumnScope) => {
              const slot = slots[column.prop]
              return slot ? slot(scope) : renderFormatColumn(column, scope.row)
            },
            header: (scope: Omit<XTableColumnScope, 'row'>) => {
              const slot = slots[`${column.prop}-header`]
              return slot ? slot(scope) : scope.column.label
            },
          }}
        </ElTableColumn>
      )
    }

    /**
     * 渲染多级列
     */
    function renderColumnChildren(item: XTableColumn, children: Required<XTableColumn>['children']) {
      if (item.hidden) return null
      return (
        <ElTableColumn {...getColumnProps(item)}>
          {
            children.map(item => renderTableColumn(item))
          }
        </ElTableColumn>
      )
    }

    /**
     * 渲染分页
     */
    function renderPagination() {
      const paginationProps = {
        size: 'small',
        background: true,
        total: props.total,
        layout: props.pagerLayout,
        pageSize: props.pageSize,
        defaultPageSize: props.pageSize,
        pageSizes: props.pageSizes,
        currentPage: tableState.currentPage,
        onSizeChange: handlePageSizeChange,
        onCurrentChange: handlePageNumChange,
      }

      return (
        <div class="x-table-pagination">
          <ElPagination {...paginationProps} />
        </div>
      )
    }

    /**
     * 渲染自定义列
     */
    function renderCustomColumn() {
      const customColumnProps = {
        columns: props.columns,
        visible: props.visibleColumn,
        onChange: handleColumnChange,
        onVisibleChange: handleVisibleChange,
      }

      return (
        <XColumn {...customColumnProps} />
      )
    }

    return () => {
      const tableProps = {
        ref: 'XTable',
        ...nonPropsAttrs,
        maxHeight: mHeight.value,
        key: tableState.tid,
        data: tableState.tableData,
        defaultSort: props.defaultSort,
        onSortChange: handleTableSortChange,
      }
      return (
        <div class="x-table">
          <ElTable {...tableProps}>
            {
              props.columns.map((item) => {
                if (Array.isArray(item.children)) {
                  return renderColumnChildren(item, item.children)
                }
                return renderTableColumn(item)
              })
            }
          </ElTable>
          {showPagination.value && renderPagination()}
          {!isUndefined(props.visibleColumn) && renderCustomColumn()}
        </div>
      )
    }
  },
})