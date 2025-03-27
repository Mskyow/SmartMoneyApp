import { Injectable } from '@nestjs/common';
import { SolanaProvider } from '../providers/solana.provider';
import pLimit from 'p-limit';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';
import { IFungibleTokensListObject } from './types/types';

@Injectable()
export class AccountService {
  constructor(private readonly solanaProvider: SolanaProvider,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async getAccountBalance(walletAddress: string): Promise<string> {
    const balance = await this.solanaProvider.getBalance(walletAddress);
    if (!balance) return '0.0000000';
    return (balance / 1e9).toFixed(7);
  }

  async getTokensOnAccount(walletAddress: string): Promise<any> {
    const limit = pLimit(5);
    const tokenAccounts = await this.solanaProvider.getParsedTokenAccountsByOwner(walletAddress);
    const tokens = await Promise.all(
      tokenAccounts.value.map(({ account }) => limit(async () => {
        const tokenAmount = account.data.parsed.info.tokenAmount;
        if(tokenAmount.uiAmount>0){ // отсеиваем где на аккунте этого токена 0
        const mint = await account.data.parsed.info.mint;
        const price = await this.tokenService.getTokenPrice2(mint);
        const tokenMetadata = await this.tokenService.getTokenMetadata(mint);
        return {price, ...tokenMetadata, ...tokenAmount };}
        else return null;
      }))
    );

    //console.log(tokens)
    return tokens.filter((item)=>{return item !== null})
  }

  async getFungibleTokensOnAccountHelius(walletAddress: string): Promise<any> {
    try {
      const response = await fetch(
        `https://mainnet.helius-rpc.com/?api-key=${this.configService.get<string>('helius_api_key')}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'searchAssets',
            params: {
              ownerAddress: walletAddress,
              tokenType: 'fungible',
            },
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const tokens = data.result.items.map((item: any) => {
        const decimals = item.token_info?.decimals || 0;
        const rawBalance = item.token_info?.balance || 0;
        const realBalance = rawBalance / Math.pow(10, decimals);
  
        return {
          id: item.id,
          name: item.content?.metadata?.name || 'Unknown',
          symbol: item.content?.metadata?.symbol || 'UNKNOWN',
          decimals: decimals,
          balance: realBalance,
          rawBalance: rawBalance,
          pricePerToken: item.token_info?.price_info?.price_per_token || null,
          totalValue: item.token_info?.price_info?.total_price || null,
          currency: item.token_info?.price_info?.currency || null,
          tokenProgram: item.token_info?.token_program || null,
          associatedTokenAddress: item.token_info?.associated_token_address || null,
          image: item.content?.links?.image || item.content?.files?.[0]?.uri || null,
          metadataUri: item.content?.json_uri || null,
          tokenStandard: item.content?.metadata?.token_standard || null,
          extensions: item.mint_extensions || null,
        };
      });
  
      const filteredTokens = tokens.filter((token: any) => token.rawBalance > 0);
  
      const totalAccountValue = filteredTokens.reduce((sum: number, token: IFungibleTokensListObject) => sum + (token.totalValue || 0), 0);

      const tokensWithPercentage = tokens.map((token: IFungibleTokensListObject) => ({
        ...token,
        percentage: token.totalValue ? (token.totalValue / totalAccountValue) * 100 : null,
      }));
      
      return {
        total: data.result.total,
        tokens: tokensWithPercentage,
      };
    } catch (err) {
      console.error('Error fetching tokens from Helius:', err);
      throw err; // Пробрасываем ошибку для обработки выше
    }
  }
}
  
