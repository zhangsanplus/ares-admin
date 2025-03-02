<template>
  <XCard full title="X-Table 示例">
    <XForm
      v-model="queryForm"
      :columns="formColumns"
      search
    />
    <ElDivider style="margin: 0 0 18px;" />
    <ElRow style="margin-bottom: 18px;">
      <ElCol :span="16" :xs="24">
        <ElButton type="primary">
          <template #icon>
            <IEpPlus />
          </template>
          新增
        </ElButton>
        <ElButton type="info" @click="clearSelection">
          清除选择
        </ElButton>
        <ElButton type="info" @click="resetColumns">
          重置表头
        </ElButton>
      </ElCol>

      <ElCol :span="8" :xs="24" style="text-align: right;">
        <ElButton type="info" @click="showCustomColumn">
          自定义列
        </ElButton>
      </ElCol>
    </ElRow>

    <XTable
      ref="tableRef"
      border
      :columns="columns"
      :data-source="tableData"
      :default-sort="{ prop: 'status', order: 'ascending' }"
      :total="tableTotal"
      :page-size="queryForm.pageSize"
      :page-num="queryForm.pageNum"
      @change="handleTableChange"
      @selection-change="handleSelectionChange"
      @header-dragend="handleHeaderDragend"
    >
      <template #status="{ row }">
        <ElSwitch v-model="row.status" :active-value="1" :inactive-value="0" />
      </template>

      <template #sex-header>
        性别
        <ElTooltip placement="top">
          <template #content>
            调整表头列宽度后会自动保存到本地<br>当下次访问时会自动恢复
          </template>
          <IEpInfoFilled />
        </ElTooltip>
      </template>

      <template #action>
        <BaseSpace>
          <ElLink :underline="false" type="primary" @click="handleClick">
            新增
          </ElLink>
          <ElLink :underline="false" type="primary" @click="handleClick">
            修改
          </ElLink>
          <ElLink :underline="false" type="primary" @click="handleClick">
            删除
          </ElLink>
        </BaseSpace>
      </template>

      <template #append>
        <div style=" padding: 12px;text-align: center;">
          好好学习，天天向上
        </div>
      </template>
    </XTable>
  </XCard>

  <DialogColumns v-model:visible="dialogVisible" :columns="columns" @change="handleColumnsChange" />
</template>

<script setup lang='ts'>
import { getUserList } from '@/api/user'
import BaseSpace from '@/components/base-space.vue'
import DialogColumns from './components/dialog-columns.vue'
import useColumns from './composables/use-columns'

const dialogVisible = ref(false)
const tableRef = ref()
const tableTotal = ref(0)
const tableData = ref<UserType.ListItem[]>([])

const queryForm = reactive({
  name: '',
  phone: '',
  address: '',
  date: '',
  pageSize: 10,
  pageNum: 1,
})

const formColumns: XFormColumn[] = [
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
  },
  {
    label: '手机号',
    prop: 'phone',
    type: 'input',
  },
  {
    label: '地址',
    prop: 'address',
    type: 'select',
    props: {
      options: [
        {
          label: '上海市普陀区 120 弄',
          value: '1',
        },
        {
          label: '上海市嘉定区 340 弄',
          value: '2',
        },
        {
          label: '上海市宝山区 560 弄',
          value: '3',
        },
      ],
    },
  },
  {
    label: '出生日期',
    prop: 'date',
    type: 'date-picker',
  },
]

const { columns, reset: resetColumns } = useColumns(
  'table1',
  [
    {
      type: 'selection',
      width: 40,
    },
    {
      type: 'index',
      label: '序号',
      align: 'center',
      width: 60,
    },
    {
      label: '姓名',
      prop: 'name',
      formatter(row) {
        return h('span', { style: 'color: coral' }, row.name)
      },
    },
    {
      label: '地址',
      prop: 'address',
      hidden: true,
      children: [
        {
          label: '区域',
          prop: 'area',
        },
        {
          label: '城市',
          prop: 'city',
          sortable: true,
        },
      ],
    },
    {
      label: '年龄',
      prop: 'age',
      sortable: true,
      align: 'center',
      width: 160,
    },
    {
      label: '性别',
      prop: 'sex',
    },
    {
      label: '状态',
      prop: 'status',
      sortable: 'custom',
      align: 'center',
    },
    {
      label: '操作',
      prop: 'action',
      align: 'center',
      fixed: 'right',
      width: 190,
    },
  ],
)

// 操作
function handleClick() {
  ElMessage.info('开发中！')
}

// 自定义列弹窗
function showCustomColumn() {
  dialogVisible.value = true
}

// 自定义列
function handleColumnsChange(cols: XTableColumn[]) {
  columns.value = cols
}

// 表头宽度本地化
function handleHeaderDragend(newWidth: number, _oldWidth: number, column: any) {
  columns.value.forEach((i) => {
    if (i.prop && i.prop === column.property) {
      i.width = newWidth
    }
    if (i.type && i.type === column.type) {
      i.width = newWidth
    }
  })
}

// 清除多选
function clearSelection() {
  tableRef.value.$refs.elTableRef.clearSelection()
}

// 多选
function handleSelectionChange(val: XTableData[]) {
  console.log('selection change =>', JSON.parse(JSON.stringify(val)))
}

// 分页排序
function handleTableChange(data: XTableChangeData) {
  const { pageSize, pageNum } = data
  queryForm.pageNum = pageNum
  queryForm.pageSize = pageSize
  ElMessage.success(`${data.type} change ✨`)
}

async function getList() {
  const { data } = await getUserList(queryForm)
  data.list.sort((a, b) => a.age - b.age)
  tableData.value = data.list
  tableTotal.value = data.count
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
