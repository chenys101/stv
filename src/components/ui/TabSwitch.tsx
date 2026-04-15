/**
 * 通用 Tab 切换组件
 */
import React from 'react';

interface TabItem {
  label: string;
  value: string;
}

interface TabSwitchProps {
  tabs: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ tabs, activeValue, onChange }) => {
  return (
    <div className="flex gap-1 border-b border-[#2a2a4a]">
      {tabs.map((tab) => {
        const isActive = tab.value === activeValue;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors cursor-pointer
              ${isActive
                ? 'text-[#FF6B4A] border-b-2 border-[#FF6B4A]'
                : 'text-[#a0a0b0] hover:text-[#e0e0e0]'
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitch;
