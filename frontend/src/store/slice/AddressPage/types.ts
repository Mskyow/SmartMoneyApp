export interface FullReport {
    keyFindings: string[];
    generalStats: {
      period: string;
      totalTransactions: number;
      averageTxPerDay: string;
      topProtocols: ProtocolStats;
    };
    financialMetrics: {
      totalVolumeSOL: number;
      averageTradeSize: number;
      buySellRatio: { buys: number; sells: number };
      topTrades: Array<{
        date: string;
        amount: number;
        token: string;
        direction: 'buy' | 'sell';
      }>;
    };
    tokenAnalysis: {
      mostTradedTokens: Record<string, number>;
      longTermHoldings: Array<{
        token: string;
        holdingPeriod: string;
        maxAmount: number;
      }>;
    };
    patternsAndRisks: {
      detectedPatterns: {
        memeTrading: string;
        suspiciousContracts: string;
      };
    };
    chartsData: ChartData;
}

export interface ChartData {
    dailyVolume: {
      date: string[];
      volume: number[];
    };
    tokenDistribution: {
      token: string[];
      percentage: string[];
    };
    pnlTimeline: {
      date: string[];
      pnl: number[];
    };
    tradeFrequency: {
      hour_of_day: number[];
      count: number[];
    };
}

export interface ProtocolStats {
    [protocol: string]: number;
  }