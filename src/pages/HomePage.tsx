/**
 * 首页
 * 包含市场总览和热门内容
 */
import React from 'react';
import MarketOverview from '../components/layout/MarketOverview';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-[#e0e0e0]">市场总览</h1>
        <p className="text-sm text-[#a0a0b0] mt-1">实时追踪市场动态与热门板块</p>
      </div>

      {/* 市场总览面板 */}
      <MarketOverview />

      {/* 热门股票推荐 */}
      <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
        <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">热门分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { code: '601988.SH', name: '中国银行', reason: '低估值国有大行，股息率超5%' },
            { code: '600519.SH', name: '贵州茅台', reason: '消费龙头，ROE持续优异' },
            { code: '300750.SZ', name: '宁德时代', reason: '新能源龙头，全球市占率领先' },
          ].map((stock) => (
            <div
              key={stock.code}
              className="p-3 rounded-lg bg-[#1a1a3e] border border-[#2a2a4a] hover:border-[#FF6B4A]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#e0e0e0]">{stock.name}</span>
                <span className="text-xs text-[#a0a0b0]">{stock.code}</span>
              </div>
              <p className="text-xs text-[#a0a0b0]">{stock.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
