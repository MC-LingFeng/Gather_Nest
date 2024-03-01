import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';
import { User } from './user.entities';
import { UsersService } from './user.service';
import { UserMiddleware } from './user.middleware';

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
