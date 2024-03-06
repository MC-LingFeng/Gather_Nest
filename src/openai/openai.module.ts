import { Module } from '@nestjs/common';
import { OpenAiController } from './openai.controller';
import { EventsModule } from 'src/events/events.module';
import { RedisCacheModule } from 'src/db/redis-cache.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EventsModule, RedisCacheModule, ConfigModule],
  controllers: [OpenAiController],
  exports: [EventsModule],
})
export class OpenAiModule {}
