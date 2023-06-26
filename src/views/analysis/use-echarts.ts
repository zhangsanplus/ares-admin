import echarts from '@/plugins/echarts'
import useAppStore from '@/store/modules/app'
import { noop } from '@/utils'

export function useECharts(chartRef: Ref<HTMLDivElement>, setOptions: Fn) {
  let chartInstance: echarts.ECharts | null = null
  let removeResizeFn = noop
  const resizeFn = useDebounceFn(resize, 200)

  const appStore = useAppStore()
  const isDark = toRef(appStore, 'isDark')
  const collapsed = toRef(appStore, 'collapsed')

  watch(
    isDark,
    () => {
      chartInstance?.dispose()
      initCharts()
    },
  )

  watch(
    collapsed,
    () => {
      setTimeout(() => {
        resizeFn()
      }, 300)
    },
  )

  function resize() {
    chartInstance?.resize()
  }

  function initCharts() {
    const el = chartRef.value
    if (!el) return
    const theme = isDark.value ? 'dark' : 'light'
    chartInstance = echarts.init(el, theme)
    removeResizeFn = useEventListener(window, 'resize', resizeFn)
    setOptions()
  }

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  onMounted(() => {
    initCharts()
  })

  onUnmounted(() => {
    removeResizeFn()
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
  })

  return {
    isDark,
    echarts,
    getInstance,
    resize,
  }
}