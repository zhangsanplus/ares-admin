import { tryOnScopeDispose, useDebounceFn, useEventListener } from '@vueuse/core'
import echarts from '@/plugins/echarts'
import useAppStore from '@/store/modules/app'

export default function useECharts(chartRef: Ref<HTMLElement | undefined>, onReady: () => void) {
  const chart = shallowRef<echarts.ECharts | null>(null)
  const appStore = useAppStore()
  const theme = computed(() => (appStore.isDark ? 'dark' : 'light'))
  const collapsed = toRef(appStore, 'collapsed')

  const resizeFn = useDebounceFn(resizeChart, 200)

  watch(
    chartRef,
    () => refreshChart(),
    {
      immediate: true,
      flush: 'post',
    },
  )

  watch(
    theme,
    () => refreshChart(),
  )

  watch(
    collapsed,
    () => {
      // 等左侧菜单动画结束
      setTimeout(resizeFn, 300)
    },
  )

  function initChart() {
    const el = chartRef.value
    if (el && !chart.value) {
      chart.value = echarts.init(el, theme.value)
      onReady?.()
    }
  }

  function refreshChart() {
    if (chart.value) {
      chart.value.dispose()
      chart.value = null
    }
    initChart()
  }

  function resizeChart() {
    chart.value?.resize()
  }

  useEventListener('resize', resizeFn)

  onActivated(refreshChart)

  tryOnScopeDispose(() => {
    if (chart.value) {
      chart.value.dispose()
      chart.value = null
    }
  })

  return {
    echarts,
    chart,
    refreshChart,
    initChart,
  }
}
