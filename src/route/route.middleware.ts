import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RouteService } from './route.service';
import formatPath from '../helper/route/formatPath';

@Injectable()
export class RouteMiddleware implements NestMiddleware {
  constructor(private readonly routeService: RouteService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const getItem = (await this.routeService.findAll()) ?? [];

    if (getItem.length > 0) {
      const format = formatPath(getItem);
      this.routeService.setUser(format);
      next();
    } else {
      throw new HttpException(
        { message: '暂无数据', code: 404, data: null },
        200,
      );
    }
  }
}
