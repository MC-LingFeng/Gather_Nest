// src/logical/auth/auth.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { decrypt, stringToBuffer } from 'src/helper/ase';
import { UserType } from '../type';
import { RedisCacheService } from 'src/db/redis-cache.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisCacheService,
    private readonly configService: ConfigService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(body: {
    username: string;
    password: string;
  }): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const nowUser = this.usersService.getUser();
    const stringList = [
      nowUser[0].password_encrypted,
      nowUser[0].password_tag,
      nowUser[0].password_key,
      nowUser[0].password_vector,
      nowUser[0].password_algorithm,
    ];
    const buffer = stringToBuffer(stringList);
    const password = decrypt(buffer);

    if (body.password === password) {
      return { code: 200, msg: '登录成功', user: nowUser[0] };
    } else {
      return { code: 101, msg: '密码错误', user: null };
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: UserType) {
    const payload = {
      username: user.username,
      userId: user.user_id,
      grade: user.grade,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    const token = this?.jwtService?.sign(payload);

    if (token) {
      await this.redis.set(
        user.username,
        {
          token,
          user_id: user.user_id,
          username: user.username,
          grade: user.grade,
          time: this.configService.get('TOKEN_TIME'),
          create_time: new Date().toJSON(),
        },
        Number(this.configService.get('TOKEN_TIME')),
      );
      return {
        token,
        ...payload,
      };
    } else {
      throw new HttpException(
        { code: 101, message: '密码错误！', data: '密码错误！' },
        200,
      );
    }
  }
}
