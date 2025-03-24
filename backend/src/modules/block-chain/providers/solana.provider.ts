import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class SolanaProvider {
  public connection: Connection;

  constructor(private readonly configService: ConfigService) {
    const httpsProviderLink = this.configService.get<string>('solana_https_provider');

    if (!httpsProviderLink) {
      throw new BadRequestException(AppError.SOLANA_HTTPS_PROVIDER_UNDEFIND);
    }

    this.connection = new Connection(httpsProviderLink);
  }

  async getSlot(): Promise<number> {
    return this.connection.getSlot();
  }

  async getSignaturesForAddress(address: string, limit: number) {
    const publicKey = new PublicKey(address);
    return this.connection.getSignaturesForAddress(publicKey, { limit });
  }

  async getTransaction(signature: string) {
    return this.connection.getTransaction(signature, {
      commitment: 'finalized',
      maxSupportedTransactionVersion: 0,
    });
  }

  async getAccountInfo(publicKey: PublicKey) {
    return this.connection.getAccountInfo(publicKey);
  }

  async getBalance(address: string) {
    const publicKey = new PublicKey(address);
    return this.connection.getBalance(publicKey);
  }

  async getParsedTokenAccountsByOwner(address: string) {
    const publicKey = new PublicKey(address);
    return this.connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });
  }
}