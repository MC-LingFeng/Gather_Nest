import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './register.controller';
import { LoginController } from './login.controller';
import { User } from '../../entities/user.entities';
import { UsersService } from '../../service/user.service';
import { UserMiddleware } from '../../middleware/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController, LoginController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('/gather/register', '/gather/login');
  }
}
