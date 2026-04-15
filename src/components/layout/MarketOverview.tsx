/**
 * 市场总览面板
 * 包含市场概况、热门板块、投资者情绪等模块
 */
import React, { useState } from 'react';
import MetricCard from '../ui/MetricCard';
import TabSwitch from '../ui/TabSwitch';
import { useMarketData } from '../../hooks/useStockData';
import { formatPercent } from '../../utils/format';

/** 板块分类 Tab */
const sectorTabs = [
  { label: '按行业', value: 'industry' },
  { label: '按概念', value: 'concept' },
  { label: '按风格', value: 'style' },
];

const MarketOverview: React.FC = () => {
  const { overview, sectors } = useMarketData();
  const [activeTab, setActiveTab] = useState('industry');

  // 加载中状态
  if (overview.loading) {
    return <div className="text-[#a0a0b0] text-center py-8">加载中...</div>;
  }

  const data = overview.data;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* 市场概况指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="全市场涨跌幅"
          value={formatPercent(data.changePercent)}
          change={data.changePercent}
        />
        <MetricCard
          label="全市场成交额"
          value={data.turnover}
          subLabel="沪深两市合计"
        />
        <MetricCard
          label="综合估值"
          value={data.valuationLevel}
          subLabel={`历史百分位 ${data.valuationPercent}%`}
        />
      </div>

      {/* 热门板块 */}
      <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
        <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">热门板块</h3>
        <TabSwitch tabs={sectorTabs} activeValue={activeTab} onChange={setActiveTab} />

        <div className="mt-3 space-y-2">
          {sectors.loading && <div className="text-[#a0a0b0] text-sm">加载板块数据...</div>}
          {sectors.data?.map((sector) => {
            const isUp = sector.changePercent > 0;
            return (
              <div
                key={sector.code}
                className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#1a1a3e] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#e0e0e0]">{sector.name}</span>
                  <span className="text-xs text-[#a0a0b0]">
                    {sector.topStockName}
                  </span>
                </div>
                <span className={`text-sm font-medium ${isUp ? 'text-[#FF6B4A]' : 'text-[#00C853]'}`}>
                  {isUp ? '+' : ''}{sector.changePercent.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 投资者情绪与全市场估值 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
          <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">投资者情绪</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#a0a0b0]">恐贪指数</span>
              <span className="text-[#FF6B4A]">68</span>
            </div>
            <div className="w-full h-2 bg-[#2a2a4a] rounded-full">
              <div className="h-full bg-gradient-to-r from-[#00C853] to-[#FF6B4A] rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-xs text-[#a0a0b0]">市场情绪偏贪婪</p>
          </div>
        </div>

        <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
          <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">南北向资金</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#a0a0b0]">北向资金</span>
              <span className="text-[#FF6B4A]">+52.3亿</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#a0a0b0]">南向资金</span>
              <span className="text-[#00C853]">-18.7亿</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
