// src/redis/redis.module.ts
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('redis_host'),
        port: configService.get('redis_port'),
        password: configService.get('redis_password'),
        ttl: configService.get('cache_ttl') || 3600, 
        isGlobal: true,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}