/**
 * Mock 数据 - 中国银行(601988.SH)
 * 使用真实参考数据构建，用于开发阶段
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

/** 股票基本信息 */
export const mockStockInfo: StockInfo = {
  code: '601988.SH',
  name: '中国银行',
  price: 5.79,
  change: 0.06,
  changePercent: 1.05,
  turnoverRate: 0.28,
  marketCap: '1.87万亿',
  peTTM: 7.68,
  pb: 0.69,
  sector: '银行',
  industry: '国有大型银行',
  tags: ['大盘股', '低估值', '高股息', 'AH股'],
};

/** 估值历史数据（2016-2025） */
export const mockValuationData: ValuationData[] = [
  { date: '2016', pe: 5.52, pb: 0.55, ps: 1.82, pcf: 4.20, compositeLevel: '很低', compositePercent: 2.1 },
  { date: '2017', pe: 6.38, pb: 0.63, ps: 2.10, pcf: 4.85, compositeLevel: '低', compositePercent: 8.5 },
  { date: '2018', pe: 5.80, pb: 0.57, ps: 1.91, pcf: 4.40, compositeLevel: '很低', compositePercent: 3.2 },
  { date: '2019', pe: 6.15, pb: 0.61, ps: 2.03, pcf: 4.67, compositeLevel: '低', compositePercent: 10.8 },
  { date: '2020', pe: 5.20, pb: 0.52, ps: 1.72, pcf: 3.95, compositeLevel: '很低', compositePercent: 1.5 },
  { date: '2021', pe: 5.85, pb: 0.58, ps: 1.93, pcf: 4.45, compositeLevel: '低', compositePercent: 7.6 },
  { date: '2022', pe: 4.95, pb: 0.49, ps: 1.63, pcf: 3.77, compositeLevel: '极低', compositePercent: 0.5 },
  { date: '2023', pe: 5.40, pb: 0.54, ps: 1.78, pcf: 4.11, compositeLevel: '很低', compositePercent: 2.8 },
  { date: '2024', pe: 6.80, pb: 0.65, ps: 2.24, pcf: 5.18, compositeLevel: '偏低', compositePercent: 22.4 },
  { date: '2025', pe: 7.68, pb: 0.69, ps: 2.53, pcf: 5.85, compositeLevel: '偏低', compositePercent: 28.6 },
];

/** 营收数据（2016-2025） */
export const mockRevenueData: FinancialRow[] = [
  { year: '2016', value: 1228, industryValue: 980 },
  { year: '2017', value: 1293, industryValue: 1020 },
  { year: '2018', value: 1356, industryValue: 1055 },
  { year: '2019', value: 1402, industryValue: 1080 },
  { year: '2020', value: 1368, industryValue: 1065 },
  { year: '2021', value: 1485, industryValue: 1120 },
  { year: '2022', value: 1528, industryValue: 1145 },
  { year: '2023', value: 1583, industryValue: 1170 },
  { year: '2024', value: 1635, industryValue: 1200 },
  { year: '2025', value: 1671, industryValue: 1225 },
];

/** 归母净利润数据（2016-2025） */
export const mockNetProfitData: FinancialRow[] = [
  { year: '2016', value: 1391, industryValue: 1050 },
  { year: '2017', value: 1458, industryValue: 1100 },
  { year: '2018', value: 1506, industryValue: 1130 },
  { year: '2019', value: 1558, industryValue: 1160 },
  { year: '2020', value: 1489, industryValue: 1120 },
  { year: '2021', value: 1562, industryValue: 1180 },
  { year: '2022', value: 1583, industryValue: 1200 },
  { year: '2023', value: 1601, industryValue: 1215 },
  { year: '2024', value: 1628, industryValue: 1240 },
  { year: '2025', value: 1649, industryValue: 1260 },
];

/** ROE 数据（2006-2025） */
export const mockROEData: ProfitabilityRow[] = [
  { year: '2006', roe: 13.10, industryRoe: 12.50, roa: 0.95, industryRoa: 0.90 },
  { year: '2008', roe: 11.80, industryRoe: 11.20, roa: 0.85, industryRoa: 0.80 },
  { year: '2010', roe: 15.20, industryRoe: 14.00, roa: 1.10, industryRoa: 1.00 },
  { year: '2012', roe: 16.50, industryRoe: 15.20, roa: 1.18, industryRoa: 1.08 },
  { year: '2014', roe: 15.80, industryRoe: 14.80, roa: 1.12, industryRoa: 1.05 },
  { year: '2016', roe: 13.50, industryRoe: 12.80, roa: 0.98, industryRoa: 0.92 },
  { year: '2018', roe: 12.10, industryRoe: 11.50, roa: 0.88, industryRoa: 0.83 },
  { year: '2020', roe: 10.50, industryRoe: 10.00, roa: 0.76, industryRoa: 0.72 },
  { year: '2022', roe: 9.80, industryRoe: 9.40, roa: 0.71, industryRoa: 0.68 },
  { year: '2024', roe: 8.50, industryRoe: 8.20, roa: 0.62, industryRoa: 0.59 },
  { year: '2025', roe: 7.93, industryRoe: 7.60, roa: 0.58, industryRoa: 0.55 },
];

/** 净利率数据（2006-2025） */
export const mockNetProfitMarginData: ProfitabilityRow[] = [
  { year: '2006', roe: 29.20, industryRoe: 28.50, roa: 26.80, industryRoa: 26.00 },
  { year: '2008', roe: 27.50, industryRoe: 27.00, roa: 25.20, industryRoa: 24.80 },
  { year: '2010', roe: 32.10, industryRoe: 31.00, roa: 29.50, industryRoa: 28.80 },
  { year: '2012', roe: 33.80, industryRoe: 32.50, roa: 31.00, industryRoa: 30.20 },
  { year: '2014', roe: 34.50, industryRoe: 33.20, roa: 31.80, industryRoa: 31.00 },
  { year: '2016', roe: 35.20, industryRoe: 34.00, roa: 32.50, industryRoa: 31.80 },
  { year: '2018', roe: 33.80, industryRoe: 32.80, roa: 31.20, industryRoa: 30.50 },
  { year: '2020', roe: 34.60, industryRoe: 33.50, roa: 32.00, industryRoa: 31.20 },
  { year: '2022', roe: 35.80, industryRoe: 34.50, roa: 33.20, industryRoa: 32.50 },
  { year: '2024', roe: 36.20, industryRoe: 35.00, roa: 33.80, industryRoa: 33.00 },
  { year: '2025', roe: 36.90, industryRoe: 35.50, roa: 34.50, industryRoa: 33.80 },
];

/** 现金流数据（2006-2025） */
export const mockCashFlowData: CashFlowRow[] = [
  { year: '2006', operating: 2850, investing: -680, financing: -1850 },
  { year: '2008', operating: 3120, investing: -720, financing: -2010 },
  { year: '2010', operating: 3580, investing: -850, financing: -2300 },
  { year: '2012', operating: 3950, investing: -920, financing: -2580 },
  { year: '2014', operating: 4280, investing: -980, financing: -2750 },
  { year: '2016', operating: 4620, investing: -1050, financing: -2920 },
  { year: '2018', operating: 4850, investing: -1120, financing: -3050 },
  { year: '2020', operating: 4580, investing: -1080, financing: -2880 },
  { year: '2022', operating: 5120, investing: -1180, financing: -3250 },
  { year: '2024', operating: 5480, investing: -1250, financing: -3480 },
  { year: '2025', operating: 5650, investing: -1300, financing: -3580 },
];

/** 综合评分 */
export const mockScoreInfo: ScoreInfo = {
  quality: 8.4,
  valuation: 5.7,
  trend: 9.6,
};

/** RPS 股价强度 */
export const mockRPSData: RPSData[] = [
  { period: '5日', value: 64.1 },
  { period: '10日', value: 21.7 },
  { period: '20日', value: 82.1 },
  { period: '60日', value: 74.6 },
  { period: '120日', value: 67.0 },
  { period: '250日', value: 40.0 },
];

/** 机构持仓 */
export const mockInstitutionHolding: InstitutionHolding = {
  date: '2025-03-31',
  northbound: 0.36,
  mutualFund: 0.50,
  insurance: 0.08,
  qfii: 0.02,
  broker: 0.01,
  socialSecurity: 0.15,
};

/** 股东信息 */
export const mockShareholderInfo: ShareholderInfo = {
  date: '2025-03-31',
  totalCount: 70.8,
  perBillionCap: 58.0,
};

/** 市场总览 */
export const mockMarketOverview: MarketOverview = {
  changePercent: -0.44,
  turnover: '2.43万亿',
  valuationLevel: '很高',
  valuationPercent: 79.8,
};

/** 热门板块 */
export const mockSectors: SectorItem[] = [
  { name: '半导体', code: 'BK0447', topStockCode: '688981.SH', topStockName: '中芯国际', changePercent: 3.25 },
  { name: '人工智能', code: 'BK0800', topStockCode: '002230.SZ', topStockName: '科大讯飞', changePercent: 2.88 },
  { name: '新能源车', code: 'BK0478', topStockCode: '300750.SZ', topStockName: '宁德时代', changePercent: 1.95 },
  { name: '医药生物', code: 'BK0451', topStockCode: '300760.SZ', topStockName: '迈瑞医疗', changePercent: 1.52 },
  { name: '银行', code: 'BK0475', topStockCode: '601398.SH', topStockName: '工商银行', changePercent: 0.85 },
  { name: '白酒', code: 'BK0476', topStockCode: '600519.SH', topStockName: '贵州茅台', changePercent: -0.32 },
  { name: '房地产', code: 'BK0453', topStockCode: '000002.SZ', topStockName: '万科A', changePercent: -1.28 },
  { name: '军工', code: 'BK0481', topStockCode: '600893.SH', topStockName: '航发动力', changePercent: 2.15 },
];

export const mockSectorsConcept: SectorItem[] = [
  { name: '算力租赁', code: 'GN011', topStockCode: '600845.SH', topStockName: '宝信软件', changePercent: 4.15 },
  { name: '数据要素', code: 'GN012', topStockCode: '603083.SH', topStockName: '剑桥科技', changePercent: 3.88 },
  { name: '低空经济', code: 'GN013', topStockCode: '300424.SZ', topStockName: '航新科技', changePercent: 3.45 },
  { name: '固态电池', code: 'GN014', topStockCode: '300068.SZ', topStockName: '南都电源', changePercent: 2.92 },
  { name: '减肥药', code: 'GN015', topStockCode: '002821.SZ', topStockName: '凯莱英', changePercent: 1.85 },
];

export const mockSectorsStyle: SectorItem[] = [
  { name: '微盘股', code: 'FG001', topStockCode: '000001.SZ', topStockName: '平安银行', changePercent: 2.15 },
  { name: '高股息', code: 'FG002', topStockCode: '601088.SH', topStockName: '中国神华', changePercent: 1.88 },
  { name: '央企改革', code: 'FG003', topStockCode: '601857.SH', topStockName: '中国石油', changePercent: 1.45 },
  { name: '绩优股', code: 'FG004', topStockCode: '600036.SH', topStockName: '招商银行', changePercent: 0.92 },
  { name: 'ST板块', code: 'FG005', topStockCode: '600519.SH', topStockName: '贵州茅台', changePercent: -1.85 },
];
