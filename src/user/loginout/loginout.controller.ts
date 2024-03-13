import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { RedisCacheService } from '../../db/redis-cache.service';
@Controller('gather')
export class LoginOutController {
  constructor(private readonly redis: RedisCacheService) {}

  @Post('loginout')
  async loginoutPost(@Body() body) {
    const redisItem = await this.redis.get(body?.username ?? '');
    if (!redisItem) {
      return '用户已经过期';
    }
    try {
      await this.redis.del(body.username);
    } catch (err) {
      console.log('loginout', err);
      throw new HttpException({ code: 201, message: '错误' }, 200);
    }

    return null;
  }
}
