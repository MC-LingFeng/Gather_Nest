import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  HttpException,
  // CanActivate, ExecutionContext,
  Injectable,
} from '@nestjs/common';
// import { Observable } from 'rxjs';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = super.getRequest(context);
    // console.log(request);

    // console.log();
    const token = request.header('authorization');
    try {
      const strings = token.split('.');
      const userinfo = JSON.parse(
        decodeURIComponent(
          escape(atob(strings[1].replace(/-/g, '+').replace(/_/g, '/'))),
        ),
      );
      console.log(12);
      this.handleRequest(false, userinfo, token);
    } catch (err) {
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
