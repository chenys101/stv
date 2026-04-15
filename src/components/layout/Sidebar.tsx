/**
 * 左侧边栏导航
 * 包含首页、股票、ETF、基金、自选等入口
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/** 导航菜单项 */
interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: '首页', path: '/', icon: '🏠' },
  { label: '股票', path: '/stock/601988.SH', icon: '📈' },
  { label: 'ETF', path: '/', icon: '📊' },
  { label: '基金', path: '/', icon: '💰' },
  { label: '自选', path: '/', icon: '⭐' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-16 lg:w-48 bg-[#0f3460] border-r border-[#2a2a4a] flex flex-col py-4">
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path + item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors no-underline ${
                isActive
                  ? 'bg-[#FF6B4A]/20 text-[#FF6B4A]'
                  : 'text-[#a0a0b0] hover:bg-[#2a2a4a] hover:text-[#e0e0e0]'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {/* 大屏时显示文字标签 */}
            <span className="hidden lg:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
