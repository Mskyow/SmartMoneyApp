import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as web3 from '@solana/web3.js';
import {
  Connection,
  PublicKey,
  ConfirmedSignatureInfo,
  VersionedTransactionResponse,
} from '@solana/web3.js';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class BlockChainService {
  private solana: Connection;

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

  async getTransctionsSignatures(walletAddress: string): Promise<void> {
    try {
      if (!walletAddress) {
        throw new BadRequestException('Wallet address is required');
      }

      console.log(walletAddress);

      const publicKey = new PublicKey(walletAddress);
      const signatures: ConfirmedSignatureInfo[] =
        await this.solana.getSignaturesForAddress(publicKey, {
          limit: 10,
        });

      console.log('Signatures:', signatures);

      if (signatures.length > 0) {
        await this.getTransactSignatureInfo(signatures);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getTransactSignatureInfo(
    signatures: ConfirmedSignatureInfo[],
  ): Promise<VersionedTransactionResponse[]> {
    try {
      const transactions = await Promise.all(
        signatures.map(async (tx) => {
          if (!tx.signature) {
            throw new Error('Transaction signature is missing');
          }

          return await this.solana.getTransaction(tx.signature, {
            commitment: 'finalized',
            maxSupportedTransactionVersion: 0,
          });
        }),
      );

      console.log('Transactions:', transactions);

      return transactions.filter(
        (tx): tx is VersionedTransactionResponse => tx !== null,
      );
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
