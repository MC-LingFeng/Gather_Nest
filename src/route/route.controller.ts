import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/logical.guard';
import { RouteService } from './route.service';

@Controller('gather')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @UseGuards(JwtAuthGuard)
  @Get('routes')
  async loginPost() {
    const routes = this.routeService.getUser() ?? [];
    if (routes.length > 0) {
      throw new HttpException(
        { code: 201, data: null, message: '数据异常' },
        200,
      );
    } else {
      return routes;
    }
  }
}
