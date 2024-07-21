export default {
  color: [
    'rgba(255, 137, 77, 1)',
    'rgba(22, 100, 255, 1)',
    'rgba(82, 204, 163, 1)',
    'rgba(255, 77, 77, 1)',
    'rgba(150, 99, 255, 1)',
    'rgba(255, 147, 175, 1)',
    'rgba(82, 198, 222, 1)',
    'rgb(247, 244, 148, 1)',
  ],

  backgroundColor: 'rgba(0,0,0,0)',

  // 全局文字样式
  textStyle: {
    color: '#bbbbbb',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
  },

  // 标题
  title: {
    textStyle: {
      color: '#464646',
    },
    subtextStyle: {
      color: '#3f3f3f',
    },
  },

  // 折线图
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 1.5,
    },
    showSymbol: false,
    symbolSize: 8,
    symbol: 'circle',
    smooth: true,
  },

  // 柱状图
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#303030',
      borderRadius: [3, 3, 0, 0],
    },
    showBackground: true,
    backgroundStyle: {
      borderRadius: [4, 4, 0, 0],
      color: '#303030',
    },
  },

  // 饼图
  pie: {
    labelLine: {
      smooth: true,
    },
    label: {
      color: '#bbbbbb',
    },
  },

  // 类目坐标轴
  categoryAxis: {
    // 坐标轴线条
    axisLine: {
      show: true,
      lineStyle: {
        color: '#3f3f3f',
      },
    },
    // 坐标轴刻度
    axisTick: {
      show: true,
      lineStyle: {
        color: '#3f3f3f',
      },
    },
    // 坐标轴文字
    axisLabel: {
      show: true,
      color: '#bbbbbb',
    },
    // 分隔线
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#3f3f3f'],
      },
    },
    // 分隔区域
    splitArea: {
      show: false,
    },
  },

  // 数值坐标轴
  valueAxis: {
    // 坐标轴线条
    axisLine: {
      show: false,
      lineStyle: {
        color: '#3f3f3f',
      },
    },
    // 坐标轴刻度
    axisTick: {
      show: false,
      lineStyle: {
        color: '#3f3f3f',
      },
    },
    // 坐标轴文字
    axisLabel: {
      show: true,
      color: '#bbbbbb',
    },
    // 分隔线
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: ['#3F3F3F'],
      },
    },
    // 分隔区域
    splitArea: {
      show: false,
    },
  },

  // 对数坐标轴
  // logAxis: {},

  // 时间坐标轴
  timeAxis: {
    // 坐标轴线
    axisLine: {
      show: true,
      lineStyle: {
        color: '#3f3f3f',
      },
    },
    // 坐标刻度
    axisTick: {
      show: true,
      lineStyle: {
        color: '#bbbbbb',
      },
    },
    // 坐标轴标签
    axisLabel: {
      show: true,
      color: '#3f3f3f',
    },
    // 分隔线
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#3f3f3f'],
      },
    },
    // 分隔区域
    splitArea: {
      show: false,
    },
  },

  // 工具箱
  toolbox: {
    iconStyle: {
      borderColor: '#999999',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666',
      },
    },
  },

  // 图例
  legend: {
    textStyle: {
      color: '#bbbbbb',
    },
  },

  // 提示框
  tooltip: {
    confine: true, // 限制在图表的区域内
    axisPointer: {
      // 提示框的指示线样式
      lineStyle: {
        color: '#3f3f3f',
        type: 'solid',
        width: 1,
      },
      // 提示框的十字准星线样式
      crossStyle: {
        color: '#3f3f3f',
        width: 1,
      },
    },
    borderWidth: 0,
  },

  // 视觉映射组件
  visualMap: {
    color: [
      'rgba(191,68,76,1)',
    ],
  },

  // 数据区域缩放
  dataZoom: {
    handleSize: 'undefined%',
    textStyle: {},
  },

  // 标记点
  markPoint: {
    label: {
      color: '#eeeeee',
    },
    emphasis: {
      label: {
        color: '#eeeeee',
      },
    },
  },
}
