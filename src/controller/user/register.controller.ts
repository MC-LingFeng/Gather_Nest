import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../service/user.service';
import { User } from '../../entities/user.entities';
@Controller('gather')
export class RegisterController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async getssss(@Body() body) {
    console.log(typeof body);
    const getItem = await this.usersService.findOneForName(
      body?.username ?? '',
    );

    return {
      item: getItem,
    };
  }
}
