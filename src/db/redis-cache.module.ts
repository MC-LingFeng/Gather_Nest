import { RedisCacheService } from './redis-cache.service';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Redis } from 'ioredis';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  providers: [RedisCacheService, Redis],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
