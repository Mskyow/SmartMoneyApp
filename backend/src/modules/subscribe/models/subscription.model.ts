// src/modules/subscription/models/subscription.model.ts
import { Column, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table({ tableName: 'Subscriptions' })
export class Subscription extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Watchlist, {
    foreignKey: 'watchlistId', // Явно указываем foreignKey
  })
  watchlist: Watchlist;

  @ForeignKey(() => Watchlist)
  @Column
  watchlistId: number;


  @Column({ defaultValue: false })
  isActive: boolean;

  // Исправлено: явное преобразование массива в JSON строку
  @Column({ 
    type: 'jsonb', 
    defaultValue: JSON.stringify(['balance']) 
  })
  monitoredFields: string[];

  // Исправлено: явное преобразование массива в JSON строку
  @Column({ 
    type: 'jsonb', 
    defaultValue: JSON.stringify(['email', 'inApp']) 
  })
  notificationPreferences: string[];

  @Column({ defaultValue: false })
  notifyOnBalanceChange: boolean;

  @Column({ defaultValue: false })
  notifyOnNewTransaction: boolean;
}