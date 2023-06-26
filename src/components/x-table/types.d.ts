interface XTableColumn {
  label?: string
  prop: string
  type?: 'selection' | 'index' | 'expand'
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right' | true
  sortable?: boolean | 'custom'
  showOverflowTooltip?: boolean
  children?: XTableColumn[]
  hidden?: boolean
  format?: (row: XTableData) => string
  [key:string]: any
}

interface XTableData {
  [key: string]: any
}

interface XTableColumnScope {
  $index: number
  row: XTableData
  column: Record<string, any>
}

interface XTableChangeParams {
  pageNum: number
  pageSize: number
  prop: string
  order: 'ascending' | 'descending'
  type: 'size' | 'number' | 'sort'
}