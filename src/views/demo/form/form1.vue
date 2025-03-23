<template>
  <XCard title="X-Form 示例">
    <template #title>
      <ElPopover>
        <pre>{{ formModel }}</pre>
        <template #reference>
          X-Form 示例
        </template>
      </ElPopover>
    </template>
    <XForm
      v-model="formModel"
      :columns="formColumns1"
      label-width="100px"
      label-suffix=":"
      searchable
      @submit="handleSubmit"
      @reset="handleReset"
    >
      <template #phone>
        <ElInput
          v-model="formModel.phone"
          style="width: 240px"
          maxlength="10"
          placeholder="Please input"
          show-word-limit
          type="text"
        />
      </template>
    </xform>
  </XCard>

  <XCard>
    <template #title>
      <ElPopover>
        <pre>{{ formModel }}</pre>
        <template #reference>
          X-Form 示例
        </template>
      </ElPopover>
    </template>

    <XForm
      v-model="formModel"
      :columns="formColumns2"
      searchable
      search-on-change
      :collapsed-rows="3"
      @submit="handleChange"
      @reset="handleReset"
    />
  </XCard>
</template>

<script setup lang="tsx">
import type { XFormColumn } from '@/components/x-form/types'
import { Location } from '@element-plus/icons-vue'

const formModel = ref({
  name: '',
  phone: '',
  address: '',
  gender: '1',
  city: [],
  age: '',
  date: '',
  time: '',
  dateTime: '',
  dateTimeRange: [],
  pageConfig: [],
  pageSize: 10,
  pageNum: 1,
})

const formColumns1: XFormColumn[] = [
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

const formColumns2: XFormColumn[] = [
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
  },
  {
    label: '手机号',
    prop: 'phone',
    type: 'input',
    slots: {
      prepend: () => '+86',
      append: () => '后缀',
    },
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
    slots: {
      label: option => (
        <span>
          <el-icon><Location /></el-icon>
          {option.label}
        </span>
      ),
    },
  },
  {
    label: () => (
      <span style="color: red;">出生日期</span>
    ),
    prop: 'date',
    type: 'date-picker',
  },
  {
    label: '性别',
    prop: 'gender',
    type: 'radio',
    props: {
      options: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ],
    },
  },
  {
    label: '分页配置',
    prop: 'pageConfig',
    type: 'checkbox',
    props: {
      options: [
        {
          label: '显示每页条数',
          value: 1,
        },
        {
          label: '显示当前页',
          value: 2,
        },
      ],
    },
  },
  {
    label: '每页条数',
    prop: 'pageSize',
    type: 'input-number',
    show(form) {
      return form.pageConfig.includes(1)
    },
  },
  {
    label: '当前页',
    prop: 'pageNum',
    type: 'input-number',
    hide(form) {
      return !form.pageConfig.includes(2)
    },
  },
  {
    label: '城市',
    prop: 'city',
    type: 'checkbox',
    props: {
      button: true,
      options: [
        {
          label: '上海',
          value: '1',
        },
        {
          label: '北京',
          value: '2',
        },
        {
          label: '广州',
          value: '3',
        },
      ],
    },
  },
  {
    prop: 'divider',
    type: 'divider',
    label: '分割线',
  },
  {
    label: '时间',
    prop: 'time',
    type: 'time-picker',
  },
  {
    label: '日期时间',
    prop: 'dateTime',
    type: 'date-picker',
    props: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '日期时间范围',
    prop: 'dateTimeRange',
    type: 'date-picker',
    props: {
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
]

function handleChange() {
  ElMessage.success('已更新')
}

function handleSubmit() {
  ElMessage.success('提交成功')
}

function handleReset() {
  formModel.value = {
    ...formModel.value,
    name: '',
    phone: '',
    address: '',
    gender: '',
    city: [],
    age: '',
    date: '',
    time: '',
    dateTime: '',
    dateTimeRange: [],
    pageConfig: [],
    pageSize: 10,
    pageNum: 1,
  }
  ElMessage.success('重置成功')
}
</script>
