// src/modules/monitoring/monitoring.service.ts
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


@Injectable()
export class MonitoringService implements OnModuleInit {
  private solanaConnection: Connection;
  @Inject(CACHE_MANAGER) private readonly cacheManager: Cache

  private readonly monitoringInterval = 5 * 60 * 1000; // 5 минут

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
    const activeSubscriptions = await this.getActiveSubscriptions();
    console.log(activeSubscriptions);
    for (const sub of activeSubscriptions) {
      try {
        await this.checkWalletChanges(sub);
      } catch (error) {
        console.error(`Error monitoring wallet ${sub.watchlist.account_address}:`, error);
      }
    }
  }

  private async getActiveSubscriptions() {
    return this.subscriptionModel.findAll({
      where: { isActive: true },
      include: [{
        model: this.watchlistModel,
        attributes: ['account_address', 'account_name'],
      }],
    });
  }

  private async checkWalletChanges(subscription: Subscription) {
    const walletAddress = subscription.watchlist.account_address;
    console.log(walletAddress)
    const publicKey = new PublicKey(walletAddress);
    
    // Получаем текущее состояние
    const currentBalance = await this.solanaConnection.getBalance(publicKey);
    const currentState = { balance: (currentBalance/1e9).toFixed(7) };

    // Получаем предыдущее состояние (можно кэшировать в Redis)
    const previousState = await this.getPreviousWalletState(walletAddress);

    // Проверяем изменения
    if (previousState && currentState.balance !== previousState.balance) {
      await this.handleBalanceChange(
        subscription.userId,
        walletAddress,
        previousState?.balance,
        currentBalance
      );
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
  ) {
    if (oldBalance === null) return; 

    const diff = newBalance - oldBalance;
    const message = `Balance changed: ${diff > 0 ? '+' : ''}${diff} SOL (${oldBalance} → ${newBalance})`;

    await this.notificationService.createNotification({
      userId,
      walletAddress,
      type: 'balance_change',
      message,
      metadata: {
        oldBalance,
        newBalance,
        diff,
        currency: 'SOL',
      },
    });
  }
}