/**
 * 建设中占位页面
 */
import React from 'react';
import { useLocation } from 'react-router-dom';

const routeNames: Record<string, string> = {
  '/etf': 'ETF 分析',
  '/fund': '基金分析',
  '/watchlist': '我的自选',
};

const ComingSoonPage: React.FC = () => {
  const location = useLocation();
  const pageName = routeNames[location.pathname] || '该功能';

  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
      <div className="text-6xl mb-6">🚧</div>
      <h2 className="text-2xl font-bold text-[#e0e0e0] mb-2">{pageName} 正在建设中</h2>
      <p className="text-[#a0a0b0]">程序员小哥哥正在加班加点开发，敬请期待！</p>
    </div>
  );
};

export default ComingSoonPage;