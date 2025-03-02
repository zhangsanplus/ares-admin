<template>
  <XCard title="新增用户" full>
    <ElForm :model="form" label-width="120px" style="max-width: 460px;">
      <ElFormItem label="姓名">
        <ElInput v-model="form.name" placeholder="请填写用户姓名" />
      </ElFormItem>

      <ElFormItem label="手机号码">
        <ElInput v-model="form.phone" placeholder="请输入手机号码" />
      </ElFormItem>

      <ElFormItem label="邮箱">
        <ElInput v-model="form.email" placeholder="请填写邮箱地址" />
      </ElFormItem>

      <ElFormItem label="性别">
        <ElRadioGroup v-model="form.sex">
          <ElRadio label="男" value="sex" />
          <ElRadio label="女" value="sex" />
        </ElRadioGroup>
      </ElFormItem>

      <ElFormItem label="角色">
        <ElSelect v-model="form.role" placeholder="请选择用户角色" style="width: 100%;">
          <ElOption label="管理员" :value="1" />
          <ElOption label="普通用户" :value="2" />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="个人简介">
        <ElInput v-model="form.desc" type="textarea" placeholder="请输入个人简介，最多不超过200字" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="handleSubmit">
          创建
        </ElButton>
        <ElButton @click="handleCancel">
          取消
        </ElButton>
      </ElFormItem>
    </ElForm>
  </XCard>
</template>

<script lang="ts" setup>
const router = useRouter()
const form = reactive({
  name: '',
  phone: '',
  email: '',
  sex: '',
  role: '',
  desc: '',
})

function handleSubmit() {
  console.log('submit!')
}

function handleCancel() {
  router.go(-1)
}
</script>
