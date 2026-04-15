/**
 * 股票 API 服务层
 * 当前使用 Mock 数据，预留真实 API 接口
 */
import type {
  StockInfo,
  ValuationData,
  FinancialRow,
  ProfitabilityRow,
  CashFlowRow,
  ScoreInfo,
  RPSData,
  InstitutionHolding,
  ShareholderInfo,
  MarketOverview,
  SectorItem,
} from '../types';
import {
  mockStockInfo,
  mockValuationData,
  mockRevenueData,
  mockNetProfitData,
  mockROEData,
  mockNetProfitMarginData,
  mockCashFlowData,
  mockScoreInfo,
  mockRPSData,
  mockInstitutionHolding,
  mockShareholderInfo,
  mockMarketOverview,
  mockSectors,
} from '../mock/stockData';

// 是否使用 Mock 数据（生产环境设为 false）
const USE_MOCK = true;

/** 获取股票基本信息 */
export async function getStockInfo(_code: string): Promise<StockInfo> {
  if (USE_MOCK) return mockStockInfo;
  // TODO: 对接真实 API
  // const res = await fetch(`/api/stock/${_code}/info`);
  // return res.json();
  throw new Error('API 未实现');
}

/** 获取估值历史数据 */
export async function getValuationData(_code: string): Promise<ValuationData[]> {
  if (USE_MOCK) return mockValuationData;
  throw new Error('API 未实现');
}

/** 获取营收数据 */
export async function getRevenueData(_code: string): Promise<FinancialRow[]> {
  if (USE_MOCK) return mockRevenueData;
  throw new Error('API 未实现');
}

/** 获取净利润数据 */
export async function getNetProfitData(_code: string): Promise<FinancialRow[]> {
  if (USE_MOCK) return mockNetProfitData;
  throw new Error('API 未实现');
}

/** 获取 ROE 数据 */
export async function getROEData(_code: string): Promise<ProfitabilityRow[]> {
  if (USE_MOCK) return mockROEData;
  throw new Error('API 未实现');
}

/** 获取净利率数据 */
export async function getNetProfitMarginData(_code: string): Promise<ProfitabilityRow[]> {
  if (USE_MOCK) return mockNetProfitMarginData;
  throw new Error('API 未实现');
}

/** 获取现金流数据 */
export async function getCashFlowData(_code: string): Promise<CashFlowRow[]> {
  if (USE_MOCK) return mockCashFlowData;
  throw new Error('API 未实现');
}

/** 获取综合评分 */
export async function getScoreInfo(_code: string): Promise<ScoreInfo> {
  if (USE_MOCK) return mockScoreInfo;
  throw new Error('API 未实现');
}

/** 获取 RPS 股价强度 */
export async function getRPSData(_code: string): Promise<RPSData[]> {
  if (USE_MOCK) return mockRPSData;
  throw new Error('API 未实现');
}

/** 获取机构持仓 */
export async function getInstitutionHolding(_code: string): Promise<InstitutionHolding> {
  if (USE_MOCK) return mockInstitutionHolding;
  throw new Error('API 未实现');
}

/** 获取股东信息 */
export async function getShareholderInfo(_code: string): Promise<ShareholderInfo> {
  if (USE_MOCK) return mockShareholderInfo;
  throw new Error('API 未实现');
}

/** 获取市场总览 */
export async function getMarketOverview(): Promise<MarketOverview> {
  if (USE_MOCK) return mockMarketOverview;
  throw new Error('API 未实现');
}

/** 获取热门板块 */
export async function getSectors(): Promise<SectorItem[]> {
  if (USE_MOCK) return mockSectors;
  throw new Error('API 未实现');
}
