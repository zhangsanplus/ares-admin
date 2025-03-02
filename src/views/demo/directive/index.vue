<template>
  <XCard title="v-auth 按钮权限指令">
    当前用户权限：{{ userinfo.authList }}
    <p>
      <ElButton v-auth="AuthEnum.ADD" type="primary">
        新增
      </ElButton>
      <ElButton v-auth="AuthEnum.DELETE" type="danger">
        删除
      </ElButton>
      <ElButton v-auth="AuthEnum.DETAILS" type="info">
        查看
      </ElButton>
    </p>
  </XCard>

  <XCard title="v-copy 复制指令">
    <ElButton v-copy="'我是点击左键复制的内容'" type="primary">
      左键点击复制
    </ElButton>

    <ElButton v-copy.contextmenu.prevent="'我是点击右键复制的内容'" type="primary" plain>
      右键点击复制
    </ElButton>
  </XCard>

  <XCard title="v-debounce 防抖指令">
    <div class="box">
      <ElButton type="info" @click="handleClick">
        普通点击事件
      </ElButton>

      <ElButton v-debounce="handleDebounceClick" type="success">
        点击结束1秒后执行
      </ElButton>

      <ElInput
        v-model="input1"
        v-debounce.input="handleDebounceInput"
        placeholder="输入结束1秒后执行"
        style="width: 200px;"
      />

      <div v-debounce.scroll="handleDebounceScroll" class="scroll-box">
        <div class="scroll-box-content">
          滚动结束1秒后执行
        </div>
      </div>
    </div>
  </XCard>

  <XCard title="v-throttle 节流指令">
    <div class="box">
      <ElButton type="info" @click="handleClick">
        普通点击事件
      </ElButton>

      <ElButton v-throttle="handleThrottleClick" type="warning">
        连续点击，每隔1秒执行
      </ElButton>

      <ElInput
        v-model="input2"
        v-throttle:3000.input="handleThrottleInput"
        placeholder="连续输入，每隔3秒执行"
        style="width: 200px;"
      />

      <div v-throttle:3000.scroll="handleThrottleScroll" class="scroll-box">
        <div class="scroll-box-content">
          连续滚动，每隔3秒执行
        </div>
      </div>
    </div>
  </XCard>

  <XCard title="v-input-trim 指令">
    <p style="color: #888;">
      失焦后自动移除两端空格，并触发一次input事件
    </p>
    <p>当前输入长度为: {{ value.length }}</p>
    <ElInput
      v-model="value"
      v-input-trim
      placeholder="输入一些文字和空格试试吧~"
      style="width: 260px;"
      @input="onInput"
    />
  </XCard>
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
const input1 = ref('')
const input2 = ref('')

function handleClick() {
  ElMessage.info('我是普通的点击事件')
}

function handleDebounceClick() {
  ElMessage.success('我是防抖按钮的点击事件')
}

function handleThrottleClick() {
  ElMessage.warning('我是节流按钮的点击事件')
}

function handleDebounceScroll() {
  ElMessage.success('我是防抖滚动事件')
}

function handleThrottleScroll() {
  ElMessage.success('我是节流滚动事件')
}

function handleDebounceInput() {
  ElMessage.success('我是防抖输入框的输入事件')
}

function handleThrottleInput() {
  ElMessage.success('我是节流输入框的输入事件')
}

function onInput(val: string) {
  console.log('input trim =>', {
    text: val,
    length: val.length,
  })
}
</script>

<style scoped>
.box {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  border-radius: 4px;
}

.scroll-box {
  width: 200px;
  height: 100px;
  overflow: auto;
  background: var(--el-fill-color);
}

.scroll-box .scroll-box-content {
  width: 100%;
  height: 1000px;
  padding: 20px;
  text-align: center;
}
</style>
