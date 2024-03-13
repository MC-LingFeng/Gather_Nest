import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('gather')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginPost(@Body() body) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(body);

    switch (authResult.code) {
      case 200:
        return this.authService.certificate(authResult.user);
      case 101:
        throw new HttpException(
          { code: 101, message: '密码错误！', data: '密码错误！' },
          200,
        );
      default:
        throw new HttpException(
          { code: 101, message: '登录失败', data: '登录失败！' },
          200,
        );
    }
  }
}
