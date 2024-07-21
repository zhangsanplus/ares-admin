<template>
  <base-chart :options="options" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import BaseChart from '@/components/base-chart/index.vue'
import useAppStore from '@/store/modules/app'
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

const appStore = useAppStore()
const isDark = toRef(appStore, 'isDark')

const colors = [
  'rgba(22, 100, 255, 1)',
]

const options = computed(() => {
  const opt: EChartsOption = {
    xAxis: {
      type: 'category',
      data: props.dataSource[0]?.xAxisData ?? [],
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
  return opt
})
</script>
