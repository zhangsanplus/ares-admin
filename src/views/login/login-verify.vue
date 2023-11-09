<template>
  <div v-if="modelValue" class="verify-success">
    <el-icon><i-ep-check /></el-icon>&nbsp;验证通过
  </div>

  <el-button v-else type="info" long @click="handleClick">
    <template #icon>
      <i-ep-help />
    </template>
    点击按钮完成验证
  </el-button>

  <el-dialog v-model="visible" width="460px">
    <slide-verify
      ref="block"
      slider-text="请向右滑动滑块完成验证"
      :w="420"
      :h="220"
      :imgs="imgs"
      :show="false"
      class="slide-verify-custom"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import SlideVerify from 'vue3-slide-verify'
import img1 from '@/assets/verify/1.jpg'
import img2 from '@/assets/verify/2.jpg'
import img3 from '@/assets/verify/3.jpg'
import img4 from '@/assets/verify/4.jpg'
import img5 from '@/assets/verify/5.jpg'
import img6 from '@/assets/verify/6.jpg'
import type { SlideVerifyInstance } from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<(e: 'update:modelValue', val: boolean) => void>()

const imgs = [img1, img2, img3, img4, img5, img6]
const block = ref<SlideVerifyInstance>()
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
  emit('update:modelValue', true)
  visible.value = false
}

function onFail() {
  ElMessage.error('验证失败，请重试！')
}

defineExpose({ visible })
</script>

<style lang="scss">
.slide-verify-custom {
  .slide-verify-slider {
    color: var(--el-text-color-regular);
    background: var(--el-fill-color-light);
    border: 1px solid var(--el-border-color);
  }

  .slide-verify-slider-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .slide-verify-slider-mask {
    position: static;
    height: 38px;
  }

  .slide-verify-slider-mask-item {
    top: 0 !important;
    height: 38px;
    background: var(--el-fill-color);

    .iconfont {
      color: var(--el-text-color-secondary);
      font-size: 28px;
    }

    &:hover .iconfont {
      color: var(--el-color-white);
    }
  }
}

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
