import { Module } from '@nestjs/common';
import { RedisClientManagerService } from './redis-client-manager.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          store: await redisStore({
            socket: {
              host: configService.get<string>('REDIS_HOST'),
              port: configService.get<number>('REDIS_PORT'),
            },
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisClientManagerService],
  exports: [RedisClientManagerService],
})
export class RedisClientManagerModule {}
