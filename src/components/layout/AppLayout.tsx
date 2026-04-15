/**
 * 应用主布局组件
 * 左右分栏结构：侧边栏 + 主内容区
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* 顶部导航 */}
      <TopNav />
      {/* 下方主体区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧边栏 */}
        <Sidebar />
        {/* 主内容区 */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#1a1a2e]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
