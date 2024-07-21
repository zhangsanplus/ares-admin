<template>
  <base-chart :options="options" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import BaseChart from '@/components/base-chart/index.vue'
import type { BarChartData } from '@/plugins/echarts'
import type { EChartsOption, SeriesOption } from 'echarts'

interface Props {
  height?: string
  width?: string
  dataSource: BarChartData[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '320px',
})

const colors = [
  'rgba(22, 100, 255, 1)',
]

const options = computed(() => {
  const opt: EChartsOption = {
    color: colors,
    series: props.dataSource.map((item) => {
      return {
        type: 'bar',
        name: item.name,
        data: item.yAxisData,
        barMinWidth: 20,
        barMaxWidth: 30,
      } as SeriesOption
    }),
    xAxis: {
      type: 'category',
      data: props.dataSource[0]?.xAxisData ?? [],
      axisLabel: {
        lineHeight: 26,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
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
  }
  return opt
})
</script>
