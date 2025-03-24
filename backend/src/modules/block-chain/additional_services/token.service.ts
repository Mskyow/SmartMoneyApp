import { Injectable } from '@nestjs/common';
import { SolanaProvider } from '../providers/solana.provider';
import { ConfigService } from '@nestjs/config';
import { PublicKey } from '@solana/web3.js';

export interface ITokenMetadata {
    name: string;
    symbol: string;
    image: string;
  }

@Injectable()
export class TokenService {
    private METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
  constructor(
    private readonly solanaProvider: SolanaProvider,
    private readonly configService: ConfigService,
  ) {}

  async getTokenName(mintAddress: string): Promise<string> {
    if (!mintAddress) return 'Unknown Token';

    try {
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${this.configService.get<string>('helius_api_key')}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": "text",
          "method": "getAsset",
          "params": { id: mintAddress },
        }),
      });
      const data = await response.json();
      return data.result.content.metadata.symbol || "Unknown Token";
    } catch (error) {
      console.error('Failed to fetch token name:', error);
      return 'Unknown Token';
    }
  }

  async getTokenMetadata(mint: string): Promise<ITokenMetadata | null> {
    const mintPublicKey = new PublicKey(mint);
    const [metadataPDA] = await PublicKey.findProgramAddress(
      [Buffer.from('metadata'), this.METADATA_PROGRAM_ID.toBuffer(), mintPublicKey.toBuffer()],
      this.METADATA_PROGRAM_ID,
    );

    const accountInfo = await this.solanaProvider.getAccountInfo(metadataPDA);
    if (!accountInfo) return null;

    const data = accountInfo.data;
    let offset = 1 + 32 + 32;

    const nameLength = data.readUInt32LE(offset);
    offset += 4;
    const name = data.slice(offset, offset + nameLength).toString('utf-8');
    offset += nameLength;

    const symbolLength = data.readUInt32LE(offset);
    offset += 4 + symbolLength;

    const uriLength = data.readUInt32LE(offset);
    offset += 4;
    const metadataUrl = data.slice(offset, offset + uriLength).toString('utf-8');

    const normalizeIpfsUrl = metadataUrl.replace('cf-ipfs.com', 'ipfs.io');
    const response = await fetch(normalizeIpfsUrl);
    const json = await response.json();

    return {
      name: json.name,
      symbol: json.symbol,
      image: json.image,
    };
  }
}