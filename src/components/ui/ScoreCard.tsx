/**
 * 评分卡片组件
 * 显示维度名称、分数(0-10)和可视化进度条
 */
import React from 'react';

interface ScoreCardProps {
  /** 评分维度名称 */
  label: string;
  /** 分数 (0-10) */
  score: number;
  /** 图标 emoji 或文字 */
  icon?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, score, icon }) => {
  // 根据分数计算颜色：高分绿色，中等橙色，低分红色
  const color = score >= 8 ? '#00C853' : score >= 6 ? '#FF6B4A' : '#FF5252';
  const percent = Math.min((score / 10) * 100, 100);

  return (
    <div className="bg-[#16213e] rounded-lg p-4 border border-[#2a2a4a] flex flex-col items-center">
      {/* 图标 */}
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      {/* 分数 */}
      <div className="text-3xl font-bold mb-1" style={{ color }}>
        {score.toFixed(1)}
      </div>
      {/* 维度名称 */}
      <div className="text-xs text-[#a0a0b0] mb-3">{label}</div>
      {/* 进度条 */}
      <div className="w-full h-2 bg-[#2a2a4a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;
