<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-banner" />
      <div class="login-form">
        <div class="login-title">
          欢迎登录 {{ appStore.title }}
        </div>
        <el-form
          ref="formRef"
          hide-required-asterisk
          :model="form"
          :rules="rules"
          @submit="handleSubmit"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="form.username"
              :validate-event="false"
              placeholder="请输入账号"
            >
              <template #prefix>
                <el-icon><i-ep-user /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              :validate-event="false"
              type="password"
              show-password
              placeholder="请输入密码"
            >
              <template #prefix>
                <el-icon><i-ep-lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="verify">
            <login-verify ref="verifyRef" v-model="form.verify" />
          </el-form-item>

          <el-form-item>
            <el-row justify="space-between" style="width: 100%;">
              <el-checkbox
                v-model="form.remember"
                label="记住密码"
              />

              <el-link type="primary" :underline="false">
                忘记密码
              </el-link>
            </el-row>
          </el-form-item>

          <el-space direction="vertical" fill style="width: 100%;">
            <el-button
              long
              type="primary"
              :loading="loading"
              @click="handleSubmit"
            >
              登录
            </el-button>
            <el-button long text>
              注册账号
            </el-button>
          </el-space>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import LoginVerify from './login-verify.vue'
import type { FormInstance } from 'element-plus'

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名至少为 3 个字符' },
    { max: 12, message: '用户名最多为 12 个字符' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 5, message: '密码至少为 5 个字符' },
    { max: 18, message: '密码最多为 18 个字符' },
  ],
}

const storageForm = useStorage('app-login', {
  username: 'admin',
  password: 'admin',
  remember: true,
})

const form = reactive({
  username: storageForm.value.username,
  password: storageForm.value.password,
  remember: storageForm.value.remember,
  verify: false,
})

const appStore = useAppStore()
const userStore = useUserStore()
const { currentRoute, push } = useRouter()
const formRef = ref<FormInstance>()
const verifyRef = ref()
const loading = ref(false)

function onRedirect() {
  const { redirect, ...othersQuery } = currentRoute.value.query
  push({
    path: (redirect as string) || '/',
    query: {
      ...othersQuery,
    },
  })
}

async function onLogin() {
  loading.value = true
  try {
    await userStore.login(form)
    onRedirect()
    ElMessage.success('欢迎使用！')
    const remember = form.remember
    storageForm.value.username = remember ? form.username : ''
    storageForm.value.password = remember ? form.password : ''
    storageForm.value.remember = remember
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}

function handleSubmit() {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    if (!form.verify) {
      verifyRef.value.visible = true
      return
    }
    onLogin()
  })
}
</script>

<style lang="scss">
.login {
  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: var(--el-bg-color) url(@/assets/login-bg.png);
  }

  &-wrapper {
    display: flex;
    width: 900px;
    height: 480px;
    overflow: hidden;
    background-color: var(--el-bg-color-overlay);
    border-radius: 10px;
    box-shadow: 0 1px 14px 2px rgba(7, 27, 48, 0.09);
  }

  &-banner {
    position: relative;
    width: 420px;
    height: 100%;
    background: url(@/assets/login-banner.jpg);
    background-size: cover;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      content: '';
    }
  }

  &-form {
    --el-component-size: 36px;

    flex: 1;
    padding: 60px;

    .el-button {
      height: var(--el-component-size);
    }
  }

  &-title {
    margin-bottom: 50px;
    font-size: 24px;
    text-align: center;
  }
}

@media only screen and (width <= 768px) {
  .login-banner {
    display: none;
  }

  .login-wrapper {
    box-shadow: none;
  }
}
</style>
