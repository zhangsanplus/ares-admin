<template>
  <x-card title="新增用户" full>
    <el-form :model="form" label-width="120px" style="max-width: 460px;">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请填写用户姓名" />
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="form.phone" placeholder="请输入手机号码" />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请填写邮箱地址" />
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" name="sex" />
          <el-radio label="女" name="sex" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="form.role" placeholder="请选择用户角色" style="width: 100%;">
          <el-option label="管理员" :value="1" />
          <el-option label="普通用户" :value="2" />
        </el-select>
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入个人简介，最多不超过200字" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">
          创建
        </el-button>
        <el-button @click="handleCancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </x-card>
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
