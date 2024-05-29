import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FeaturedContentModule } from './featured-content.module';
import { FEATURED_CONTENT_QUEUE } from '@app/token';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FeaturedContentModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
        queue: FEATURED_CONTENT_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}

bootstrap();
