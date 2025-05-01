import type ElTable from 'element-plus/lib/components/table'
import type { ElTableColumn } from 'element-plus/lib/components/table'

type ElTableProps = InstanceType<typeof ElTable>['$props']
type ElTableColumnProps = InstanceType<typeof ElTableColumn>['$props']
type ElTableSort = Pick<Required<ElTableProps>['defaultSort'], 'prop' | 'order'>

export type XTableSort = ElTableSort

export interface XTableColumn extends ElTableColumnProps {
  children?: XTableColumn[]
  hidden?: boolean
}

export interface XTableData {
  [key: string]: any
}

export interface XTableState {
  tid: number
  sortBy?: XTableSort['prop']
  sortOrder?: XTableSort['order']
}

export interface XTableChangeData extends Partial<XTableSort> {
  type: 'size' | 'number' | 'sort'
  pageNum: number
  pageSize: number
}
