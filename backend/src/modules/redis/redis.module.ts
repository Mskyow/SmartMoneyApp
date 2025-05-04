// src/redis/redis.module.ts
import { Cache, CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
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
  providers: [
    {
      provide: 'REDIS_CONNECTION_CHECK',
      useFactory: async (cacheManager: Cache) => {
        const logger = new Logger('RedisModule');
        try {
          
          logger.log('Redis connection established successfully');
        } catch (error) {
          logger.error('Failed to connect to Redis', error.stack);
          throw error;
        }
      },
      inject: [CACHE_MANAGER],
    },
  ],
  exports: [CacheModule],
})
export class RedisModule {}