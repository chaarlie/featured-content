import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import * as crypto from 'crypto';

@Injectable()
export class RedisClientManagerService {
  constructor(@Inject(CACHE_MANAGER) public cache: RedisCache) {}

  generateCacheKey<T>(ob: T extends object ? T : never) {
    const sortedOb = Object.keys(ob)
      .sort()
      .reduce((acc, key) => {
        acc[key] = ob[key];
        return acc;
      }, {});

    const stringifiedOb = JSON.stringify(sortedOb);

    return crypto.createHash('sha256').update(stringifiedOb).digest('hex');
  }
}
