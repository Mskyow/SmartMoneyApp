import { BadRequestException, Injectable } from '@nestjs/common';
import { SolanaProvider } from '../providers/solana.provider';
import { AppError } from 'src/common/constants/errors';
import { ConfirmedSignatureInfo } from '@solana/web3.js';
import { TokenService } from './token.service';
import { ITransactionInfo } from './types/types';

@Injectable()
export class TransactionService {
  constructor(private readonly solanaProvider: SolanaProvider,
    private readonly tokenService: TokenService
  ) {}

  async getTransactionsSignatures(walletAddress: string): Promise<ITransactionInfo[]> {
    const signatures = await this.solanaProvider.getSignaturesForAddress(walletAddress, 40);
    if (signatures.length === 0) {
      throw new BadRequestException(AppError.GET_ALL_TRANSACIONS_NULL);
    }

    return this.getTransactSignatureInfo(signatures);
  }

  async getTransactSignatureInfo(signatures: ConfirmedSignatureInfo[]): Promise<ITransactionInfo[]> {
    const transactions = await Promise.all(
      signatures.map(async (tx) => {
        const transaction = await this.solanaProvider.getTransaction(tx.signature);
        if (!transaction) return null;
        const formattedDate = transaction.blockTime ? this.formatDate(new Date(transaction.blockTime * 1000)) : 'Unknown Date';
        const mintAddress = transaction.meta?.postTokenBalances?.[0]?.mint || 'Unknown Mint';

        if (!mintAddress || mintAddress === 'Unknown Mint') {
          return null;
        }

        const preBalance = parseFloat(transaction.meta?.preTokenBalances?.[0]?.uiTokenAmount?.uiAmountString || '0');
        const postBalance = parseFloat(transaction.meta?.postTokenBalances?.[0]?.uiTokenAmount?.uiAmountString || '0');
        const amountTransferred = preBalance - postBalance;

        const transactionType = this.determineTransactionType(transaction);

        const tokenName = await this.tokenService.getTokenName(mintAddress);

        return {
          tokenName,
          formattedDate,
          amountTransferred,
          transactionType,
          mintAddress
        };
      }),
    );
    console.log(transactions)
    return transactions.filter((tx) => tx !== null) as ITransactionInfo[];
  }

  private formatDate(date: Date): string {
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
  }
  private determineTransactionType(transaction: any): 'Transfer' | 'Swap' | 'Unknown' {
    if (transaction.meta?.logMessages) {
      const logs = transaction.meta.logMessages;

      const isTransfer = logs.some((log: string) =>
        /Instruction: (Transfer|TransferChecked|TransferToken)/i.test(log)
      );

      const isSwap = logs.some((log: string) =>
        /Instruction: (Swap|Exchange)/i.test(log)
      );

      if (isTransfer) return 'Transfer';
      if (isSwap) return 'Swap';
    }

    return 'Unknown';
  }
}