import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  HttpException,
  // CanActivate, ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { Observable } from 'rxjs';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
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
