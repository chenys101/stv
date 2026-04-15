/**
 * 时间范围选择器组件
 */
import React from 'react';

interface RangeItem {
  label: string;
  value: string;
}

interface TimeRangeSelectorProps {
  ranges: RangeItem[];
  activeRange: string;
  onChange: (value: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  ranges,
  activeRange,
  onChange,
}) => {
  return (
    <div className="flex gap-1">
      {ranges.map((range) => {
        const isActive = range.value === activeRange;
        return (
          <button
            key={range.value}
            onClick={() => onChange(range.value)}
            className={`
              px-3 py-1 text-xs rounded transition-colors cursor-pointer
              ${isActive
                ? 'bg-[#FF6B4A] text-white'
                : 'bg-[#2a2a4a] text-[#a0a0b0] hover:bg-[#3a3a5a]'
              }
            `}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
};

export default TimeRangeSelector;
