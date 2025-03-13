import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import {
  Connection,
  PublicKey,
  ConfirmedSignatureInfo,
  VersionedTransactionResponse,
  GetProgramAccountsResponse,
} from '@solana/web3.js';
import pLimit from 'p-limit';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class BlockChainService {
  private solana: Connection;
  private METADATA_PROGRAM_ID =  new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'); 
  constructor(private readonly configService: ConfigService) {
    const httpsProviderLink: string | undefined =
      this.configService.get<string>('solana_https_provider');

    if (!httpsProviderLink) {
      throw new BadRequestException(AppError.SOLANA_HTTPS_PROVIDER_UNDEFIND);
    }

    this.solana = new web3.Connection(httpsProviderLink);
 
  }

  async testfunc(): Promise<void> {
    try {
      const slot = await this.solana.getSlot();
      console.log(slot);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getTransctionsSignatures(
    walletAddress: string,
  ): Promise<{
    tokenName: string;
    formattedDate: string;
    amountTransferred: number;
    transactionType: 'Transfer' | 'Swap' | 'Unknown';
  }[]> {
    try {
      if (!walletAddress) {
        throw new BadRequestException('Wallet address is required');
      }
  
      const publicKey = new PublicKey(walletAddress);
      const signatures: ConfirmedSignatureInfo[] = await this.solana.getSignaturesForAddress(publicKey, {
        limit: 60,
      });
  
      if (signatures.length === 0) {
        throw new BadRequestException(AppError.GET_ALL_TRANSACIONS_NULL);
      }
  
      return await this.getTransactSignatureInfo(signatures);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getTransactSignatureInfo(
    signatures: ConfirmedSignatureInfo[],
  ): Promise<{
    tokenName: string;
    formattedDate: string;
    amountTransferred: number;
    transactionType: 'Transfer' | 'Swap' | 'Unknown';
  }[]> {
    try {
      const transactions = await Promise.all(
        signatures.map(async (tx) => {
          if (!tx.signature) {
            throw new Error('Transaction signature is missing');
          }
  
          const transaction = await this.solana.getTransaction(tx.signature, {
            commitment: 'finalized',
            maxSupportedTransactionVersion: 0,
          });
          if (!transaction) {
            return null;
          }
  
          function formatDate(date : Date) {
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
            const day = String(date.getUTCDate()).padStart(2, '0');
            const year = date.getUTCFullYear();
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`; }
          const formattedDate = transaction.blockTime ? formatDate(new Date(transaction.blockTime * 1000)) : 'Unknown Date';
          // console.log(transaction.meta?.postTokenBalances)
          const mintAddress = transaction.meta?.postTokenBalances?.[0]?.mint || 'Unknown Mint'
          if (!mintAddress || mintAddress === 'Unknown Mint') {
          return null;
          }
          const preBalance = parseFloat(
            transaction.meta?.preTokenBalances?.[0]?.uiTokenAmount?.uiAmountString || '0',
          );
          const postBalance = parseFloat(
            transaction.meta?.postTokenBalances?.[0]?.uiTokenAmount?.uiAmountString || '0',
          );
          const amountTransferred = preBalance - postBalance;
  
          let transactionType: 'Transfer' | 'Swap' | 'Unknown' = 'Unknown';

          if (transaction.meta?.logMessages) {
            const logs = transaction.meta.logMessages;

            // Проверка на Transfer
            const isTransfer = logs.some((log: string) =>
              /Instruction: (Transfer|TransferChecked|TransferToken)/i.test(log)
            );

            // Проверка на Swap
            const isSwap = logs.some((log: string) =>
              /Instruction: (Swap|Exchange)/i.test(log)
            );

            if (isTransfer) {
              transactionType = 'Transfer';
            } else if (isSwap) {
              transactionType = 'Swap';
            } else {
              // Дополнительная проверка по изменениям балансов
              const preBalances = transaction.meta.preTokenBalances || [];
              const postBalances = transaction.meta.postTokenBalances || [];

            if (preBalances.length > 0 && postBalances.length > 0) {
              const balanceChanges = preBalances.map((pre, index) => {
                const post = postBalances[index];
                return {
                  mint: pre.mint,
                  change: (post.uiTokenAmount.uiAmount || 0) - (pre.uiTokenAmount.uiAmount || 0),
                };
              });

              // Если один токен уменьшился, а другой увеличился, это может быть Swap
              const hasPositiveChange = balanceChanges.some((change) => change.change > 0);
              const hasNegativeChange = balanceChanges.some((change) => change.change < 0);

              if (hasPositiveChange && hasNegativeChange) {
                transactionType = 'Swap';
              } else if (hasNegativeChange) {
                transactionType = 'Transfer';
              }
            }
          }
        }
  
          const tokenName = await this.getTokenName(mintAddress);
  
          return {
            tokenName,
            formattedDate,
            amountTransferred,
            transactionType,
          };
        }),
      );
      // Фильтруем null-значения
      return transactions.filter((tx) => tx !== null) as {
        tokenName: string;
        formattedDate: string;
        amountTransferred: number;
        transactionType: 'Transfer' | 'Swap' | 'Unknown';
      }[];
    } catch (error) {
      throw new Error(String(error));
    }
  }
  
  async getTokenName(mintAddress: string): Promise<string> {
    if (!mintAddress) {
      return 'Unknown Token';
    }
  
    try {
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${this.configService.get<string>('helius_api_key')}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": "text",
            "method": "getAsset",
            "params": { id: mintAddress}
        }),
    })
    const data = await response.json();
     return await data.result.content.metadata.symbol || "Unknown Token"
    } catch (error) {
      console.error('Failed to fetch token name:', error);
      return 'Unknown Token';
    }
  }
  
  async  getTokenMetadata(mint: string): Promise<{ name: string; symbol:string, image: string } | null> {
    const mintPublicKey = new PublicKey(mint);
  
    // Вычисляем PDA (предсказуемый адрес) для метаданных
    const [metadataPDA] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        this.METADATA_PROGRAM_ID.toBuffer(),
        mintPublicKey.toBuffer(),
      ],
      this.METADATA_PROGRAM_ID
    );
  
    const accountInfo = await this.solana.getAccountInfo(metadataPDA);
    if (!accountInfo) return null;
  
  
    const data = accountInfo.data;
    let offset = 1 + 32 + 32; // Пропускаем key (1 байт) + update_authority (32) + mint (32)
  
    // 3. Читаем длину `name` (4 байта) + само имя
    const nameLength = data.readUInt32LE(offset);
    offset += 4;
    const name = data.slice(offset, offset + nameLength).toString('utf-8');
    offset += nameLength;
  
    // 4. Читаем длину `symbol` (4 байта) + сам символ
    const symbolLength = data.readUInt32LE(offset);
    offset += 4 + symbolLength; // Пропускаем символ
  
    // 5. Читаем длину `uri` (4 байта) + сам URI
    const uriLength = data.readUInt32LE(offset);
    offset += 4;
    const metadataUrl = data.slice(offset, offset + uriLength).toString('utf-8');
  
    
    const normalizeIpfsUrl = metadataUrl.replace('cf-ipfs.com', 'ipfs.io')
    console.log('Метаданные токена хранятся тут:', normalizeIpfsUrl);

    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await fetch(normalizeIpfsUrl);
    const json = await response.json();
  
    return {
      name: json.name,
      symbol : json.symbol,
      image: json.image,
    };
  }
  
  async getAccountBalance (walletAddress:string):Promise<string>{
    const address = new PublicKey(walletAddress);
    const balance = await this.solana.getBalance(address);
    if (balance === 0) {
      return '0.0000000';
    }
    const balanceInSol = balance / 1e9;
    return balanceInSol.toFixed(7);
  }

  async getTokensOnAccount (walletAddress:string):Promise<any>{
    const limit = pLimit(5); // Ограничиваем количество одновременных запросов до 5
    const address  = new PublicKey(walletAddress);
    const tokenAccounts = await this.solana.getParsedTokenAccountsByOwner(address, {
      programId: TOKEN_PROGRAM_ID});

      const tokens = await Promise.all(
        tokenAccounts.value.map(({ account }) => limit(async () => {
          const tokenAmount = account.data.parsed.info.tokenAmount;
          if(tokenAmount.uiAmount>0){
          const mint = account.data.parsed.info.mint;
          const tokenMetadata = await this.getTokenMetadata(mint);
          return { tokenMetadata, tokenAmount };}
          else return null;
        }))
      );

    console.log(tokens)
    return tokens
  }
}


