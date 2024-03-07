import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';
import { User } from './user.entities';
import { UsersService } from './user.service';
import { UserMiddleware } from './user.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { RedisCacheModule } from 'src/db/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100y' }, // token 过期时效
    }),
    RedisCacheModule,
  ],
  controllers: [RegisterController, LoginController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [AuthService, UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('/gather/register', '/gather/login');
  }
}
