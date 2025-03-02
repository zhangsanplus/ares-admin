<template>
  <div class="app-nav-bar">
    <ElSpace :size="14">
      <ElButton text circle @click="appStore.toggleDark">
        <ElIcon>
          <IEpMoon v-if="appStore.isDark" />
          <IEpSunny v-else />
        </ElIcon>
      </ElButton>

      <ElDropdown trigger="click" @command="toggleSize">
        <ElButton text circle>
          <ElIcon>
            <ICustomTextSize />
          </ElIcon>
        </ElButton>

        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem command="default">
              默认
            </ElDropdownItem>
            <ElDropdownItem command="small">
              小
            </ElDropdownItem>
            <ElDropdownItem command="large">
              大
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>

      <ElButton text circle @click="toggleFullScreen">
        <ElIcon>
          <ICustomFullscreenExit v-if="isFullscreen" />
          <ICustomFullscreen v-else />
        </ElIcon>
      </ElButton>

      <ElBadge is-dot style="margin-right: 8px;">
        <ElButton text circle>
          <ElIcon><IEpBell /></ElIcon>
        </ElButton>
      </ElBadge>
    </ElSpace>

    <ElDropdown trigger="click" @command="handleSelect">
      <div class="app-user">
        <div class="app-avatar">
          <img src="@/assets/avatar.png">
        </div>
        <div class="app-user-name">
          {{ userinfo.username }}&nbsp;&nbsp;<ElIcon><IEpArrowDown /></ElIcon>
        </div>
      </div>

      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem :command="CommandEnum.github">
            <ElIcon><ICustomGithub /></ElIcon>
            项目源码
          </ElDropdownItem>
          <ElDropdownItem :command="CommandEnum.setting">
            <ElIcon><IEpSetting /></ElIcon>
            用户设置
          </ElDropdownItem>
          <ElDropdownItem :command="CommandEnum.logout" divided>
            <ElIcon><IEpSwitchButton /></ElIcon>
            退出登录
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import { useFullscreen } from '@vueuse/core'

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
