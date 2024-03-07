import { Injectable } from '@nestjs/common';

import { Redis } from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(private readonly redis: Redis) {}
  // 获取redis
  async get(key: string) {
    const res = await this.redis.get(key);
    return JSON.parse(res);
  }

  // 设置redis
  async set(
    key: string,
    value: string | Record<string, string | number>,
    scends: number,
  ) {
    return await this.redis.set(key, JSON.stringify(value), 'EX', scends);
  }

  // 删除redis
  async del(key: string) {
    return await this.redis.del(key);
  }
}
