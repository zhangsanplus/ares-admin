<template>
  <x-card title="v-auth 按钮权限指令">
    <div>
      当前用户权限：{{ userinfo.authList }}
      <p>
        <el-button v-auth="AuthEnum.ADD" type="primary">
          新增
        </el-button>
        <el-button v-auth="AuthEnum.DELETE" type="danger">
          删除
        </el-button>
        <el-button v-auth="AuthEnum.DETAILS" type="info">
          查看
        </el-button>
      </p>
    </div>
  </x-card>

  <x-card title="v-copy 复制指令">
    <el-button v-copy="'我是点击左键复制的内容'" type="primary">
      左键点击复制
    </el-button>

    <el-button v-copy.contextmenu.prevent="'我是点击右键复制的内容'" type="primary" plain>
      右键点击复制
    </el-button>
  </x-card>

  <x-card title="v-debounce 防抖指令">
    <el-button v-debounce="handleDebounceClick" type="success">
      点击结束 0.5秒后执行
    </el-button>

    <el-button type="info" @click="handleClick">
      普通点击事件
    </el-button>
  </x-card>

  <x-card title="v-throttle 节流指令">
    <el-button v-throttle="handleThrottleClick" type="warning">
      连续点击 每隔1秒执行
    </el-button>

    <el-button type="info" @click="handleClick">
      普通点击事件
    </el-button>
  </x-card>

  <x-card title="v-input-trim 指令">
    <p style="color: #888;">
      失焦后自动移除两端空格，并触发一次input事件
    </p>
    <p>当前输入长度为: {{ value.length }}</p>
    <el-input v-model="value" v-input-trim placeholder="输入一些文字和空格试试吧~" style="width: 260px;" @input="onInput" />
  </x-card>
</template>

<script setup lang="ts">
// v-copy 全局注册
// v-throttle 手动引入方式
import vDebounce from '@/directives/debounce'
import vThrottle from '@/directives/throttle'
import { AuthEnum } from '@/enums/auth'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const { userinfo } = storeToRefs(userStore)

const value = ref('')

function handleDebounceClick() {
  ElMessage.success('我是防抖按钮的点击事件')
}

function handleThrottleClick() {
  ElMessage.warning('我是节流按钮的点击事件')
}

function handleClick() {
  ElMessage.info('我是普通的点击事件')
}

function onInput(val: string) {
  console.log('input trim =>', {
    text: val,
    length: val.length,
  })
}
</script>
