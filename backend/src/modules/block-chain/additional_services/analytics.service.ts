import { Injectable } from '@nestjs/common';
import { readFile as _readFile, writeFileSync } from 'fs';
import { promisify } from 'util';
import { AnalysisResult, FullReport, Transaction } from './types/types';
const readFile = promisify(_readFile);

const SOL_DECIMALS = 9;
const KNOWN_PROTOCOLS: Record<string, string> = {
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA': 'SPL Token',
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL': 'Associated Token',
  '11111111111111111111111111111111': 'System Program',
  'ComputeBudget111111111111111111111111111111': 'Compute Budget'
};




@Injectable()
export class AnalyticService {
  async analyzeSolanaTransactions(filePath: string): Promise<FullReport> {
    try {
      const data = await readFile(filePath, 'utf8');
      const transactions: Transaction[] = JSON.parse(data);
      
      const analysisResult: AnalysisResult = {
        general: {
          firstTxDate: '',
          lastTxDate: '',
          totalTransactions: transactions.length,
          protocols: {},
          activeDays: new Set()
        },
        financial: {
          totalVolumeSOL: 0,
          totalVolumeUSD: 0,
          averageTradeSize: 0,
          buySellRatio: { buys: 0, sells: 0 },
          topTrades: []
        },
        tokens: {
          mostTraded: {},
          holdings: {},
          profitLoss: {}
        },
        patterns: {
          arbitrage: 0,
          scalping: 0,
          swingTrading: 0,
          memeTrading: 0
        },
        risks: {
          cexWithdrawals: 0,
          suspiciousContracts: [],
          bigLosses: []
        },
        charts: {
          dailyVolume: { date: [], volume: [] },
          tokenDistribution: { token: [], percentage: [] },
          pnlTimeline: { date: [], pnl: [] },
          tradeFrequency: { hour_of_day: Array(24).fill(0), count: Array(24).fill(0) }
        }
      };

      transactions.forEach(tx => {
        const txDate = new Date(tx.blockTime * 1000);
        const txDay = txDate.toISOString().split('T')[0];
        const txHour = txDate.getHours();
        
        if (!analysisResult.general.firstTxDate || txDate < new Date(analysisResult.general.firstTxDate)) {
          analysisResult.general.firstTxDate = txDate.toISOString();
        }
        if (!analysisResult.general.lastTxDate || txDate > new Date(analysisResult.general.lastTxDate)) {
          analysisResult.general.lastTxDate = txDate.toISOString();
        }
        
        analysisResult.general.activeDays.add(txDay);
        analysisResult.charts.tradeFrequency.count[txHour]++;
        
        this.analyzeProtocols(tx, analysisResult);
        this.analyzeTokensAndFinancials(tx, analysisResult, txDate);
        this.detectTradingPatterns(tx, analysisResult, txDate);
        this.detectRisks(tx, analysisResult);
      });

      this.postProcessAnalysis(analysisResult, transactions.length);
      return this.generateReport(analysisResult);
      
    } catch (error) {
      console.error('Error analyzing transactions:', error);
      throw error;
    }
  }

  private analyzeProtocols(tx: Transaction, result: AnalysisResult): void {
    const logMessages = tx.meta?.logMessages || [];
    const instructions = tx.transaction?.message?.instructions || [];
    
    instructions.forEach(ix => {
      const programId = tx.transaction?.message?.accountKeys[ix.programIdIndex];
      if (programId) {
        const protocolName = KNOWN_PROTOCOLS[programId] || programId;
        result.general.protocols[protocolName] = (result.general.protocols[protocolName] || 0) + 1;
      }
    });
    
    logMessages.forEach(log => {
      if (log.includes('Program log: Instruction:')) {
        const protocolMatch = log.match(/Program (\w+)/);
        if (protocolMatch && KNOWN_PROTOCOLS[protocolMatch[1]]) {
          const protocolName = KNOWN_PROTOCOLS[protocolMatch[1]];
          result.general.protocols[protocolName] = (result.general.protocols[protocolName] || 0) + 1;
        }
      }
    });
  }

  private analyzeTokensAndFinancials(
    tx: Transaction, 
    result: AnalysisResult, 
    txDate: Date
  ): void {
    const preTokenBalances = tx.meta?.preTokenBalances || [];
    const postTokenBalances = tx.meta?.postTokenBalances || [];
    const preBalances = tx.meta?.preBalances || [];
    const postBalances = tx.meta?.postBalances || [];
    
    if (preBalances.length > 0 && postBalances.length > 0) {
      const solChange = (preBalances[0] - postBalances[0]) / Math.pow(10, SOL_DECIMALS);
      if (solChange !== 0) {
        result.financial.totalVolumeSOL += Math.abs(solChange);
        
        if (solChange > 0) {
          result.financial.buySellRatio.sells++;
        } else {
          result.financial.buySellRatio.buys++;
        }
        
        result.financial.topTrades.push({
          date: txDate.toISOString(),
          amount: Math.abs(solChange),
          token: 'SOL',
          direction: solChange > 0 ? 'sell' : 'buy'
        });
      }
    }
    
    preTokenBalances.forEach(preBal => {
      const postBal = postTokenBalances.find(p => 
        p.accountIndex === preBal.accountIndex && 
        p.mint === preBal.mint
      );
      
      if (postBal) {
        const preAmount = parseFloat(preBal.uiTokenAmount.uiAmountString);
        const postAmount = parseFloat(postBal.uiTokenAmount.uiAmountString);
        const change = preAmount - postAmount;
        
        if (change !== 0) {
          const token = preBal.mint;
          
          result.tokens.mostTraded[token] = (result.tokens.mostTraded[token] || 0) + Math.abs(change);
          
          if (!result.tokens.holdings[token]) {
            result.tokens.holdings[token] = {
              firstSeen: txDate,
              lastSeen: txDate,
              maxAmount: postAmount,
              currentAmount: postAmount
            };
          } else {
            result.tokens.holdings[token].lastSeen = txDate;
            result.tokens.holdings[token].currentAmount = postAmount;
            if (postAmount > result.tokens.holdings[token].maxAmount) {
              result.tokens.holdings[token].maxAmount = postAmount;
            }
          }
          
          result.financial.topTrades.push({
            date: txDate.toISOString(),
            amount: Math.abs(change),
            token: token,
            direction: change > 0 ? 'sell' : 'buy'
          });
        }
      }
    });
  }

  private detectTradingPatterns(tx: Transaction, result: AnalysisResult, txDate: Date): void {
    const tokenBalances = tx.meta?.postTokenBalances || [];
    tokenBalances.forEach(bal => {
      if (bal.uiTokenAmount.uiAmount < 1000) {
        result.patterns.memeTrading++;
      }
    });
  }

  private detectRisks(tx: Transaction, result: AnalysisResult): void {
    const instructions = tx.transaction?.message?.instructions || [];
    instructions.forEach(ix => {
      const programId = tx.transaction?.message?.accountKeys[ix.programIdIndex];
      if (programId && !KNOWN_PROTOCOLS[programId]) {
        if (!result.risks.suspiciousContracts.includes(programId)) {
          result.risks.suspiciousContracts.push(programId);
        }
      }
    });
  }

  private postProcessAnalysis(result: AnalysisResult, totalTransactions: number): void {
    const firstDate = new Date(result.general.firstTxDate);
    const lastDate = new Date(result.general.lastTxDate);
    const daysActive = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24) || 1;
    result.general.averageTxPerDay = (totalTransactions / daysActive).toFixed(1);
    
    result.general.protocols = Object.entries(result.general.protocols)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    result.financial.averageTradeSize = result.financial.totalVolumeSOL / totalTransactions;
    
    result.financial.topTrades.sort((a, b) => b.amount - a.amount).splice(5);
    
    result.tokens.mostTraded = Object.entries(result.tokens.mostTraded)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    const totalTokenVolume = Object.values(result.tokens.mostTraded).reduce((sum, val) => sum + val, 0);
    if (totalTokenVolume > 0) {
      result.charts.tokenDistribution = {
        token: Object.keys(result.tokens.mostTraded),
        percentage: Object.values(result.tokens.mostTraded).map(vol => (vol / totalTokenVolume * 100).toFixed(1))
      };
    }
  }

  private generateReport(result: AnalysisResult): FullReport {
    const keyFindings = [
      `Трейдер активен с ${result.general.firstTxDate} по ${result.general.lastTxDate} (${result.general.activeDays.size} дней)`,
      `Совершает ~${result.general.averageTxPerDay} сделок в день`,
      `Основные протоколы: ${Object.keys(result.general.protocols).slice(0, 3).join(', ')}`,
      `Общий объем торгов: ${result.financial.totalVolumeSOL.toFixed(2)} SOL`,
      `Соотношение покупок/продаж: ${result.financial.buySellRatio.buys}/${result.financial.buySellRatio.sells}`
    ];
    
    const fullReport: FullReport = {
      keyFindings,
      generalStats: {
        period: `${result.general.firstTxDate} - ${result.general.lastTxDate}`,
        totalTransactions: result.general.totalTransactions,
        averageTxPerDay: result.general.averageTxPerDay || 'null',
        topProtocols: result.general.protocols
      },
      financialMetrics: {
        totalVolumeSOL: result.financial.totalVolumeSOL,
        averageTradeSize: result.financial.averageTradeSize,
        buySellRatio: result.financial.buySellRatio,
        topTrades: result.financial.topTrades
      },
      tokenAnalysis: {
        mostTradedTokens: result.tokens.mostTraded,
        longTermHoldings: Object.entries(result.tokens.holdings)
          .map(([token, data]) => ({
            token,
            holdingPeriod: `${((new Date(data.lastSeen).getTime() - new Date(data.firstSeen).getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)} дней`,
            maxAmount: data.maxAmount
          }))
          .sort((a, b) => parseFloat(b.holdingPeriod) - parseFloat(a.holdingPeriod))
          .slice(0, 5)
      },
      patternsAndRisks: {
        detectedPatterns: {
          memeTrading: result.patterns.memeTrading > 0 ? 'Возможна торговля мем-коинами' : 'Не обнаружено',
          suspiciousContracts: result.risks.suspiciousContracts.length > 0 
            ? `Обнаружены взаимодействия с ${result.risks.suspiciousContracts.length} неизвестными контрактами` 
            : 'Не обнаружено'
        }
      },
      chartsData: result.charts
    };
    
    return fullReport;
  }


    // // Пример использования
    // analyzeSolanaTransactions('transactions.json')
    // .then(report => {
    //     console.log('=== Ключевые выводы ===');
    //     report.keyFindings.forEach(finding => console.log(`- ${finding}`));
        
    //     console.log('\n=== Полный отчет ===');
    //     console.log(JSON.stringify(report, null, 2));
        
    //     // Сохранение данных для визуализации
    //     writeFileSync('charts_data.json', JSON.stringify(report.chartsData, null, 2));
    //     console.log('\nДанные для визуализации сохранены в charts_data.json');
    // })
    // .catch(console.error);
}