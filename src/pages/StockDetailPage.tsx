/**
 * 个股详情页
 * 包含股票头部信息、综合评级、估值分析、财务数据、盈利能力等模块
 */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStockDetail } from '../hooks/useStockData';
import { formatPercent, formatPrice, formatMoney, formatCount } from '../utils/format';
import ScoreCard from '../components/ui/ScoreCard';
import MetricCard from '../components/ui/MetricCard';
import TabSwitch from '../components/ui/TabSwitch';
import DataTable, { type Column } from '../components/ui/DataTable';
import ChartContainer from '../components/charts/ChartContainer';
import type { FinancialRow, ProfitabilityRow, CashFlowRow } from '../api/types';

const StockDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const stockCode = code || '601988.SH';
  const data = useStockDetail(stockCode);

  // 各模块的 Tab 状态
  const [valuationTab, setValuationTab] = useState('pe');
  const [financialTab, setFinancialTab] = useState('revenue');
  const [profitTab, setProfitTab] = useState('roe');

  // 加载中状态
  if (data.info.loading) {
    return <div className="text-[#a0a0b0] text-center py-16">加载中...</div>;
  }
  if (!data.info.data) {
    return <div className="text-red-400 text-center py-16">数据加载失败</div>;
  }

  const info = data.info.data;
  const score = data.score.data;
  const isUp = info.change >= 0;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* ====== 股票头部信息区 ====== */}
      <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-[#e0e0e0]">{info.name}</h1>
              <span className="text-sm text-[#a0a0b0]">{info.code}</span>
              {info.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs bg-[#FF6B4A]/20 text-[#FF6B4A] rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold" style={{ color: isUp ? '#FF6B4A' : '#00C853' }}>
                {formatPrice(info.price)}
              </span>
              <span className="text-sm" style={{ color: isUp ? '#FF6B4A' : '#00C853' }}>
                {isUp ? '+' : ''}{formatPrice(info.change)} ({formatPercent(info.changePercent)})
              </span>
            </div>
          </div>
          {/* 右侧关键指标 */}
          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-[#a0a0b0]">市值</div>
              <div className="text-[#e0e0e0] font-medium">{info.marketCap}</div>
            </div>
            <div>
              <div className="text-[#a0a0b0]">PE(TTM)</div>
              <div className="text-[#e0e0e0] font-medium">{info.peTTM}</div>
            </div>
            <div>
              <div className="text-[#a0a0b0]">PB</div>
              <div className="text-[#e0e0e0] font-medium">{info.pb}</div>
            </div>
            <div>
              <div className="text-[#a0a0b0]">换手率</div>
              <div className="text-[#e0e0e0] font-medium">{info.turnoverRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== 综合评级（三维评分卡片） ====== */}
      {score && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreCard label="公司质地" score={score.quality} icon="🏢" />
          <ScoreCard label="估值安全" score={score.valuation} icon="🛡️" />
          <ScoreCard label="股价趋势" score={score.trend} icon="📈" />
        </div>
      )}

      {/* ====== 估值分析模块 ====== */}
      <ValuationSection
        data={data.valuation.data}
        activeTab={valuationTab}
        onTabChange={setValuationTab}
      />

      {/* ====== 财务数据模块 ====== */}
      <FinancialSection
        revenue={data.revenue.data}
        netProfit={data.netProfit.data}
        activeTab={financialTab}
        onTabChange={setFinancialTab}
      />

      {/* ====== 盈利能力模块 ====== */}
      <ProfitabilitySection
        roe={data.roe.data}
        netProfitMargin={data.netProfitMargin.data}
        activeTab={profitTab}
        onTabChange={setProfitTab}
      />

      {/* ====== 现金流分析模块 ====== */}
      <CashFlowSection data={data.cashFlow.data} />

      {/* ====== RPS 股价强度模块 ====== */}
      <RPSSection data={data.rps.data} />

      {/* ====== 股东分析模块 ====== */}
      <ShareholderSection data={data.shareholder.data} />

      {/* ====== 机构持仓模块 ====== */}
      <InstitutionSection data={data.institution.data} />
    </div>
  );
};

/* ==================== 子模块组件 ==================== */

/** 估值分析子模块 */
const ValuationSection: React.FC<{
  data: { date: string; pe: number; pb: number; ps: number; compositePercent: number }[] | null;
  activeTab: string;
  onTabChange: (v: string) => void;
}> = ({ data, activeTab, onTabChange }) => {
  if (!data) return null;
  const tabs = [
    { label: 'PE', value: 'pe' },
    { label: 'PB', value: 'pb' },
    { label: 'PS', value: 'ps' },
    { label: '综合百分位', value: 'composite' },
  ];

  // 根据当前 Tab 生成图表配置
  const fieldMap: Record<string, string> = { pe: 'pe', pb: 'pb', ps: 'ps', composite: 'compositePercent' };
  const fieldName = fieldMap[activeTab] || 'pe';
  const chartOption = {
    xAxis: { type: 'category' as const, data: data.map((d) => d.date) },
    yAxis: { type: 'value' as const, splitLine: { lineStyle: { color: '#2a2a4a' } } },
    series: [{
      type: 'line' as const,
      data: data.map((d) => d[fieldName as keyof typeof d]),
      smooth: true,
      lineStyle: { color: '#FF6B4A' },
      areaStyle: { color: 'rgba(255,107,74,0.15)' },
      itemStyle: { color: '#FF6B4A' },
    }],
    tooltip: { trigger: 'axis' as const },
  };

  return (
    <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">估值分析</h3>
      <TabSwitch tabs={tabs} activeValue={activeTab} onChange={onTabChange} />
      <div className="mt-4">
        <ChartContainer option={chartOption} height="280px" />
      </div>
    </div>
  );
};

/** 财务数据子模块（营收/利润） */
const FinancialSection: React.FC<{
  revenue: FinancialRow[] | null;
  netProfit: FinancialRow[] | null;
  activeTab: string;
  onTabChange: (v: string) => void;
}> = ({ revenue, netProfit, activeTab, onTabChange }) => {
  const tabs = [
    { label: '营收', value: 'revenue' },
    { label: '归母净利润', value: 'netProfit' },
  ];
  const currentData = activeTab === 'revenue' ? revenue : netProfit;
  if (!currentData) return null;

  // 表格列定义
  const columns: Column<FinancialRow>[] = [
    { key: 'year', title: '年份', width: '80px' },
    {
      key: 'value',
      title: activeTab === 'revenue' ? '营收(亿)' : '净利润(亿)',
      render: (row) => `${formatMoney(row.value)}`,
    },
    {
      key: 'industryValue',
      title: '行业平均(亿)',
      render: (row) => `${formatMoney(row.industryValue)}`,
    },
  ];

  // 图表配置
  const chartOption = {
    xAxis: { type: 'category' as const, data: currentData.map((d) => d.year) },
    yAxis: { type: 'value' as const, splitLine: { lineStyle: { color: '#2a2a4a' } } },
    legend: { data: [activeTab === 'revenue' ? '营收' : '净利润', '行业平均'], top: 0 },
    series: [
      {
        name: activeTab === 'revenue' ? '营收' : '净利润',
        type: 'bar' as const,
        data: currentData.map((d) => d.value),
        itemStyle: { color: '#FF6B4A' },
      },
      {
        name: '行业平均',
        type: 'bar' as const,
        data: currentData.map((d) => d.industryValue),
        itemStyle: { color: '#4a6fa5' },
      },
    ],
    tooltip: { trigger: 'axis' as const },
  };

  return (
    <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">财务数据</h3>
      <TabSwitch tabs={tabs} activeValue={activeTab} onChange={onTabChange} />
      <div className="mt-4">
        <ChartContainer option={chartOption} height="260px" />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={currentData} rowKey="year" />
      </div>
    </div>
  );
};

/** 盈利能力子模块（ROE/净利率） */
const ProfitabilitySection: React.FC<{
  roe: ProfitabilityRow[] | null;
  netProfitMargin: ProfitabilityRow[] | null;
  activeTab: string;
  onTabChange: (v: string) => void;
}> = ({ roe, netProfitMargin, activeTab, onTabChange }) => {
  const tabs = [
    { label: 'ROE', value: 'roe' },
    { label: '净利率', value: 'netProfitMargin' },
  ];
  const currentData = activeTab === 'roe' ? roe : netProfitMargin;
  if (!currentData) return null;

  const label1 = activeTab === 'roe' ? 'ROE(%)' : '净利率(%)';
  const label2 = activeTab === 'roe' ? '行业ROE(%)' : '行业净利率(%)';
  const field1 = activeTab === 'roe' ? 'roe' : 'roe';
  const field2 = activeTab === 'roe' ? 'industryRoe' : 'industryRoe';

  const columns: Column<ProfitabilityRow>[] = [
    { key: 'year', title: '年份', width: '80px' },
    { key: field1, title: label1, render: (row) => `${row[field1].toFixed(2)}%` },
    { key: field2, title: label2, render: (row) => `${row[field2].toFixed(2)}%` },
  ];

  const chartOption = {
    xAxis: { type: 'category' as const, data: currentData.map((d) => d.year) },
    yAxis: { type: 'value' as const, splitLine: { lineStyle: { color: '#2a2a4a' } } },
    legend: { data: [label1, label2], top: 0 },
    series: [
      {
        name: label1,
        type: 'line' as const,
        data: currentData.map((d) => d[field1]),
        smooth: true,
        lineStyle: { color: '#FF6B4A' },
        itemStyle: { color: '#FF6B4A' },
      },
      {
        name: label2,
        type: 'line' as const,
        data: currentData.map((d) => d[field2]),
        smooth: true,
        lineStyle: { color: '#4a6fa5' },
        itemStyle: { color: '#4a6fa5' },
      },
    ],
    tooltip: { trigger: 'axis' as const },
  };

  return (
    <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">盈利能力</h3>
      <TabSwitch tabs={tabs} activeValue={activeTab} onChange={onTabChange} />
      <div className="mt-4">
        <ChartContainer option={chartOption} height="260px" />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={currentData} rowKey="year" />
      </div>
    </div>
  );
};

/** 现金流分析子模块 */
const CashFlowSection: React.FC<{ data: CashFlowRow[] | null }> = ({ data }) => {
  if (!data) return null;

  const columns: Column<CashFlowRow>[] = [
    { key: 'year', title: '年份', width: '80px' },
    { key: 'operating', title: '经营现金流(亿)', render: (row) => `${row.operating.toFixed(0)}` },
    { key: 'investing', title: '投资现金流(亿)', render: (row) => `${row.investing.toFixed(0)}` },
    { key: 'financing', title: '筹资现金流(亿)', render: (row) => `${row.financing.toFixed(0)}` },
  ];

  const chartOption = {
    xAxis: { type: 'category' as const, data: data.map((d) => d.year) },
    yAxis: { type: 'value' as const, splitLine: { lineStyle: { color: '#2a2a4a' } } },
    legend: { data: ['经营', '投资', '筹资'], top: 0 },
    series: [
      { name: '经营', type: 'bar' as const, data: data.map((d) => d.operating), itemStyle: { color: '#FF6B4A' } },
      { name: '投资', type: 'bar' as const, data: data.map((d) => d.investing), itemStyle: { color: '#4a6fa5' } },
      { name: '筹资', type: 'bar' as const, data: data.map((d) => d.financing), itemStyle: { color: '#00C853' } },
    ],
    tooltip: { trigger: 'axis' as const },
  };

  return (
    <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">现金流分析</h3>
      <div className="mt-2">
        <ChartContainer option={chartOption} height="260px" />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={data} rowKey="year" />
      </div>
    </div>
  );
};

/** RPS 股价强度子模块 */
const RPSSection: React.FC<{ data: { period: string; value: number }[] | null }> = ({ data }) => {
  if (!data) return null;

  const chartOption = {
    xAxis: { type: 'category' as const, data: data.map((d) => d.period) },
    yAxis: {
      type: 'value' as const,
      max: 100,
      splitLine: { lineStyle: { color: '#2a2a4a' } },
    },
    series: [{
      type: 'bar' as const,
      data: data.map((d) => d.value),
      itemStyle: {
        color: (params: { value: number }) =>
          params.value >= 80 ? '#FF6B4A' : params.value >= 50 ? '#FFB74D' : '#4a6fa5',
      },
      label: { show: true, position: 'top', color: '#a0a0b0', formatter: '{c}%' },
    }],
    tooltip: { trigger: 'axis' as const },
  };

  return (
    <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">RPS 股价强度</h3>
      <p className="text-xs text-[#a0a0b0] mb-3">
        RPS（Relative Price Strength）衡量股价在全部股票中的相对强度，80以上为强势
      </p>
      <ChartContainer option={chartOption} height="240px" />
    </div>
  );
};

/** 股东分析子模块 */
const ShareholderSection: React.FC<{ data: { date: string; totalCount: number; perBillionCap: number } | null }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">股东分析</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard label="股东户数" value={formatCount(data.totalCount)} subLabel={`截至 ${data.date}`} />
        <MetricCard label="每亿市值户数" value={`${data.perBillionCap.toFixed(1)}`} subLabel="户/亿市值" />
      </div>
    </div>
  );
};

/** 机构持仓子模块 */
const InstitutionSection: React.FC<{
  data: { date: string; northbound: number; mutualFund: number; insurance: number; qfii: number; broker: number; socialSecurity: number } | null;
}> = ({ data }) => {
  if (!data) return null;

  // 机构持仓列表
  const holdings = [
    { label: '北向资金', value: data.northbound },
    { label: '公募基金', value: data.mutualFund },
    { label: '保险资金', value: data.insurance },
    { label: 'QFII', value: data.qfii },
    { label: '券商', value: data.broker },
    { label: '社保基金', value: data.socialSecurity },
  ];

  const chartOption = {
    xAxis: { type: 'category' as const, data: holdings.map((h) => h.label) },
    yAxis: { type: 'value' as const, splitLine: { lineStyle: { color: '#2a2a4a' } } },
    series: [{
      type: 'bar' as const,
      data: holdings.map((h) => h.value),
      itemStyle: { color: '#FF6B4A' },
      label: { show: true, position: 'top', color: '#a0a0b0', formatter: '{c}%' },
    }],
    tooltip: { trigger: 'axis' as const },
  };

  return (
    <div className="bg-[#16213e] rounded-lg border border-[#2a2a4a] p-4">
      <h3 className="text-sm font-medium text-[#e0e0e0] mb-3">机构持仓</h3>
      <p className="text-xs text-[#a0a0b0] mb-3">截至 {data.date}</p>
      <ChartContainer option={chartOption} height="240px" />
    </div>
  );
};

export default StockDetailPage;
