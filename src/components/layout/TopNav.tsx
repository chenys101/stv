/**
 * 顶部导航栏
 * 包含 Logo、指数快捷链接、用户头像
 */
import React from 'react';
import { Link } from 'react-router-dom';

const TopNav: React.FC = () => {
  // 模拟的指数数据
  const indices = [
    { name: '上证指数', value: '3,245.68', change: -0.44 },
    { name: '深证成指', value: '10,512.35', change: -0.62 },
    { name: '创业板指', value: '2,089.42', change: -0.85 },
  ];

  return (
    <header className="h-14 bg-[#0f3460] border-b border-[#2a2a4a] flex items-center justify-between px-4">
      {/* 左侧 Logo */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        <span className="text-xl font-bold text-[#FF6B4A]">芝士财富</span>
        <span className="text-xs text-[#a0a0b0]">Stock Analysis</span>
      </Link>

      {/* 中间指数快捷信息 */}
      <div className="hidden md:flex items-center gap-6">
        {indices.map((idx) => {
          const isUp = idx.change > 0;
          return (
            <div key={idx.name} className="flex items-center gap-2 text-xs">
              <span className="text-[#a0a0b0]">{idx.name}</span>
              <span className="text-[#e0e0e0]">{idx.value}</span>
              <span className={isUp ? 'text-[#FF6B4A]' : 'text-[#00C853]'}>
                {isUp ? '+' : ''}{idx.change.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* 右侧用户头像 */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#FF6B4A] flex items-center justify-center text-white text-sm font-bold">
          U
        </div>
      </div>
    </header>
  );
};

export default TopNav;
