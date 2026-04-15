/**
 * Zustand 全局状态管理
 */
import { create } from 'zustand';

/** 应用全局状态 */
interface AppState {
  /** 当前选中的股票代码 */
  selectedStock: string;
  /** 设置选中的股票代码 */
  setSelectedStock: (code: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedStock: '601988.SH',
  setSelectedStock: (code) => set({ selectedStock: code }),
}));
