import { Module, Provider } from '@nestjs/common';
import { BlockChainController } from './block-chain.controller';
import { BlockChainService } from './block-chain.service';
import { ConfigModule } from '@nestjs/config';
import { SolanaProvider } from './providers/solana.provider';
import { AccountService } from './additional_services/account.service';
import { TokenService } from './additional_services/token.service';
import { TransactionService } from './additional_services/transactions.service';
import PQueue from 'p-queue';

const queue = new PQueue({   interval: 1000, // 1.2 секунды между партиями
  intervalCap: 5, // 3 запроса за интервал
  concurrency: 5, // 2 параллельных запроса
  timeout: 5000  // 5 сек таймаут на запрос
  });

const pQueueProvider: Provider = {
  provide: 'P_QUEUE',
  useValue: queue
};
@Module({
  imports: [ConfigModule],
  controllers: [BlockChainController],
  providers: [BlockChainService,SolanaProvider,AccountService,TokenService,TransactionService,pQueueProvider],
  exports: [pQueueProvider]
})
export class BlockChainModule {}
