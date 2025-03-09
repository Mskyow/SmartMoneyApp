import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as web3 from '@solana/web3.js';
import {
  Connection,
  PublicKey,
  ConfirmedSignatureInfo,
  VersionedTransactionResponse,
} from '@solana/web3.js';
import * as fs from 'node:fs';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class BlockChainService {
  private solana: Connection;

  constructor(private readonly configService: ConfigService) {
    const httpsProviderLink: string | undefined =
      this.configService.get<string>('solana_https_provider');

    if (!httpsProviderLink) {
      throw new BadRequestException(AppError.SOLANA_HTTPS_PROVIDER_UNDEFIND);
    }

    this.solana = new web3.Connection(httpsProviderLink);
  }

  async testfunc(): Promise<void> {
    try {
      const slot = await this.solana.getSlot();
      console.log(slot);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getTransctionsSignatures(
    walletAddress: string,
  ): Promise<{
    tokenName: string;
    formattedDate: string;
    amountTransferred: number;
    transactionType: 'Transfer' | 'Swap' | 'Unknown';
  }[]> {
    try {
      if (!walletAddress) {
        throw new BadRequestException('Wallet address is required');
      }
  
      const publicKey = new PublicKey(walletAddress);
      const signatures: ConfirmedSignatureInfo[] = await this.solana.getSignaturesForAddress(publicKey, {
        limit: 60,
      });
  
      if (signatures.length === 0) {
        throw new BadRequestException(AppError.GET_ALL_TRANSACIONS_NULL);
      }
  
      return await this.getTransactSignatureInfo(signatures);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getTransactSignatureInfo(
    signatures: ConfirmedSignatureInfo[],
  ): Promise<{
    tokenName: string;
    formattedDate: string;
    amountTransferred: number;
    transactionType: 'Transfer' | 'Swap' | 'Unknown';
  }[]> {
    try {
      const transactions = await Promise.all(
        signatures.map(async (tx) => {
          if (!tx.signature) {
            throw new Error('Transaction signature is missing');
          }
  
          const transaction = await this.solana.getTransaction(tx.signature, {
            commitment: 'finalized',
            maxSupportedTransactionVersion: 0,
          });
          if (!transaction) {
            return null;
          }
  
          function formatDate(date : Date) {
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
            const day = String(date.getUTCDate()).padStart(2, '0');
            const year = date.getUTCFullYear();
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`; }
          const formattedDate = transaction.blockTime ? formatDate(new Date(transaction.blockTime * 1000)) : 'Unknown Date';
          // console.log(transaction.meta?.postTokenBalances)
          const mintAddress = transaction.meta?.postTokenBalances?.[0]?.mint || 'Unknown Mint'
          if (!mintAddress || mintAddress === 'Unknown Mint') {
          return null;
          }
          const preBalance = parseFloat(
            transaction.meta?.preTokenBalances?.[0]?.uiTokenAmount?.uiAmountString || '0',
          );
          const postBalance = parseFloat(
            transaction.meta?.postTokenBalances?.[0]?.uiTokenAmount?.uiAmountString || '0',
          );
          const amountTransferred = preBalance - postBalance;
  
          let transactionType: 'Transfer' | 'Swap' | 'Unknown' = 'Unknown';

          if (transaction.meta?.logMessages) {
            const logs = transaction.meta.logMessages;

            // Проверка на Transfer
            const isTransfer = logs.some((log: string) =>
              /Instruction: (Transfer|TransferChecked|TransferToken)/i.test(log)
            );

            // Проверка на Swap
            const isSwap = logs.some((log: string) =>
              /Instruction: (Swap|Exchange)/i.test(log)
            );

            if (isTransfer) {
              transactionType = 'Transfer';
            } else if (isSwap) {
              transactionType = 'Swap';
            } else {
              // Дополнительная проверка по изменениям балансов
              const preBalances = transaction.meta.preTokenBalances || [];
              const postBalances = transaction.meta.postTokenBalances || [];

            if (preBalances.length > 0 && postBalances.length > 0) {
              const balanceChanges = preBalances.map((pre, index) => {
                const post = postBalances[index];
                return {
                  mint: pre.mint,
                  change: (post.uiTokenAmount.uiAmount || 0) - (pre.uiTokenAmount.uiAmount || 0),
                };
              });

              // Если один токен уменьшился, а другой увеличился, это может быть Swap
              const hasPositiveChange = balanceChanges.some((change) => change.change > 0);
              const hasNegativeChange = balanceChanges.some((change) => change.change < 0);

              if (hasPositiveChange && hasNegativeChange) {
                transactionType = 'Swap';
              } else if (hasNegativeChange) {
                transactionType = 'Transfer';
              }
            }
          }
        }
  
          const tokenName = await this.getTokenName(mintAddress);
  
          return {
            tokenName,
            formattedDate,
            amountTransferred,
            transactionType,
          };
        }),
      );
      // Фильтруем null-значения
      return transactions.filter((tx) => tx !== null) as {
        tokenName: string;
        formattedDate: string;
        amountTransferred: number;
        transactionType: 'Transfer' | 'Swap' | 'Unknown';
      }[];
    } catch (error) {
      throw new Error(String(error));
    }
  }
  
  async getTokenName(mintAddress: string): Promise<string> {
    if (!mintAddress) {
      return 'Unknown Token';
    }
  
    try {
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${this.configService.get<string>('helius_api_key')}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": "text",
            "method": "getAsset",
            "params": { id: mintAddress}
        }),
    })
    const data = await response.json();
     return await data.result.content.metadata.symbol || "Unknown Token"
    } catch (error) {
      console.error('Failed to fetch token name:', error);
      return 'Unknown Token';
    }
  }
}
