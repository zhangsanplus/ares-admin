<template>
  <div ref="chartRef" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import { useECharts } from '../use-echarts'
import type { BarChartData } from '@/plugins/echarts'
import type { EChartsOption, SeriesOption } from 'echarts'

interface Props {
  height?: string
  width?: string
  dataSource: BarChartData[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '360px',
  dataSource: () => [],
})

const chartRef = ref<HTMLElement | null>(null)
const { isDark, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>, setOptions)

watch(
  () => props.dataSource,
  () => setOptions(),
  {
    deep: true,
  },
)

function setOptions() {
  const chartInstance = getInstance()
  if (!chartInstance) return

  let xAxisData: BarChartData['xAxisData'] = []
  if (props.dataSource[0]?.xAxisData) {
    xAxisData = props.dataSource[0].xAxisData
  }
  const colors = [
    'rgba(22, 100, 255, 1)',
  ]
  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: isDark.value ? '#3f3f3f' : '#ececec',
        },
      },
      axisLabel: {
        color: '#86909C',
        lineHeight: 26,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#86909C',
      },
      splitLine: {
        show: false,
      },
    },
    series: props.dataSource.map((item, index) => {
      return {
        type: 'bar',
        name: item.name,
        data: item.yAxisData,
        showBackground: true,
        backgroundStyle: {
          borderRadius: [4, 4, 0, 0],
          color: isDark.value ? '#303030' : 'rgba(235, 238, 245, 0.8)',
        },
        itemStyle: {
          borderRadius: [3, 3, 0, 0],
          color: colors[index],
        },
        barMinWidth: 20,
        barMaxWidth: 30,
      } as SeriesOption
    }),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
    },
    grid: {
      left: '30px',
      right: '30px',
      top: '10%',
      bottom: '5%',
      containLabel: true,
    },
    color: colors.map(i => i[0]),
    backgroundColor: 'transparent',
  }
  chartInstance.setOption(options, true)
}
</script>
