<template>
  <x-card full title="X-Table 示例">
    <x-query-form label-width="26%" style="margin-bottom: -18px;">
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="用户名">
            <el-input v-model="queryForm.name" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="电话">
            <el-input v-model="queryForm.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="地址">
            <el-input v-model="queryForm.name" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="出生日期">
            <el-input v-model="queryForm.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <template #action>
        <el-space direction="vertical" :size="18">
          <el-button type="primary">
            <template #icon>
              <i-ep-search />
            </template>
            查询
          </el-button>
          <el-button type="info">
            <template #icon>
              <i-ep-refresh-right />
            </template>
            重置
          </el-button>
        </el-space>
      </template>
    </x-query-form>

    <el-divider />

    <el-row class="mb18">
      <el-col :span="16">
        <el-button type="primary">
          <template #icon>
            <i-ep-plus />
          </template>
          新增
        </el-button>

        <el-button type="info" @click="clearSelection">
          清除选择
        </el-button>

        <el-button type="info" @click="resetColumns">
          重置表头
        </el-button>
      </el-col>

      <el-col :span="8" style="text-align: right;">
        <el-button type="info" @click="showCustomColumn">
          自定义列
        </el-button>
      </el-col>
    </el-row>

    <x-table
      ref="tableRef"
      v-model:visible-column="dialogVisible"
      border
      :columns="columns"
      :data-source="tableData"
      :default-sort="{ prop: 'name', order: 'descending' }"
      :total="tableTotal"
      :page-size="queryForm.pageSize"
      :page-num="queryForm.pageNum"
      @change="handleTableChange"
      @column-change="handleColumnChange"
      @selection-change="handleSelectionChange"
      @header-dragend="handleHeaderDragend"
    >
      <template #append>
        <div style=" padding: 12px;text-align: center;">
          好好学习，天天向上
        </div>
      </template>

      <template #expand="{ row }">
        <p style="margin: 0 8px;padding: 15px; background: var(--el-table-header-bg-color);">
          这条数据的日期是
          <el-text type="primary">
            {{ row.date }}
          </el-text>
        </p>
      </template>

      <template #status="{ row }">
        <el-switch :model-value="row.status" :active-value="1" :inactive-value="1" />
      </template>

      <template #age-header>
        <el-button plain size="small">
          刷新自动记住列宽
        </el-button>
      </template>

      <template #action>
        <x-space>
          <el-link :underline="false" type="primary">
            新增
          </el-link>
          <el-link :underline="false" type="primary">
            修改
          </el-link>
          <el-link :underline="false" type="primary">
            删除
          </el-link>
        </x-space>
      </template>
    </x-table>
  </x-card>
</template>

<script setup lang='ts'>
import { getUserList } from '@/api/user'
import useLocalColumns from '@/composables/local-columns'

const { columns, reset: resetColumns } = useLocalColumns(
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
      type: 'expand',
      label: '展开行',
      width: 70,
    },
    {
      label: '姓名',
      prop: 'name',
      sortable: true,
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
      align: 'center',
      width: 160,
    },
    {
      label: '性别',
      prop: 'sex',
      sortable: 'custom',
    },
    {
      label: '状态',
      prop: 'status',
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

const queryForm = reactive({
  name: '',
  phone: '',
  pageSize: 10,
  pageNum: 1,
})

const dialogVisible = ref(false)
const tableRef = ref()
const tableTotal = ref(0)
const tableData = ref<UserType.ListItem[]>([])

async function getList() {
  const { data } = await getUserList(queryForm)
  tableData.value = data.list
  tableTotal.value = data.count
}

onMounted(() => {
  getList()
})

// 自定义列弹窗
function showCustomColumn() {
  dialogVisible.value = true
}

// 自定义列
function handleColumnChange(cols: XTableColumn[]) {
  columns.value = cols
}

// 清除多选
function clearSelection() {
  tableRef.value.$refs.elTableRef.clearSelection()
}

// 表头拖拽记忆
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

// 多选
function handleSelectionChange(val: XTableData[]) {
  console.log('selection change =>', JSON.parse(JSON.stringify(val)))
}

// 分页排序
function handleTableChange(data: XTableChangeData) {
  console.log(`${data.type} change =>`, data)
  const { pageSize, pageNum } = data
  queryForm.pageNum = pageNum
  queryForm.pageSize = pageSize
}
</script>