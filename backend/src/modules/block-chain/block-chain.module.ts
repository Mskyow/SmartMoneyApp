import { Module } from '@nestjs/common';
import { BlockChainController } from './block-chain.controller';
import { BlockChainService } from './block-chain.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [BlockChainController],
  providers: [BlockChainService],
})
export class BlockChainModule {}
