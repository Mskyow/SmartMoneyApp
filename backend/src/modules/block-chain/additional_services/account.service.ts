import { Injectable } from '@nestjs/common';
import { SolanaProvider } from '../providers/solana.provider';
import pLimit from 'p-limit';
import { TokenService } from './token.service';

@Injectable()
export class AccountService {
  constructor(private readonly solanaProvider: SolanaProvider,
    private readonly tokenService: TokenService
  ) {}

  async getAccountBalance(walletAddress: string): Promise<string> {
    const balance = await this.solanaProvider.getBalance(walletAddress);
    if (balance === 0) return '0.0000000';
    return (balance / 1e9).toFixed(7);
  }

  async getTokensOnAccount(walletAddress: string): Promise<any> {
    const limit = pLimit(3);
    const tokenAccounts = await this.solanaProvider.getParsedTokenAccountsByOwner(walletAddress);
    const tokens = await Promise.all(
      tokenAccounts.value.map(({ account }) => limit(async () => {
        const tokenAmount = account.data.parsed.info.tokenAmount;
        if(tokenAmount.uiAmount>0){
        const mint = account.data.parsed.info.mint;
        const tokenMetadata = await this.tokenService.getTokenMetadata(mint);
        return { ...tokenMetadata, ...tokenAmount };}
        else return null;
      }))
    );

    //console.log(tokens)
    return tokens.filter((item)=>{return item !== null})
  }
}