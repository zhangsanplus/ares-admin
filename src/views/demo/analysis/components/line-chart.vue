<template>
  <base-chart :options="options" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import BaseChart from '@/components/base-chart/index.vue'
import echarts from '@/plugins/echarts'
import useAppStore from '@/store/modules/app'
import type { LineChartData } from '@/plugins/echarts'
import type { EChartsOption, SeriesOption } from 'echarts'

interface Props {
  height?: string
  width?: string
  dataSource: LineChartData[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '320px',
})

const colors = [
  'rgba(22, 100, 255, 1)',
  'rgba(255, 77, 77, 1)',
]

const areaColors = [
  ['rgba(22, 100, 255, 0.15)', 'rgba(22, 100, 255, 0.15)'],
  ['rgba(255, 77, 77, 0.15)', 'rgba(255, 77, 77, 0.15)'],
]

const options = computed(() => {
  const opt: EChartsOption = {
    color: colors,
    series: props.dataSource.map((item, index) => {
      const color = areaColors[index]
      return {
        type: 'line',
        name: item.name,
        data: item.yAxisData,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color[0],
            },
            {
              offset: 1,
              color: color[1],
            },
          ]),
        },
      } as SeriesOption
    }),
    xAxis: {
      type: 'category',
      data: props.dataSource[0]?.xAxisData ?? [],
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
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
    },
  }
  return opt
})
</script>
