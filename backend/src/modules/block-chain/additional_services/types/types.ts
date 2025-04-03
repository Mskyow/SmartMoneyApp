export interface ITransactionInfo {
    tokenName: string;
    formattedDate: string;
    amountTransferred: number;
    transactionType: 'Transfer' | 'Swap' | 'Unknown';
  }

  export interface IFungibleTokensListObject {
    id: string,          // Mint address
    name: string,        // Название токена
    symbol: string,      // Символ (например USDC)
    decimals: number,    // Разрядность (6 для USDC)
    balance: number,     // Реальное количество (balance / 10^decimals)
    rawBalance: number,  // Баланс в наименьших единицах
    pricePerToken: number | null,  // Цена за 1 токен
    totalValue: number | null,     // Общая стоимость
    currency: string | null,       // Валюта цены (обычно USDC)
    tokenProgram: string,          // Программа токена
    associatedTokenAddress: string,// ATA адрес
    image: string | null,          // Ссылка на изображение
    metadataUri: string | null,    // Ссылка на метаданные
    tokenStandard: string | null,  // Стандарт токена
    extensions: any | null         // Расширения Token-2022
  }

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

// Интерфейсы для типизации
export interface TokenBalance {
  accountIndex: number;
  mint: string;
  uiTokenAmount: {
    uiAmount: number;
    uiAmountString: string;
  };
}

export interface Instruction {
  programIdIndex: number;
  [key: string]: any;
}

export interface Transaction {
  blockTime: number;
  meta?: {
    logMessages?: string[];
    preTokenBalances?: TokenBalance[];
    postTokenBalances?: TokenBalance[];
    preBalances?: number[];
    postBalances?: number[];
    [key: string]: any;
  };
  transaction?: {
    message?: {
      accountKeys: string[];
      instructions?: Instruction[];
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ProtocolStats {
  [protocol: string]: number;
}

export interface TokenHoldings {
  [token: string]: {
    firstSeen: Date;
    lastSeen: Date;
    maxAmount: number;
    currentAmount: number;
  };
}

export interface TradingPatterns {
  arbitrage: number;
  scalping: number;
  swingTrading: number;
  memeTrading: number;
}

export interface RiskAnalysis {
  cexWithdrawals: number;
  suspiciousContracts: string[];
  bigLosses: any[];
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

export interface AnalysisResult {
  general: {
    firstTxDate: string;
    lastTxDate: string;
    totalTransactions: number;
    protocols: ProtocolStats;
    activeDays: Set<string>;
    averageTxPerDay?: string;
  };
  financial: {
    totalVolumeSOL: number;
    totalVolumeUSD: number;
    averageTradeSize: number;
    buySellRatio: { buys: number; sells: number };
    topTrades: Array<{
      date: string;
      amount: number;
      token: string;
      direction: 'buy' | 'sell';
    }>;
  };
  tokens: {
    mostTraded: Record<string, number>;
    holdings: TokenHoldings;
    profitLoss: Record<string, any>;
  };
  patterns: TradingPatterns;
  risks: RiskAnalysis;
  charts: ChartData;
}
