<template>
  <x-card>
    <x-query-form inline label-width="70px" style="margin-bottom: -18px;">
      <el-form-item label="用户名">
        <el-input v-model="queryForm.name" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="queryForm.phone" placeholder="请输入手机号码" />
      </el-form-item>

      <template #action>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <template #icon>
              <i-ep-search />
            </template>
            查询
          </el-button>
        </el-form-item>
      </template>
    </x-query-form>
  </x-card>

  <x-card>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="16">
        <el-button type="primary" @click="handleCreate">
          <template #icon>
            <i-ep-plus />
          </template>
          新增
        </el-button>
      </el-col>
    </el-row>

    <x-table
      v-loading="loading"
      :columns="columns"
      :data-source="tableData"
      :total="tableTotal"
      :page-size="queryForm.pageSize"
      :page-num="queryForm.pageNum"
      @change="handleTableChange"
    >
      <template #status="{ row }">
        <el-switch
          :model-value="row.status"
          :active-value="1"
          :inactive-value="1"
        />
      </template>

      <template #role="{ row }">
        <el-tag v-if="row.role === 1" disable-transitions style="width: 65px;">
          管理员
        </el-tag>
        <el-tag v-else type="success" disable-transitions style="width: 65px;">
          普通用户
        </el-tag>
      </template>

      <template #action="{ row }">
        <x-space>
          <el-link :underline="false" type="primary" @click="handleCreate">
            修改
          </el-link>
          <el-link :underline="false" type="danger" @click="handleDelete(row)">
            删除
          </el-link>
        </x-space>
      </template>
    </x-table>
  </x-card>
</template>

<script setup lang='ts'>
import { getUserList } from '@/api/user'

const columns = ref(
  [
    {
      type: 'index',
      label: '序号',
      align: 'center',
      width: 80,
    },
    {
      label: '姓名',
      prop: 'name',
      align: 'center',
    },
    {
      label: '性别',
      prop: 'sex',
      align: 'center',
    },
    {
      label: '角色',
      prop: 'role',
      align: 'center',
    },
    {
      label: '操作',
      prop: 'action',
      align: 'center',
      width: 120,
    },
  ],
)

const queryForm = reactive({
  name: '',
  phone: '',
  pageSize: 10,
  pageNum: 1,
})
const loading = ref(false)
const tableData = ref<UserType.ListItem[]>([])
const tableTotal = ref(0)
const router = useRouter()

async function getList() {
  loading.value = true
  try {
    const { data } = await getUserList(queryForm)
    tableData.value = data.list
    tableTotal.value = data.count
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}

function handleQuery() {
  queryForm.pageNum = 1
  getList()
}

function handleTableChange({ pageSize, pageNum }: XTableChangeData) {
  queryForm.pageNum = pageNum
  queryForm.pageSize = pageSize
  getList()
}

function handleCreate() {
  router.push('/user/create')
}

async function handleDelete(row: UserType.ListItem) {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 ${row.name} 吗?`,
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    )
    ElMessage.success('删除成功')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getList()
})
</script>
