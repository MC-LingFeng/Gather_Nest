import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './register.controller';
import { User } from '../../entities/user.entities';
import { UsersService } from '../../service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [UsersService],
})
export class UsersModule {}
