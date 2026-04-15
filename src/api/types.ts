/**
 * 股票分析平台 - 全局类型定义
 * 参考中国银行 601988.SH 的数据结构
 */

/** 股票基本信息 */
export interface StockInfo {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  turnoverRate: number;
  marketCap: string;
  peTTM: number;
  pb: number;
  sector: string;
  industry: string;
  tags: string[];
}

/** 估值数据（按年度） */
export interface ValuationData {
  date: string;
  pe: number;
  pb: number;
  ps: number;
  pcf: number;
  compositeLevel: string;
  compositePercent: number;
}

/** 财务数据行（营收/利润等） */
export interface FinancialRow {
  year: string;
  value: number;
  industryValue: number;
}

/** 盈利能力行（ROE/ROA 等） */
export interface ProfitabilityRow {
  year: string;
  roe: number;
  industryRoe: number;
  roa: number;
  industryRoa: number;
}

/** 现金流行（经营/投资/筹资） */
export interface CashFlowRow {
  year: string;
  operating: number;
  investing: number;
  financing: number;
}

/** 股东信息 */
export interface ShareholderInfo {
  date: string;
  totalCount: number;
  perBillionCap: number;
}

/** 机构持仓 */
export interface InstitutionHolding {
  date: string;
  northbound: number;
  mutualFund: number;
  insurance: number;
  qfii: number;
  broker: number;
  socialSecurity: number;
}

/** RPS 股价强度 */
export interface RPSData {
  period: string;
  value: number;
}

/** 评分信息（0-10 分） */
export interface ScoreInfo {
  quality: number;
  valuation: number;
  trend: number;
}

/** 市场总览 */
export interface MarketOverview {
  changePercent: number;
  turnover: string;
  valuationLevel: string;
  valuationPercent: number;
}

/** 板块项 */
export interface SectorItem {
  name: string;
  code: string;
  topStockCode: string;
  topStockName: string;
  changePercent: number;
}
