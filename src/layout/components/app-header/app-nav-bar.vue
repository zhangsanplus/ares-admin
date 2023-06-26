<template>
  <div class="app-nav-bar">
    <el-space :size="14">
      <el-button text circle @click="appStore.toggleDark">
        <el-icon>
          <i-ep-moon v-if="appStore.isDark" />
          <i-ep-sunny v-else />
        </el-icon>
      </el-button>

      <el-button text circle @click="toggleFullScreen">
        <el-icon>
          <svg-icon v-if="isFullscreen" name="fullscreen-exit" />
          <svg-icon v-else name="fullscreen" />
        </el-icon>
      </el-button>

      <el-badge is-dot style="margin-right: 8px;">
        <el-button text circle>
          <el-icon><i-ep-bell /></el-icon>
        </el-button>
      </el-badge>
    </el-space>

    <el-dropdown trigger="click" @command="handleCommand">
      <div class="app-user">
        <div class="app-avatar">
          <img src="@/assets/avatar.png">
        </div>
        <div class="app-user-name">
          {{ userinfo.username }}&nbsp;<el-icon><i-ep-arrow-down /></el-icon>
        </div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="github">
            <el-icon><svg-icon name="github" /></el-icon>
            项目源码
          </el-dropdown-item>
          <el-dropdown-item command="setting">
            <el-icon><i-ep-setting /></el-icon>
            用户设置
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <el-icon><i-ep-switch-button /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const { userinfo } = storeToRefs(userStore)
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

function handleCommand(command: string) {
  if (command === 'logout') {
    userStore.logout()
  } else if (command === 'github') {
    window.open('https://github.com/zhangsanplus/ares-admin', '_blank', 'noopener,noreferrer')
  } else if (command === 'setting') {
    router.push('/user/setting')
  } else {
    ElMessage(`click on item ${command}`)
  }
}
</script>

<style lang="scss">
.app-nav-bar {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin-right: 18px;

  .el-dropdown {
    height: 100%;
  }

  .el-button.is-circle {
    width: 30px;
    height: 30px;
    border: 1px solid var(--el-border-color-light);
  }
}

.app-user {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &-name {
    display: flex;
    align-items: center;
  }
}

.app-avatar {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 8px;
  overflow: hidden;
  background-color: #ededed;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>