/**
 * ECharts 图表容器组件
 * 封装 echarts-for-react，提供统一的深色主题配置
 */
import React from 'react';
import ReactEChartsCorePkg from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';

// 处理 Vite 导入 CommonJS 时的 default 导出问题
const ReactEChartsCore = (ReactEChartsCorePkg as any).default || ReactEChartsCorePkg;

import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册 ECharts 组件
echarts.use([
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  CanvasRenderer,
]);

/** 深色主题通用配置 */
const darkTheme = {
  backgroundColor: 'transparent',
  textStyle: { color: '#a0a0b0' },
  legend: { textStyle: { color: '#a0a0b0' } },
  tooltip: {
    backgroundColor: '#16213e',
    borderColor: '#2a2a4a',
    textStyle: { color: '#e0e0e0' },
  },
};

interface ChartContainerProps {
  /** ECharts 配置项 */
  option: Record<string, unknown>;
  /** 图表高度 */
  height?: string;
  /** 是否自动响应容器大小 */
  autoResize?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  option,
  height = '300px',
  autoResize = true,
}) => {
  // 合并深色主题配置
  const mergedOption = {
    ...darkTheme,
    ...option,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
      ...((option.grid as Record<string, unknown>) || {}),
    },
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={mergedOption}
      style={{ height, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
      autoResize={autoResize}
    />
  );
};

export default ChartContainer;
