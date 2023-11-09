import type ElTable from 'element-plus/lib/components/table'
import type { ElTableColumn } from 'element-plus/lib/components/table'

export { }

type ElTableType = InstanceType<typeof ElTable>
type ElTableProps = ElTableType['$props']
type ElTableColumnProps = InstanceType<typeof ElTableColumn>['$props']
type ElTableSort = Pick<Required<ElTableProps>['defaultSort'], 'prop' | 'order'>

declare global {
  type XTableSort = ElTableSort

  interface XTableColumn extends ElTableColumnProps {
    children?: XTableColumn[]
    hidden?: boolean
  }

  interface XTableData {
    [key: string]: any
  }

  interface XTableState {
    tid: number
    sortBy?: XTableSort['prop']
    sortOrder?: XTableSort['order']
  }

  interface XTableChangeData extends Partial<XTableSort> {
    type: 'size' | 'number' | 'sort'
    pageNum: number
    pageSize: number
  }
}
