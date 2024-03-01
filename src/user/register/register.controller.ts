import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../user.service';
import { encryption, bufferToString } from 'src/helper/ase';
import { UserType } from '../type';
@Controller('gather')
export class RegisterController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerPost(@Body() body) {
    const encryptionList = encryption(body.password);
    const stringEncrypt = bufferToString(encryptionList);
    const values: UserType = {
      username: body.username,
      password_encrypted: stringEncrypt[0],
      password_tag: stringEncrypt[1],
      password_key: stringEncrypt[2],
      password_vector: stringEncrypt[3],
      password_algorithm: stringEncrypt[4],
      grade: 0,
    };
    await this.usersService.create(values);

    return null;
  }
}
