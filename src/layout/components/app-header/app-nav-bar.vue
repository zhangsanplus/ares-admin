<template>
  <div class="app-nav-bar">
    <el-space :size="14">
      <el-button text circle @click="appStore.toggleDark">
        <el-icon>
          <i-ep-moon v-if="appStore.isDark" />
          <i-ep-sunny v-else />
        </el-icon>
      </el-button>

      <el-dropdown trigger="click" @command="toggleSize">
        <el-button text circle>
          <el-icon>
            <svg-icon name="text-size" />
          </el-icon>
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="default">
              默认
            </el-dropdown-item>
            <el-dropdown-item command="small">
              小
            </el-dropdown-item>
            <el-dropdown-item command="large">
              大
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

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

    <el-dropdown trigger="click" @command="handleSelect">
      <div class="app-user">
        <div class="app-avatar">
          <img src="@/assets/avatar.png">
        </div>
        <div class="app-user-name">
          {{ userinfo.username }}&nbsp;&nbsp;<el-icon><i-ep-arrow-down /></el-icon>
        </div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="CommandEnum.github">
            <el-icon><svg-icon name="github" /></el-icon>
            项目源码
          </el-dropdown-item>
          <el-dropdown-item :command="CommandEnum.setting">
            <el-icon><i-ep-setting /></el-icon>
            用户设置
          </el-dropdown-item>
          <el-dropdown-item :command="CommandEnum.logout" divided>
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

enum CommandEnum {
  github = 'github',
  setting = 'setting',
  logout = 'logout',
}

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const { userinfo } = storeToRefs(userStore)
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

function toggleSize(size: AppType.DefaultSetting['size']) {
  appStore.setSize(size)
}

function handleSelect(command: string) {
  if (command === CommandEnum.logout) {
    userStore.logout()
  } else if (command === CommandEnum.setting) {
    router.push('/user/setting')
  } else if (command === CommandEnum.github) {
    window.open('https://github.com/zhangsanplus/ares-admin', '_blank', 'noopener,noreferrer')
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

  .el-dropdown {
    height: 100%;
  }

  .el-space__item:last-child {
    margin-right: 0 !important;
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
  margin-right: var(--app-margin);
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
  margin-right: 10px;
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