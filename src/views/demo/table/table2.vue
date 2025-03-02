<template>
  <XCard>
    <div class="container">
      <XForm v-model="form" :columns="formColumns">
        <template #action>
          <ElButton type="primary" @click="query">
            <template #icon>
              <IEpSearch />
            </template>
            查询
          </ElButton>
          <ElButton type="info" @click="reset">
            <template #icon>
              <IEpRefreshRight />
            </template>
            重置
          </ElButton>
          <ElPopover
            :width="240"
            trigger="hover"
            placement="top-start"
            effect="dark"
            content="在需要时可调用 abort 方法来取消请求。打开 DevTools 工具模拟网速可进行测试"
          >
            <template #reference>
              <ElButton type="info" @click="abort">
                取消请求
              </ElButton>
            </template>
          </ElPopover>
        </template>
      </XForm>

      <XTable :columns="columns" v-bind="tableProps" class="flex-1">
        <template #status="{ row }">
          <ElSwitch :model-value="row.status" :active-value="1" :inactive-value="1" />
        </template>
      </XTable>
    </div>
  </XCard>
</template>

<script setup lang='ts'>
import { getArticleList } from '@/api/article'
import useTable from '@/composables/use-table'

const formColumns = ref<XFormColumn[]>([
  {
    prop: 'title',
    type: 'input',
    label: '文章标题',
    props: {
      placeholder: '请输入标题',
    },
  },
])

const columns = ref([
  {
    type: 'index',
    label: '序号',
    align: 'center',
    width: 80,
  },
  {
    label: '分类',
    prop: 'category',
    align: 'center',
  },
  {
    label: '标题',
    prop: 'title',
    showOverflowTooltip: true,
    minWidth: '300px',
  },
])

const { tableProps, form, query, reset, abort } = useTable(
  getArticleList,
  {
    title: '',
    title2: '',
  },
  {
    pageSize: 20,
    onBeforeRequest(params, paging) {
      return {
        ...paging,
        title: params.title,
        remark: 'beforeRequest',
      }
    },
    onSuccess(data) {
      console.log('onSuccess', data)
    },
  },
)
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
}

@media screen and (width >= 980px) {
  .container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 185px);
  }
}
</style>
