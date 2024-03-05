import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ThemeService } from './theme.service';

@Injectable()
export class ThemeMiddleware implements NestMiddleware {
  constructor(private readonly themeService: ThemeService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const getItem = (await this.themeService.findAll()) ?? [];

    if (getItem.length > 0) {
      this.themeService.set(getItem);
      next();
    } else {
      throw new HttpException(
        { message: '暂无数据', code: 404, data: null },
        200,
      );
    }
  }
}
