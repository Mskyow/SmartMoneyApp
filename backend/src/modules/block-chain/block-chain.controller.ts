import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { BlockChainService } from './block-chain.service';
interface ItxAnswer {
  tokenName: string;
  formattedDate: string;
  amountTransferred: number;
  transactionType: 'Transfer' | 'Swap' | 'Unknown';
}
@Controller('block-chain')
export class BlockChainController {
  constructor(private readonly blockChainService: BlockChainService) {}

  @Get('/test-blockchain')
  async testBlockchain(): Promise<void> {
    await this.blockChainService.testfunc();
  }
  @ApiResponse({ status: 200, type: Promise<string> })
  @UseGuards(JwtAuthGuard)
  @Post('/get-balance')
  async getBalance(
    @Body('account_address') account_address: string,
  ): Promise<string> {
    return await this.blockChainService.getAccountBalance(account_address);
  }

  @ApiResponse({ status: 200, type: Promise<ItxAnswer[]> })
  @UseGuards(JwtAuthGuard)
  @Post('get-transactions')
  async getTransactions(
    @Body('account_address') account_address: string,
  ): Promise<ItxAnswer[]> {
    try {
      if (!account_address || typeof account_address !== 'string') {
        throw new BadRequestException('Invalid wallet address');
      }
      const resp =
        await this.blockChainService.getTransactionsSignatures(account_address);
      //console.log(resp);
      return resp;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return error;
    }
  }

  @ApiResponse({ status: 200, type: Promise<any> })
  @UseGuards(JwtAuthGuard)
  @Post('/get-tokens')
  async getTokens(
    @Body('account_address') account_address: string,
  ): Promise<any> {
    return this.blockChainService.getTokensOnAccount(account_address);
  }
}
