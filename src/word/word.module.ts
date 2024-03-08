import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entities';
import { RedisCacheModule } from 'src/db/redis-cache.module';
import { WordService } from './word.service';
import { WordController } from './word.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Word]), RedisCacheModule],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
