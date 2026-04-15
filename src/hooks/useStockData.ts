/**
 * 股票数据 Hook
 * 封装数据获取逻辑，支持加载状态和错误处理
 */
import { useState, useEffect } from 'react';
import * as service from '../api/services/stockService';
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
} from '../api/types';

/** 通用数据加载状态 */
interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** 股票详情页所需的所有数据 */
interface StockDetailData {
  info: DataState<StockInfo>;
  valuation: DataState<ValuationData[]>;
  revenue: DataState<FinancialRow[]>;
  netProfit: DataState<FinancialRow[]>;
  roe: DataState<ProfitabilityRow[]>;
  netProfitMargin: DataState<ProfitabilityRow[]>;
  cashFlow: DataState<CashFlowRow[]>;
  score: DataState<ScoreInfo>;
  rps: DataState<RPSData[]>;
  institution: DataState<InstitutionHolding>;
  shareholder: DataState<ShareholderInfo>;
}

/** 获取个股详情页全部数据 */
export function useStockDetail(code: string): StockDetailData {
  const [info, setInfo] = useState<DataState<StockInfo>>({ data: null, loading: true, error: null });
  const [valuation, setValuation] = useState<DataState<ValuationData[]>>({ data: null, loading: true, error: null });
  const [revenue, setRevenue] = useState<DataState<FinancialRow[]>>({ data: null, loading: true, error: null });
  const [netProfit, setNetProfit] = useState<DataState<FinancialRow[]>>({ data: null, loading: true, error: null });
  const [roe, setRoe] = useState<DataState<ProfitabilityRow[]>>({ data: null, loading: true, error: null });
  const [netProfitMargin, setNetProfitMargin] = useState<DataState<ProfitabilityRow[]>>({ data: null, loading: true, error: null });
  const [cashFlow, setCashFlow] = useState<DataState<CashFlowRow[]>>({ data: null, loading: true, error: null });
  const [score, setScore] = useState<DataState<ScoreInfo>>({ data: null, loading: true, error: null });
  const [rps, setRps] = useState<DataState<RPSData[]>>({ data: null, loading: true, error: null });
  const [institution, setInstitution] = useState<DataState<InstitutionHolding>>({ data: null, loading: true, error: null });
  const [shareholder, setShareholder] = useState<DataState<ShareholderInfo>>({ data: null, loading: true, error: null });

  useEffect(() => {
    // 并行加载所有数据
    const load = async () => {
      try {
        const [infoRes, valRes, revRes, npRes, roeRes, npmRes, cfRes, scoreRes, rpsRes, instRes, shRes] =
          await Promise.all([
            service.getStockInfo(code),
            service.getValuationData(code),
            service.getRevenueData(code),
            service.getNetProfitData(code),
            service.getROEData(code),
            service.getNetProfitMarginData(code),
            service.getCashFlowData(code),
            service.getScoreInfo(code),
            service.getRPSData(code),
            service.getInstitutionHolding(code),
            service.getShareholderInfo(code),
          ]);
        setInfo({ data: infoRes, loading: false, error: null });
        setValuation({ data: valRes, loading: false, error: null });
        setRevenue({ data: revRes, loading: false, error: null });
        setNetProfit({ data: npRes, loading: false, error: null });
        setRoe({ data: roeRes, loading: false, error: null });
        setNetProfitMargin({ data: npmRes, loading: false, error: null });
        setCashFlow({ data: cfRes, loading: false, error: null });
        setScore({ data: scoreRes, loading: false, error: null });
        setRps({ data: rpsRes, loading: false, error: null });
        setInstitution({ data: instRes, loading: false, error: null });
        setShareholder({ data: shRes, loading: false, error: null });
      } catch (err) {
        const msg = err instanceof Error ? err.message : '数据加载失败';
        // 统一设置错误状态
        [setInfo, setValuation, setRevenue, setNetProfit, setRoe,
          setNetProfitMargin, setCashFlow, setScore, setRps,
          setInstitution, setShareholder,
        ].forEach((setter) => setter({ data: null, loading: false, error: msg }));
      }
    };
    load();
  }, [code]);

  return { info, valuation, revenue, netProfit, roe, netProfitMargin, cashFlow, score, rps, institution, shareholder };
}

/** 获取市场总览数据 */
export function useMarketData(): {
  overview: DataState<MarketOverview>;
  sectors: DataState<SectorItem[]>;
} {
  const [overview, setOverview] = useState<DataState<MarketOverview>>({ data: null, loading: true, error: null });
  const [sectors, setSectors] = useState<DataState<SectorItem[]>>({ data: null, loading: true, error: null });

  useEffect(() => {
    const load = async () => {
      try {
        const [ovRes, secRes] = await Promise.all([
          service.getMarketOverview(),
          service.getSectors(),
        ]);
        setOverview({ data: ovRes, loading: false, error: null });
        setSectors({ data: secRes, loading: false, error: null });
      } catch (err) {
        const msg = err instanceof Error ? err.message : '数据加载失败';
        setOverview({ data: null, loading: false, error: msg });
        setSectors({ data: null, loading: false, error: msg });
      }
    };
    load();
  }, []);

  return { overview, sectors };
}
