import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBlockchainData } from "../../thunk";
import { FullReport } from "./types";

interface IInitailState {
    balance: number | null,
    tokenList: ITokenList,
    analytics : FullReport,
    loading: boolean,
    error: null | unknown,
}


const initialState : IInitailState= {
    balance: null,
    tokenList:{
      total : 0,
      tokens: [{
      id: '',          // Mint address
      name: '',        // Название токена
      symbol: '',      // Символ (например USDC)
      decimals: 0,    // Разрядность (6 для USDC)
      balance: 0,     // Реальное количество (balance / 10^decimals)
      rawBalance: 0,  // Баланс в наименьших единицах
      pricePerToken:  null,  // Цена за 1 токен
      totalValue:  null,     // Общая стоимость
      currency: null,       // Валюта цены (обычно USDC)
      tokenProgram: '',          // Программа токена
      associatedTokenAddress: '',// ATA адрес
      image: null,          // Ссылка на изображение
      metadataUri: null,    // Ссылка на метаданные
      tokenStandard: null,  // Стандарт токена
      extensions: null  ,       // Расширения Token-2022
      percentage : null , // долю токена в общей стоимости портфеля 
    }]},
    analytics : {
      keyFindings: [''],
      generalStats: {
        period: '',
        totalTransactions: 0,
        averageTxPerDay: '',
        topProtocols: {},
      },
      financialMetrics: {
        totalVolumeSOL: 0,
        averageTradeSize: 0,
        buySellRatio: { buys: 0, sells: 0 },
        topTrades:[{
          date: '',
          amount: 0,
          token: '',
          direction:  'buy',
        }],
      },
      tokenAnalysis: {
        mostTradedTokens: {'':0},
        longTermHoldings: [{
          token: '',
          holdingPeriod: '',
          maxAmount: 0,
        }],
      },
      patternsAndRisks: {
        detectedPatterns: {
          memeTrading: '',
          suspiciousContracts: '',
        },
      },
      chartsData: {dailyVolume: {
        date: [''],
        volume: [0],
      },
      tokenDistribution: {
        token: [''],
        percentage: [''],
      },
      pnlTimeline: {
        date: [''],
        pnl: [0],
      },
      tradeFrequency: {
        hour_of_day: [0],
        count: [0],
      },
     },
    },
    loading: false,
    error: null as string | unknown,
}
interface BlockchainData {
    analytics: FullReport;
    balance: number;
    tokenList: ITokenList;
    
  }

const blockchainSlice = createSlice({
    name: "blockchain",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBlockchainData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBlockchainData.fulfilled, (state, action: PayloadAction<BlockchainData>) => {
          state.loading = false;
          state.balance = action.payload.balance;
          state.tokenList = action.payload.tokenList;
          state.analytics = action.payload.analytics;
        })
        .addCase(fetchBlockchainData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string || "An error occurred"
        });
    },
  });
  
 // features/blockchainSelectors.js
export const selectBalance = (state: { blockchain: { balance: number; }; } ) => state.blockchain.balance;
export const selectAnalytics = (state: { blockchain: { analytics: FullReport; }; } ) => state.blockchain.analytics;
export const selectTokenList = (state: { blockchain: { tokenList: []; }; }) => state.blockchain.tokenList;
export const selectLoading = (state: { blockchain: { loading: boolean; }; }) => state.blockchain.loading;
export const selectError = (state: { blockchain: { error: any; }; }) => state.blockchain.error;
  
  export default blockchainSlice.reducer