import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';
import { ThemeMiddleware } from './theme.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Themes } from './theme.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Themes])],
  controllers: [ThemeController],
  providers: [ThemeService],
  exports: [ThemeService],
})
export class ThemeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ThemeMiddleware).forRoutes('/gather/theme');
  }
}
