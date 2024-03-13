import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RedisCacheService } from '../db/redis-cache.service';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  @Inject(RedisCacheService)
  private readonly redis: RedisCacheService;

  async canActivate(context: ExecutionContext) {
    const request = super.getRequest(context);
    const token = request.header('authorization');
    let user: any = {};
    try {
      const strings = token.split('.');
      const userinfo = JSON.parse(
        decodeURIComponent(
          escape(atob(strings[1].replace(/-/g, '+').replace(/_/g, '/'))),
        ),
      );
      user = userinfo;
      // this.handleRequest(false, userinfo, token);
    } catch (err) {
      this.handleRequest(true, true, token);
    }
    const getToken = await this.redis.get(user.username);

    if (!getToken) {
      this.handleRequest(true, true, token);
    }

    return true;
  }

  handleRequest(err, user, token) {
    console.log(err, user, token);
    // 您可以基于 "info" 或 "err" 参数抛一个错误
    if (err || !user) {
      throw new HttpException(
        { code: 401, data: null, message: '无权限' },
        200,
      );
    }
    return user;
  }
}
