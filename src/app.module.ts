import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entities';
import { Themes } from './theme/theme.entities';
import { UsersModule } from './user/user.module';
import { AuthService } from './user/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RouteModule } from './route/route.module';
import { RoutesPath } from './route/route.entities';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nishishabi1999',
      database: 'gather_data',
      entities: [User, RoutesPath, Themes],
      synchronize: false,
    }),
    UsersModule,
    RouteModule,
    ThemeModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
