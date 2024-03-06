// src/logical/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserType } from '../type';
import { AuthService } from './auth.service';
import { RedisCacheService } from 'src/db/redis-cache.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly redis: RedisCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: UserType) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    const redisItem: TokenItemType = await this.redis.get(payload.username);
    if (redisItem === null) {
      return false;
    }
    const redisItemDate = new Date(redisItem.create_time);
    const nowDate = new Date();
    const diff = nowDate.getTime() - redisItemDate.getTime();

    if (diff > Number(redisItem.time) * 1000) {
      await this.redis.del(payload.username);
      return false;
    }

    return payload;
  }
}
