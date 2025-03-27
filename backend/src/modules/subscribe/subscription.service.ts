// src/modules/subscription/subscribe.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
import { Watchlist } from '../watchlist/models/watchlist.model';

import { Sequelize } from 'sequelize-typescript';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './DTO';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: typeof Subscription,
    @InjectModel(Watchlist)
    private readonly watchlistModel: typeof Watchlist,
    private readonly sequelize: Sequelize,
  ) {}

  async create(userId : number ,createSubscriptionDto: CreateSubscriptionDto) {
    const { walletAddress, ...subscriptionData } = createSubscriptionDto;

    return this.sequelize.transaction(async transaction => {
      // Находим или создаем запись в watchlist
      const [watchlistItem] = await this.watchlistModel.findOrCreate({
        where: { userId, account_address: walletAddress },
        defaults: {
          userId,
          account_address: walletAddress,
          account_name: `Wallet ${walletAddress.slice(0, 6)}...`,
        },
        transaction,
      });

      // Создаем подписку
      return this.subscriptionModel.create({
        userId,
        watchlistId: watchlistItem.id,
        ...subscriptionData,
      }, { transaction });
    });
  }

  async remove(id: number) {
    const subscription = await this.subscriptionModel.findByPk(id);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    await subscription.destroy();
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionModel.findByPk(id);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription.update(updateSubscriptionDto);
  }

  async findByUserId(userId: number) {
    return this.subscriptionModel.findAll({ 
      where: { userId },
      include: [{
        association: 'watchlist',
        attributes: ['account_address', 'account_name'],
      }]
    });
  }

  async findByWalletAddress(walletAddress: string) {
    return this.subscriptionModel.findAll({
      include: [{
        association: 'watchlist',
        where: { account_address: walletAddress },
        attributes: [],
      }]
    });
  }

  async getActiveSubscriptions() {
    return this.subscriptionModel.findAll({
      where: { isActive: true },
      include: ['watchlist', 'user'],
    });
  }
}