<template>
  <XCard title="新增用户" full>
    <ElForm
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      style="max-width: 460px;"
    >
      <ElFormItem label="姓名" prop="name">
        <ElInput v-model="form.name" placeholder="请填写用户姓名" />
      </ElFormItem>

      <ElFormItem label="手机号码" prop="phone">
        <ElInput v-model="form.phone" placeholder="请输入手机号码" />
      </ElFormItem>

      <ElFormItem label="邮箱" prop="email">
        <ElInput v-model="form.email" placeholder="请填写邮箱地址" />
      </ElFormItem>

      <ElFormItem label="性别" prop="sex">
        <ElRadioGroup v-model="form.sex">
          <ElRadio label="男" :value="1" />
          <ElRadio label="女" :value="2" />
        </ElRadioGroup>
      </ElFormItem>

      <ElFormItem label="角色" prop="role">
        <ElSelect v-model="form.role" placeholder="请选择用户角色" style="width: 100%;">
          <ElOption label="管理员" :value="1" />
          <ElOption label="普通用户" :value="2" />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="个人简介" prop="desc">
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
import Valr from 'valr'

const router = useRouter()
const formRef = ref()
const form = reactive({
  name: '',
  phone: '',
  email: '',
  sex: 1,
  role: 2,
  desc: '',
})

const rules = {
  name: Valr.string().required().getElRules(),
  phone: Valr.string().required().phone().getElRules('blur'),
  email: Valr.string().required().email().getElRules('blur'),
  desc: Valr.string().max(200, '个人简介最多不超过200字').getElRules(),
}

function handleSubmit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('submit', form)
    }
  })
}

function handleCancel() {
  router.go(-1)
}
</script>
