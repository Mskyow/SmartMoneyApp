// src/modules/watchlist/models/watchlist.model.ts
import { Column, ForeignKey, Model, Table, BelongsTo, HasMany, Index } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { Notification } from 'src/modules/notification/models/notification.model';
import { Subscription } from 'src/modules/subscribe/models/subscription.model';

@Table({tableName: 'Watchlist'})
export class Watchlist extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  @Index
  account_address: string;

  @Column
  account_name: string;

  @Column
  profile_image: string;

  @HasMany(() => Subscription, {
    foreignKey: 'watchlistId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  subscriptions: Subscription[];

  @HasMany(() => Notification, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notifications: Notification[];
}