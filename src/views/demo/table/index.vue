<template>
  <x-card full title="X-Table 示例">
    <x-query-form label-width="26%" style="margin-bottom: -18px;">
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="用户名">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="电话">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="地址">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="出生日期">
            <el-input v-model="state.value" placeholder="请输入" />
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
      :total="state.tableTotal"
      :page-size="state.pageSize"
      :page-num="state.pageNum"
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
import useLocalColumns from '@/hooks/local-columns'

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

const tableRef = ref()
const dialogVisible = ref(false)
const state = reactive({
  value: '',
  pageSize: 10,
  pageNum: 2,
  tableTotal: 100,
})

const tableData = computed(() => {
  return Array.from({ length: state.pageSize }).map((_, index) => {
    const i = index + (state.pageNum - 1) * state.pageSize
    return {
      date: `${i + 1}月${i + 1}日`,
      name: `李${i + 1}`,
      age: Math.floor(Math.random() * 100),
      sex: Math.random() > 0.5 ? '男' : '女',
      city: Math.random() > 0.5 ? '上海市' : '北京市',
      area: `上海市普陀区金沙江路上海市普陀区金沙江路${i + 1}号`,
      status: Math.random() > 0.5 ? 0 : 1,
    }
  })
})

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
  state.pageNum = pageNum
  state.pageSize = pageSize
}
</script>