<template>
  <div ref="chartRef" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import { useECharts } from '../use-echarts'
import type { PieChartData } from '@/plugins/echarts'
import type { EChartsOption } from 'echarts'

interface Props {
  height?: string
  width?: string
  dataSource: PieChartData[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '360px',
})

const chartRef = ref<HTMLElement | null>(null)
const { getInstance } = useECharts(chartRef as Ref<HTMLDivElement>, setOptions)

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

  const colors = [
    'rgba(255, 137, 77, 1)',
    'rgba(22, 100, 255, 1)',
    'rgba(82, 204, 163, 1)',
    'rgba(255, 77, 77, 1)',
    'rgba(150, 99, 255, 1)',
    'rgba(255, 147, 175, 1)',
    'rgba(82, 198, 222, 1)',
  ]

  const options: EChartsOption = {
    series: {
      type: 'pie',
      data: props.dataSource,
      // 位置
      radius: ['30%', '50%'],
      center: ['50%', '60%'],
      selectedOffset: 300,
      minAngle: 10,
      avoidLabelOverlap: true,
      labelLine: {
        smooth: true,
      },
      label: {
        formatter({ name, value, percent = 0 }) {
          const p = Math.round(percent * 100) / 100 // 最多两位小数
          return `${name}：${value}（${p}%）`
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
        },
      },
    },
    legend: {
      top: '5%',
    },
    tooltip: {
      trigger: 'item',
      borderColor: '#fff',
    },
    color: colors,
    backgroundColor: 'transparent',
  }
  chartInstance.setOption(options, true)
}
</script>