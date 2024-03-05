import { Module } from '@nestjs/common';
import { OpenAiController } from './openai.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [OpenAiController],
  exports: [EventsModule],
})
export class OpenAiModule {}
