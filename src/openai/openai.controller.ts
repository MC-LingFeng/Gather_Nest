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
  async loginPost() {
    // const a = this.eventsGateway.PublicMessage('hello word');
    // console.log(a);
    console.log(this.configService.get('MYSQL_CONFIG'));

    const value = await this.redis.set('123', { name: '123', hello: '123' });
    console.log(value);

    return '123';
  }
}
