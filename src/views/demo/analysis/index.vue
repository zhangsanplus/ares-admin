<template>
  <div class="wrapper">
    <XCard title="实时数据">
      <template #header-right>
        <ElButton type="primary" text @click="handleClick">
          查看更多
        </ElButton>
      </template>
      <LineChart :data-source="lineData" />
    </XCard>

    <div class="card-group">
      <XCard title="每日数据">
        <template #header-right>
          <ElRadioGroup v-model="type" @change="handleChange">
            <ElRadioButton v-for="(item) in ['IP', 'PV', 'UV']" :key="item" :value="item">
              {{ item }}
            </ElRadioButton>
          </ElRadioGroup>
        </template>
        <BarChart :data-source="barData" />
      </XCard>

      <XCard title="热门城市">
        <PieChart :data-source="pieData" />
      </XCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BarChartData, LineChartData, PieChartData } from '@/plugins/echarts'
import dayjs from 'dayjs'
import BarChart from './components/bar-chart.vue'
import LineChart from './components/line-chart.vue'
import PieChart from './components/pie-chart.vue'

const type = ref<'IP' | 'PV' | 'UV'>('IP')
const lineData = ref<LineChartData[]>([])
const barData = ref<BarChartData[]>([])
const pieData = ref<PieChartData[]>([])

function handleClick() {
  ElMessage.info('开发中')
}

function handleChange() {
  barData.value = generateBarData()
}

function generateLineData(): LineChartData[] {
  return Array.from({ length: 2 }, (_, index) => {
    const xAxisData = []
    const yAxisData = []
    const hour = new Date().getHours() + 1
    const name = ['PV', 'UV']
    for (let i = 0; i < hour; i++) {
      xAxisData.push(`${i}:00`)
      yAxisData.push(Math.floor(Math.random() * 100))
    }
    return {
      name: name[index],
      xAxisData,
      yAxisData,
    }
  })
}

function generateBarData(): BarChartData[] {
  const xAxisData = []
  const yAxisData = []
  for (let i = 10; i > 0; i--) {
    const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD')
    xAxisData.push(date)
    yAxisData.push(Math.floor(Math.random() * 100))
  }
  return [
    {
      name: type.value,
      xAxisData,
      yAxisData,
    },
  ]
}

function generatePieData() {
  const categories = ['上海', '北京', '深圳', '广州', '杭州', '武汉', '江苏', '合肥']
  return categories.map((item) => {
    return {
      name: item,
      value: Math.floor(Math.random() * 100) + 1,
    }
  })
}

onMounted(() => {
  lineData.value = generateLineData()
  barData.value = generateBarData()
  pieData.value = generatePieData()
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;

  .x-card {
    overflow: hidden;
  }
}

.card-group {
  display: flex;
  gap: var(--app-margin);
  width: 100%;
  padding-top: var(--app-margin);

  .x-card {
    flex: 1;
    margin: 0;
  }
}

@media only screen and (width <=768px) {
  .card-group {
   display: block;
  }

  .x-card + .x-card {
    margin-top: var(--app-margin);
  }
}
</style>
