import type { Ref } from 'vue'
import { tryOnScopeDispose } from '@vueuse/core'
import { ElLoading } from 'element-plus'
import { ref, watch } from 'vue'

type LoadingOptions = Parameters<typeof ElLoading.service>[0]
type LoadingInstance = ReturnType<typeof ElLoading.service>

const defaultOption: LoadingOptions = {
  lock: true,
  background: 'rgba(255, 255, 255, 0.4)',
}

/**
 * 创建全屏 Loading 服务
 *
 * @see ElementPlus 文档 https://element-plus.org/zh-CN/component/loading
 *
 * @param {object} [options] - 配置选项（可选）
 * @param {MaybeRef<string>} [options.text] - 加载提示文本
 * @param {boolean} [options.lock] - 是否锁定屏幕滚动
 * @param {string} [options.background] - 遮罩层背景色
 */

export default function useFullscreenLoading(
  options: Partial<LoadingOptions> = {},
): Ref<boolean> {
  const fullscreenLoading = ref(false)
  let loadingInstance: LoadingInstance | null = null

  const cleanup = () => {
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }

  watch(fullscreenLoading, (newValue) => {
    cleanup()
    if (newValue) {
      loadingInstance = ElLoading.service({
        ...defaultOption,
        ...options,
      })
    }
  })

  tryOnScopeDispose(() => {
    cleanup()
    fullscreenLoading.value = false
  })

  return fullscreenLoading
}
