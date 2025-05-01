<template>
  <div v-if="isValid" class="verify-success">
    <ElIcon>
      <IEpCheck />
    </ElIcon>&nbsp;验证通过
  </div>

  <ElButton
    v-else
    type="info"
    class="w-full"
    @click="handleClick"
  >
    <template #icon>
      <IEpHelp />
    </template>
    点击按钮完成验证
  </ElButton>

  <ElDialog v-model="visible" width="460px">
    <SlideVerify
      ref="block"
      slider-text="请向右滑动滑块完成验证"
      :w="420"
      :h="220"
      :imgs="imgs"
      :show="false"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
    />
  </ElDialog>
</template>

<script setup lang="ts">
import type { SlideVerifyInstance } from 'vue3-slide-verify'
import SlideVerify from 'vue3-slide-verify'
import img1 from '@/assets/verify/1.jpg'
import img2 from '@/assets/verify/2.jpg'
import img3 from '@/assets/verify/3.jpg'
import img4 from '@/assets/verify/4.jpg'
import img5 from '@/assets/verify/5.jpg'
import img6 from '@/assets/verify/6.jpg'
import './slide-verify.scss'

const imgs = [img1, img2, img3, img4, img5, img6]
const block = ref<SlideVerifyInstance>()
const isValid = defineModel<boolean>()
const visible = ref(false)

function handleClick() {
  block.value?.refresh()
  nextTick(() => {
    visible.value = true
  })
}

function onAgain() {
  ElMessage.warning('系统检测到异常，请重试！')
  block.value?.refresh()
}

function onSuccess(times: number) {
  console.log('耗时 =>', times)
  isValid.value = true
  visible.value = false
}

function onFail() {
  ElMessage.error('验证失败，请重试！')
}

defineExpose({ visible })
</script>

<style lang="scss">
.verify-success {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 36px;
  color: var(--el-color-success);
  background-color: var(--el-color-success-light-8);
  border-radius: var(--el-border-radius-base);
}
</style>
