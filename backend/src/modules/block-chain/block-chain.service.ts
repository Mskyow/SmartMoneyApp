import { Injectable } from '@nestjs/common';
import { TransactionService } from './additional_services/transactions.service';
import { AccountService } from './additional_services/account.service';
import { SolanaProvider } from './providers/solana.provider';

@Injectable()
export class BlockChainService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
    private readonly solanaProvider: SolanaProvider,
  ) {}

  async testfunc(): Promise<void> {
    await this.solanaProvider.getSlot();
  }

  async getTransactionsSignatures(walletAddress: string) {
    return this.transactionService.getTransactionsSignatures(walletAddress);
  }

  async getAccountBalance(walletAddress: string) {
    return this.accountService.getAccountBalance(walletAddress);
  }

  async getTokensOnAccount(walletAddress: string) {
    return this.accountService.getTokensOnAccount(walletAddress);
  }
}