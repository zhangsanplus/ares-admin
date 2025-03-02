import darkTheme from '@/assets/echarts/dark'
import lightTheme from '@/assets/echarts/light'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

echarts.registerTheme('light', lightTheme)
echarts.registerTheme('dark', darkTheme)

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
])

interface EChartsData {
  name: string
  xAxisData: Array<string | number>
  yAxisData: Array<string | number>
}

// 折线图
export type LineChartData = EChartsData
// 柱状图
export type BarChartData = EChartsData
// 饼图
export interface PieChartData {
  name: string
  value: number
}

export default echarts
