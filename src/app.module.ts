import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entities';
import { Themes } from './theme/theme.entities';
import { UsersModule } from './user/user.module';
import { AuthService } from './user/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RouteModule } from './route/route.module';
import { RoutesPath } from './route/route.entities';
import { ThemeModule } from './theme/theme.module';
import { OpenAiModule } from './openai/openai.module';
import { RedisCacheModule } from './db/redis-cache.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { jwtConstants } from './user/auth/constants';
import { WordModule } from './word/word.module';
import { Word } from './word/word.entities';

const env = path.basename('/env');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nishishabi1999',
      database: 'gather_data',
      entities: [User, RoutesPath, Themes, Word],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      // 指定存储环境变量的文件, 靠前的文件拥有较高的优先级
      envFilePath: [`${env}/.env.${process.env.NODE_ENV}`],
      // envFilePath,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100y' }, // token 过期时效
    }),
    UsersModule,
    RouteModule,
    ThemeModule,
    OpenAiModule,
    RedisCacheModule,
    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
