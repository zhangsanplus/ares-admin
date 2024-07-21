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
            <el-select
              v-model="queryForm.address"
              clearable
              filterable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option label="上海市普陀区 120 弄" value="1" />
              <el-option label="上海市嘉定区 340 弄" value="2" />
              <el-option label="上海市宝山区 560 弄" value="3" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="queryForm.date"
              type="date"
              placeholder="请选择"
              style="width: 100%;"
            />
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

    <el-row style="margin-bottom: 18px;">
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
        <el-switch v-model="row.status" :active-value="1" :inactive-value="0" />
      </template>

      <template #sex-header>
        性别
        <el-tooltip placement="top">
          <template #content>
            调整表头列宽度后会自动保存到本地<br>当下次访问时会自动恢复
          </template>
          <i-ep-info-filled />
        </el-tooltip>
      </template>

      <template #action>
        <x-space>
          <el-link :underline="false" type="primary" @click="handleClick">
            新增
          </el-link>
          <el-link :underline="false" type="primary" @click="handleClick">
            修改
          </el-link>
          <el-link :underline="false" type="primary" @click="handleClick">
            删除
          </el-link>
        </x-space>
      </template>

      <template #append>
        <div style=" padding: 12px;text-align: center;">
          好好学习，天天向上
        </div>
      </template>
    </x-table>
  </x-card>

  <dialog-columns v-model:visible="dialogVisible" :columns="columns" @change="handleColumnsChange" />
</template>

<script setup lang='ts'>
import { getUserList } from '@/api/user'
import DialogColumns from './components/dialog-columns.vue'
import useColumns from './composables/use-columns'

const queryForm = reactive({
  name: '',
  phone: '',
  address: '',
  date: '',
  pageSize: 10,
  pageNum: 1,
})

const dialogVisible = ref(false)
const tableRef = ref()
const tableTotal = ref(0)
const tableData = ref<UserType.ListItem[]>([])

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
