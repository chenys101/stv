/**
 * 数据表格组件
 * 支持双行对比（本股票 vs 行业平均），斑马纹样式
 */
import React from 'react';

/** 表格列定义 */
export interface Column<T = Record<string, unknown>> {
  key: string;
  title: string;
  /** 自定义渲染函数 */
  render?: (row: T, index: number) => React.ReactNode;
  /** 宽度 */
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** 行唯一标识 key */
  rowKey: string;
  /** 是否显示斑马纹 */
  striped?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  striped = true,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a2a4a]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-2 px-3 text-[#a0a0b0] font-medium"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const isStriped = striped && index % 2 === 1;
            return (
              <tr
                key={String(row[rowKey] ?? index)}
                className={`border-b border-[#2a2a4a] ${isStriped ? 'bg-[#1a1a3e]' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-2 px-3 text-[#e0e0e0]">
                    {col.render
                      ? col.render(row, index)
                      : String(row[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
