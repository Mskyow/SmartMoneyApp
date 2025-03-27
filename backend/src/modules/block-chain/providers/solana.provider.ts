import PQueue from 'p-queue';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SolanaProvider {
  public connection: Connection;

     

  constructor(@Inject('P_QUEUE') private readonly requestQueue: PQueue,
  private readonly configService : ConfigService
) {
    const httpsProviderLink  = this.configService.get<string>('solana_https_provider');
    this.connection = new Connection(httpsProviderLink || "");
    
  }

  // Общий метод-обертка для всех запросов
  private async wrappedRequest<T>(fn: () => Promise<T>): Promise<any> {
    return this.requestQueue.add(fn);
  }

  // Примеры методов:
  async getSlot(): Promise<number> {
    return this.wrappedRequest(() => this.connection.getSlot());
  }

  async getAccountInfo(publicKey: PublicKey) {
    return this.wrappedRequest(() => this.connection.getAccountInfo(publicKey));
  }

  async getSignaturesForAddress(address: string, limit: number) {
    const publicKey = new PublicKey(address);
    return this.wrappedRequest(() => 
      this.connection.getSignaturesForAddress(publicKey, { limit })
    );
  }

  async getTransaction(signature: string) {
    return this.wrappedRequest(() => 
      this.connection.getTransaction(signature, {
        commitment: 'finalized',
        maxSupportedTransactionVersion: 0,
      })
    );
  }

  async getBalance(address: string) {
    const publicKey = new PublicKey(address);
    return this.wrappedRequest(() => this.connection.getBalance(publicKey));
  }

  async getParsedTokenAccountsByOwner(address: string) {
    const publicKey = new PublicKey(address);
    return this.wrappedRequest(() =>
      this.connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      })
    );
  }
}