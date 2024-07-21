import echarts from '@/plugins/echarts'
import useAppStore from '@/store/modules/app'

export default function useECharts(chartRef: Ref<HTMLElement>, setOptions: Fn) {
  const chart = shallowRef<echarts.ECharts | null>(null)
  const appStore = useAppStore()
  const theme = computed(() => (appStore.isDark ? 'dark' : 'light'))
  const collapsed = toRef(appStore, 'collapsed')

  const resizeFn = useDebounceFn(resizeChart, 200)

  watch(collapsed, () => {
    setTimeout(resizeFn, 300) // 等左侧菜单动画结束
  })

  watch(theme, refreshChart)

  function initChart() {
    const el = chartRef.value
    if (el) {
      chart.value = echarts.init(el, theme.value)
      setOptions()
    }
  }

  function refreshChart() {
    chart.value?.dispose()
    initChart()
  }

  function resizeChart() {
    chart.value?.resize()
  }

  onActivated(refreshChart)

  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeFn)
  })

  onUnmounted(() => {
    if (chart.value) {
      chart.value.dispose()
      chart.value = null
    }
    window.removeEventListener('resize', resizeFn)
  })

  return {
    echarts,
    chart,
  }
}
