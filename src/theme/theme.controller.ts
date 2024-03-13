import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/logical.guard';
import { ThemeService } from './theme.service';

@Controller('gather')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get('theme')
  async themeGet() {
    const routes = this.themeService.get() ?? [];
    if (routes.length === 0) {
      throw new HttpException(
        { code: 201, data: null, message: '数据异常' },
        200,
      );
    } else {
      return routes[0];
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('theme')
  async themePost(@Body() body: { value: string; id: number }) {
    const routes = this.themeService.get() ?? [];
    if (!body.value || !body.id) {
      throw new HttpException(
        { code: 201, data: null, message: '请输入正确参数' },
        200,
      );
    }

    if (routes.length > 0) {
      await this.themeService.update(body.id, body.value);
      return null;
    } else {
      throw new HttpException(
        { code: 201, data: null, message: '数据异常' },
        200,
      );
    }
  }
}
