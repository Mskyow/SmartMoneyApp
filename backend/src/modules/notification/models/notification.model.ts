// src/modules/notification/models/notification.model.ts
import { Column, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table({ tableName: 'Notifications' })
export class Notification extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Watchlist)
  @Column
  watchlistId: number;

  @BelongsTo(() => Watchlist)
  watchlist: Watchlist;

  @Column
  type: string; // 'balance_change', 'new_transaction', 'token_activity'

  @Column
  message: string;

  @Column({ defaultValue: false })
  isRead: boolean;

  @Column({ type: 'json' })
  metadata: Record<string, unknown>; // или конкретный интерфейс
 // Дополнительные данные: oldBalance, newBalance, txHash и т.д.

  @Column
  triggeredAt: Date;
}