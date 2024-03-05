// src/logical/auth/auth.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { decrypt, stringToBuffer } from 'src/helper/ase';
import { UserType } from '../type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
      return { code: 200, msg: '登录成功', user: nowUser };
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
