import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';

@Controller('gather')
export class OpenAiController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Get('openai')
  async loginPost() {
    const a = this.eventsGateway.PublicMessage('hello word');
    console.log(a);

    return '123';
  }
}
