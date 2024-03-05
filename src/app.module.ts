import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entities';
import { UsersModule } from './user/user.module';
import { AuthService } from './user/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RouteModule } from './route/route.module';
import { RoutesPath } from './route/route.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nishishabi1999',
      database: 'gather_data',
      entities: [User, RoutesPath],
      synchronize: false,
    }),
    UsersModule,
    RouteModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
