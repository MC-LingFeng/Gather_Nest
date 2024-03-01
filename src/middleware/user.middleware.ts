import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRegisterBody } from 'src/controller/user/type';
import { UsersService } from 'src/service/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const body: UserRegisterBody = req.body;
    const getItem = await this.usersService.findOneForName(
      body?.username ?? '',
    );
    const register = req.baseUrl.indexOf('register') !== -1;
    const login = req.baseUrl.indexOf('login') !== -1;

    if (register) {
      if (!getItem) {
        next();
      } else {
        throw new HttpException(
          { message: '用户名重复', code: 201, data: null },
          200,
        );
      }
    } else if (login) {
      console.log('login');

      if (!getItem) {
        throw new HttpException(
          { message: '用户名输入有误!', code: 201, data: null },
          200,
        );
      } else {
        this.usersService.setUser([getItem]);
        next();
      }
    }
  }
}
