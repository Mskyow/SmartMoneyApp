// src/modules/user/models/user.model.ts
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Notification } from 'src/modules/notification/models/notification.model';
import { Subscription } from 'src/modules/subscribe/models/subscription.model';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];

  @HasMany(() => Subscription, {
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