/**
 * 指标卡片组件
 * 显示标签、数值和变化量
 */
import React from 'react';
import { formatPercent } from '../../utils/format';

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  /** 额外的子标签信息 */
  subLabel?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, subLabel }) => {
  // 根据涨跌决定颜色
  const changeColor = change === undefined
    ? 'text-[#a0a0b0]'
    : change > 0
      ? 'text-[#FF6B4A]'
      : change < 0
        ? 'text-[#00C853]'
        : 'text-[#a0a0b0]';

  return (
    <div className="bg-[#16213e] rounded-lg p-4 border border-[#2a2a4a]">
      <div className="text-xs text-[#a0a0b0] mb-1">{label}</div>
      <div className="text-lg font-bold text-[#e0e0e0]">{value}</div>
      {change !== undefined && (
        <div className={`text-xs mt-1 ${changeColor}`}>
          {formatPercent(change)}
        </div>
      )}
      {subLabel && (
        <div className="text-xs text-[#a0a0b0] mt-1">{subLabel}</div>
      )}
    </div>
  );
};

export default MetricCard;
