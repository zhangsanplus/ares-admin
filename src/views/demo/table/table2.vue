<template>
  <x-card>
    <x-query-form label-width="90px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>

      <template #action>
        <el-button type="primary" @click="query">
          <template #icon>
            <i-ep-search />
          </template>
          查询
        </el-button>

        <el-button type="info" @click="reset">
          <template #icon>
            <i-ep-refresh-right />
          </template>
          重置
        </el-button>

        <el-popover
          :width="240"
          trigger="hover"
          placement="top-start"
          effect="dark"
          content="在需要时可调用 abort 方法来取消请求。打开 DevTools 工具模拟网速可进行测试"
        >
          <template #reference>
            <el-button type="info" @click="abort">
              取消请求
            </el-button>
          </template>
        </el-popover>
      </template>
    </x-query-form>
  </x-card>

  <x-card>
    <x-table :columns="columns" v-bind="tableProps">
      <template #status="{ row }">
        <el-switch :model-value="row.status" :active-value="1" :inactive-value="1" />
      </template>
    </x-table>
  </x-card>
</template>

<script setup lang='ts'>
import { getArticleList } from '@/api/article'
import useTable from '@/composables/use-table'

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

const { tableProps, form, query, reset, abort } = useTable(getArticleList, {
  defaultParams: {
    title: '',
  },
  onSuccess(data, params) {
    console.log('data, params =>', data, params)
  },
})
</script>

<style lang="scss" scoped></style>
