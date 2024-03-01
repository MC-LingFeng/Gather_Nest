import { Controller, Post, Body, HttpException } from '@nestjs/common';
// import { CatsService } from '../../service/user.service';
import { UsersService } from 'src/service/user.service';
import { decrypt, stringToBuffer } from 'src/helper/ase';
@Controller('gather')
export class LoginController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  async loginPost(@Body() body) {
    const nowUser = this.userService.getUser();
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
      return '登录成功！';
    } else {
      throw new HttpException(
        { code: 101, message: '密码错误！', data: '密码错误！' },
        200,
      );
    }
  }
}
