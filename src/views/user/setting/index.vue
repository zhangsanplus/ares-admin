<template>
  <XCard title="个人信息" full>
    <XForm
      v-model="form"
      :columns="formOptions"
      :col-props="{ span: 24 }"
      label-width="80px"
      label-suffix="："
      style="max-width: 460px;margin: 50px 0;"
    >
      <template #avatar>
        <XUpload v-model="form.avatar" accept="image/*" style="cursor: pointer;">
          <ElAvatar :size="60" :src="img" />
        </XUpload>
      </template>
    </XForm>
  </XCard>
</template>

<script lang="ts" setup>
import type { XFormColumn } from '@/components/x-form/types'
import avatarImg from '@/assets/avatar.png'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const img = ref(avatarImg)
const form = ref<UserType.UserInfo>({
  username: '',
  role: 1,
  avatar: null,
})

const formOptions = reactive<XFormColumn[]>([
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

watchEffect(() => {
  if (form.value.avatar) {
    img.value = URL.createObjectURL(form.value.avatar)
  }
})

onMounted(() => {
  const userinfo = userStore.userinfo
  form.value.username = userinfo.username
  form.value.role = userinfo.role
})
</script>
