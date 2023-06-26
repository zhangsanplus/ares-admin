<template>
  <x-card title="个人信息" full>
    <el-form :model="form" label-width="80px" label-suffix="：" style="max-width: 460px;margin: 50px 0;">
      <el-form-item label="头像">
        <el-avatar :size="60">
          <img src="@/assets/avatar.png" alt="">
        </el-avatar>
      </el-form-item>

      <el-form-item label="姓名">
        <el-input v-model="form.username" placeholder="请填写用户姓名" />
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="form.role" placeholder="请选择用户角色" style="width: 100%;">
          <el-option label="管理员" :value="1" />
          <el-option label="普通用户" :value="2" />
        </el-select>
      </el-form-item>
    </el-form>
  </x-card>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const form = reactive<Partial<UserType.UserInfo>>({
  username: '',
  role: undefined,
})

onMounted(() => {
  const userinfo = userStore.userinfo
  form.username = userinfo.username
  form.role = userinfo.role
})
</script>
