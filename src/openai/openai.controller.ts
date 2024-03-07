import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from 'src/db/redis-cache.service';
import { EventsGateway } from 'src/events/events.gateway';

@Controller('gather')
export class OpenAiController {
  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly redis: RedisCacheService,
    private readonly configService: ConfigService,
  ) {}

  @Get('openai')
  async article() {
    return '123';
  }
}
