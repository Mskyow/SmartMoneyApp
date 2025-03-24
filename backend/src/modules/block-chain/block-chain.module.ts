import { Module } from '@nestjs/common';
import { BlockChainController } from './block-chain.controller';
import { BlockChainService } from './block-chain.service';
import { ConfigModule } from '@nestjs/config';
import { SolanaProvider } from './providers/solana.provider';
import { AccountService } from './additional_services/account.service';
import { TokenService } from './additional_services/token.service';
import { TransactionService } from './additional_services/transactions.service';

@Module({
  imports: [ConfigModule],
  controllers: [BlockChainController],
  providers: [BlockChainService,SolanaProvider,AccountService,TokenService,TransactionService],
})
export class BlockChainModule {}
