import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BlockChainService } from './block-chain.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('block-chain')
export class BlockChainController {
  constructor(private readonly blockChainService: BlockChainService) {}

  @Get('/test-blockchain')
  async testBlockchain(): Promise<void> {
    await this.blockChainService.testfunc();
  }

  @UseGuards(JwtAuthGuard)
  @Post('get-transactions')
  async getTransactions(
    @Body() body: { walletAddress: string },
  ): Promise<void> {
    if (!body || typeof body.walletAddress !== 'string') {
      throw new Error('Invalid wallet address');
    }

    console.log(body.walletAddress);

    try {
      await this.blockChainService.getTransctionsSignatures(body.walletAddress);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
}
