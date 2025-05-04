import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Connection, PublicKey } from '@solana/web3.js';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { Notification } from '../notification/models/notification.model';
import { Sequelize } from 'sequelize-typescript';
import { Subscription } from '../subscribe/models/subscription.model';
import { NotificationService } from '../notification/notification.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Op } from 'sequelize';

interface SolanaPrice {
  usd: number;
}

interface SolanaPriceApiRes {
  solana: {
    usd : number
  };
}

@Injectable()
export class MonitoringService implements OnModuleInit {
  private solanaConnection: Connection;
  @Inject(CACHE_MANAGER) private readonly cacheManager: Cache;

  private readonly monitoringInterval = 5 * 60 * 1000; // 5 минут
  private readonly subscriptionsPageSize = 100; // Размер страницы для пагинации
  private readonly balanceChangeThresholdUSD = 100; // Порог изменения баланса в USD

  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: typeof Subscription,
    @InjectModel(Watchlist)
    private readonly watchlistModel: typeof Watchlist,
    private readonly notificationService: NotificationService,
    private readonly sequelize: Sequelize,
  ) {
    this.solanaConnection = new Connection(
      process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
      'confirmed',
    );
  }

  async onModuleInit() {
    this.startMonitoring();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async startMonitoring() {
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const { subscriptions, count } = await this.getActiveSubscriptions(offset);
      console.log(`Processing ${subscriptions.length} subscriptions, offset: ${offset}`);

      await Promise.all(
        subscriptions.map(async (sub) => {
          try {
            await this.checkWalletChanges(sub);
          } catch (error) {
            console.error(`Error monitoring wallet ${sub.watchlist.account_address}:`, error);
          }
        }),
      );

      offset += this.subscriptionsPageSize;
      hasMore = offset < count;
    }
  }

  private async getActiveSubscriptions(offset: number) {
    const { rows, count } = await this.subscriptionModel.findAndCountAll({
      where: { isActive: true },
      include: [{
        model: this.watchlistModel,
        attributes: ['account_address', 'account_name'],
      }],
      limit: this.subscriptionsPageSize,
      offset: offset,
    });
    return { subscriptions: rows, count };
  }

  private async checkWalletChanges(subscription: Subscription) {
    const walletAddress = subscription.watchlist.account_address;
    console.log(walletAddress);
    const publicKey = new PublicKey(walletAddress);

    // Получаем текущее состояние
    const currentBalance = await this.solanaConnection.getBalance(publicKey);
    const currentState = { balance: (currentBalance / 1e9).toFixed(7) };

    // Получаем предыдущее состояние (можно кэшировать в Redis)
    const previousState = await this.getPreviousWalletState(walletAddress);

    // Проверяем изменения
    if (previousState && currentState.balance !== previousState.balance) {
      const solanaPrice = await this.getSolanaPrice(); // Получаем цену SOL в USD
      const diffSOL = parseFloat(currentState.balance) - parseFloat(previousState.balance);
      const diffUSD = diffSOL * solanaPrice.usd;

      if (Math.abs(diffUSD) > this.balanceChangeThresholdUSD) { // Проверяем порог в USD
        await this.handleBalanceChange(
          subscription.userId,
          walletAddress,
          previousState?.balance,
          currentBalance,
          diffUSD, // Передаем diffUSD для использования в уведомлении
        );
      }
    }

    // Сохраняем текущее состояние
    await this.saveWalletState(walletAddress, currentState);
  }

  private async getPreviousWalletState(walletAddress: string): Promise<any> {
    const key = `wallet:${walletAddress}`;
    const cachedData = await this.cacheManager.get(key);
    return cachedData ? JSON.parse(cachedData as string) : null;
  }
  private async saveWalletState(walletAddress: string, state: any): Promise<void> {
    const key = `wallet:${walletAddress}`;
    await this.cacheManager.set(key, JSON.stringify(state),
      86400, // 24 часа
    );
  }

  private async handleBalanceChange(
    userId: number,
    walletAddress: string,
    oldBalance: number | null,
    newBalance: number,
    diffUSD: number, // Добавляем параметр diffUSD
  ) {
    if (oldBalance === null) return;

    const diff = newBalance - oldBalance;
    const message = `Balance changed: ${diff > 0 ? '+' : ''}${diff} SOL (${diffUSD > 0 ? '+' : ''}${diffUSD.toFixed(2)} USD) (${oldBalance} → ${newBalance})`; 

    await this.notificationService.createNotification({
      userId,
      walletAddress,
      type: 'balance_change',
      message,
      metadata: {
        oldBalance,
        newBalance,
        diff,
        diffUSD, // Добавляем diffUSD в метаданные
        currency: 'SOL',
      },
    });
  }

  private async getSolanaPrice(): Promise<SolanaPrice> {
    try {
     
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }, 
        },
      );

      if (!response.ok) { 
        throw new Error(`Failed to fetch Solana price: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const solanaPrice = data.solana.usd;

      return solanaPrice
    } catch (error) {
      console.error('Failed to fetch Solana price:', error);
      // Обработка ошибки: можно вернуть последнее известное значение из кэша,
      // или использовать константу, или выбросить ошибку, чтобы прервать текущую итерацию
      // В данном случае, возвращаем 0, чтобы не сломать логику
      return { usd: 0 };
    }
  }
}
