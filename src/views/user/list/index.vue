<template>
  <XCard>
    <div class="container">
      <XForm v-model="queryForm" :columns="formColumns">
        <template #action>
          <ElButton type="primary" @click="handleQuery">
            <template #icon>
              <IEpSearch />
            </template>
            查询
          </ElButton>
        </template>
      </XForm>

      <ElDivider style="margin: 1px 0 18px;" />

      <ElRow style="margin-bottom: 18px;">
        <ElCol :span="16">
          <ElButton type="primary" @click="handleCreate">
            <template #icon>
              <IEpPlus />
            </template>
            新增
          </ElButton>
        </ElCol>
      </ElRow>

      <XTable
        v-loading="loading"
        :columns="columns"
        :data-source="tableData"
        :total="tableTotal"
        :page-size="queryForm.pageSize"
        :page-num="queryForm.pageNum"
        class="flex-1"
        @change="handleTableChange"
      >
        <template #status="{ row }">
          <ElSwitch :model-value="row.status" :active-value="1" :inactive-value="1" />
        </template>

        <template #role="{ row }">
          <ElTag v-if="row.role === 1" disable-transitions style="width: 65px;">
            管理员
          </ElTag>
          <ElTag
            v-else
            type="success"
            disable-transitions
            style="width: 65px;"
          >
            普通用户
          </ElTag>
        </template>

        <template #action="{ row }">
          <BaseSpace>
            <ElLink :underline="false" type="primary" @click="handleCreate">
              修改
            </ElLink>
            <ElLink :underline="false" type="danger" @click="handleDelete(row)">
              删除
            </ElLink>
          </BaseSpace>
        </template>
      </XTable>
    </div>
  </XCard>
</template>

<script setup lang='ts'>
import { getUserList } from '@/api/user'
import BaseSpace from '@/components/base-space.vue'

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

const formColumns = ref<XFormColumn[]>([
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
    props: {
      placeholder: '请输入姓名',
    },
  },
  {
    label: '手机号',
    prop: 'phone',
    type: 'input',
    props: {
      placeholder: '请输入手机号',
    },
  },
])

const queryForm = reactive({
  name: '',
  phone: '',
  pageSize: 20,
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

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
}

@media screen and (width >= 1024px) {
  .container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 185px);
  }
}
</style>
