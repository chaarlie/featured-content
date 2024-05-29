import { NestFactory } from '@nestjs/core';
import { TranslationModule } from './translation.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FEATURED_CONTENT_TRANSLATED_QUEUE } from '@app/token';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TranslationModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
        queue: FEATURED_CONTENT_TRANSLATED_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
