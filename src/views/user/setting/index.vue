<template>
  <XCard title="个人信息" full>
    <XForm
      v-model="form"
      :columns="formColumns"
      :col-props="{
        span: 24,
      }"
      label-width="80px"
      label-suffix="："
      style="max-width: 460px;margin: 50px 0;"
    >
      <template #avatar>
        <ElAvatar :size="60">
          <img src="@/assets/avatar.png" alt="">
        </ElAvatar>
      </template>
    </XForm>
  </XCard>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user'

const form = reactive<Partial<UserType.UserInfo>>({
  username: '',
  role: undefined,
})

const formColumns = reactive<XFormColumn[]>([
  {
    label: '头像',
    prop: 'avatar',
    type: 'custom',
  },
  {
    label: '姓名',
    prop: 'username',
    type: 'input',
  },
  {
    label: '角色',
    prop: 'role',
    type: 'select',
    props: {
      options: [
        { label: '管理员', value: 1 },
        { label: '普通用户', value: 2 },
      ],
    },
  },
])

const userStore = useUserStore()

onMounted(() => {
  const userinfo = userStore.userinfo
  form.username = userinfo.username
  form.role = userinfo.role
})
</script>
