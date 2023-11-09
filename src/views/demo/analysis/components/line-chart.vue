<template>
  <div ref="chartRef" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import { useECharts } from '../use-echarts'
import type { LineChartData } from '@/plugins/echarts'
import type { EChartsOption, SeriesOption } from 'echarts'

interface Props {
  height?: string
  width?: string
  dataSource: LineChartData[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '380px',
  dataSource: () => [],
})

const chartRef = ref<HTMLElement | null>(null)
const { isDark, echarts, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>, setOptions)

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

  let xAxisData: LineChartData['xAxisData'] = []
  if (props.dataSource[0]?.xAxisData) {
    xAxisData = props.dataSource[0].xAxisData
  }

  const colors = [
    ['rgba(22, 100, 255, 1)', 'rgba(22, 100, 255, 0.15)', 'rgba(22, 100, 255, 0)'],
    ['rgba(255, 77, 77, 1)', 'rgba(255, 77, 77, 0.15)', 'rgba(255, 77, 77, 0)'],
    ['rgba(82, 204, 163, 1)', 'rgba(82, 204, 163, 0.2)', 'rgba(82, 204, 163, 0)'],
    ['rgba(255, 137, 77, 1)', 'rgba(255, 137, 77, 0.2)', 'rgba(255, 137, 77, 0)'],
    ['rgba(150, 99, 255, 1)', 'rgba(150, 99, 255, 0.2)', 'rgba(150, 99, 255, 0)'],
    ['rgba(82, 198, 222, 1)', 'rgba(82, 198, 222, 0.2)', 'rgba(82, 198, 222, 0)'],
  ]

  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: xAxisData,
      boundaryGap: false,
      // 坐标轴轴线相关设置
      axisLine: {
        lineStyle: {
          color: isDark.value ? '#3f3f3f' : '#ececec',
        },
      },
      // 坐标轴刻度标签的相关设置
      axisLabel: {
        color: '#86909C',
        lineHeight: 26,
      },
    },
    yAxis: {
      type: 'value',
      // 坐标轴轴线相关设置
      axisLine: {
        show: false,
        lineStyle: {
          color: isDark.value ? '#3f3f3f' : '#ececec',
        },
      },
      // 坐标轴刻度标签的相关设置
      axisLabel: {
        color: '#86909C',
      },
      // 坐标轴在 grid 区域中的分隔线
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: isDark.value ? '#3F3F3F' : '#E5E6EB',
        },
      },
    },
    series: props.dataSource.map((item, index) => {
      const color = colors[index]
      return {
        type: 'line',
        name: item.name,
        data: item.yAxisData,
        smooth: true,
        showSymbol: false,
        symbolSize: 12,
        lineStyle: {
          width: 1.5,
          colors: colors[index],
        },
        emphasis: {
          lineStyle: {
            width: 1.5,
          },
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color[1],
            },
            {
              offset: 1,
              color: color[1],
            },
          ]),
        },
      } as SeriesOption
    }),
    tooltip: {
      trigger: 'axis',
      confine: true,
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '15%',
      containLabel: true,
    },
    legend: {
      bottom: '10px',
      // selected: { PV: true, UV: false },
    },
    color: colors.map(i => i[0]),
    backgroundColor: 'transparent',
  }
  chartInstance.setOption(options, true)
}
</script>
