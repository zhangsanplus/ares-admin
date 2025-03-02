<template>
  <BaseChart :options="options" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import type { PieChartData } from '@/plugins/echarts'
import type { EChartsOption } from 'echarts'
import BaseChart from '@/components/base-chart.vue'

interface Props {
  height?: string
  width?: string
  dataSource: PieChartData[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '320px',
})

const options = computed(() => {
  const opt: EChartsOption = {
    series: {
      type: 'pie',
      data: props.dataSource,
      radius: ['30%', '50%'],
      center: ['50%', '60%'],
      selectedOffset: 300,
      minAngle: 10,
      label: {
        formatter({ name, value, percent = 0 }) {
          const p = Math.round(percent * 100) / 100 // 最多两位小数
          return `${name}：${value}（${p}%）`
        },
      },
    },
    legend: {
      top: '5%',
    },
    tooltip: {
      trigger: 'item',
    },
  }
  return opt
})
</script>
