/**
 * 格式化工具函数
 */

/**
 * 格式化金额（亿元）
 * 例如：1671 -> "1671亿", 18700 -> "1.87万亿"
 */
export function formatMoney(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)}万亿`;
  }
  return `${value.toFixed(0)}亿`;
}

/**
 * 格式化百分比
 * 例如：1.05 -> "+1.05%", -0.44 -> "-0.44%"
 */
export function formatPercent(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * 格式化股价
 * 例如：5.79 -> "5.79"
 */
export function formatPrice(value: number): string {
  return value.toFixed(2);
}

/**
 * 格式化大额数字（带单位）
 * 例如：70.8 -> "70.8万"
 */
export function formatCount(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)}亿`;
  }
  return `${value.toFixed(1)}万`;
}
