<template>
  <div ref="chartRef" />
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import useECharts from '@/composables/use-echarts'

interface Props {
  options: EChartsOption
}

const props = defineProps<Props>()

const chartRef = ref<HTMLElement>()
const { chart } = useECharts(chartRef, setOptions)

watch(
  () => props.options,
  () => setOptions(),
  { deep: true },
)

function setOptions() {
  chart.value?.setOption(props.options, true)
}

onMounted(setOptions)
</script>
