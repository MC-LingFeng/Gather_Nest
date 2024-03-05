import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { RouteMiddleware } from './route.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesPath } from './route.entities';

@Module({
  imports: [TypeOrmModule.forFeature([RoutesPath])],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouteMiddleware).forRoutes('/gather/route');
  }
}
