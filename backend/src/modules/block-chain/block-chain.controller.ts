import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BlockChainService } from './block-chain.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { VersionedTransactionResponse } from '@solana/web3.js';

@Controller('block-chain')
export class BlockChainController {
  constructor(private readonly blockChainService: BlockChainService) {}

  @Get('/test-blockchain')
  async testBlockchain(): Promise<void> {
    await this.blockChainService.testfunc();
  }

  @UseGuards(JwtAuthGuard)
  @Post('get-transactions')
  async getTransactions (
   @Body('account_address') account_address: string, 
  ):  Promise<{
    tokenName: string;
    formattedDate: string;
    amountTransferred: number;
    transactionType: 'Transfer' | 'Swap' | 'Unknown';
  }[]> {
    try {
      if (!account_address || typeof account_address !== 'string') {
        throw new BadRequestException('Invalid wallet address');
      }
      const resp = await this.blockChainService.getTransctionsSignatures(account_address);
      await console.log(resp);
      return resp
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return error
    }
  }
}
