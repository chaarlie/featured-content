import { NestFactory } from '@nestjs/core';
 
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'PROXY_CONTENT',
      queueOptions: {
        durable: false
      },
    },
  });

  app.enableCors();

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
 
  await app.listen(process.env.BACKEND_PORT);


}

bootstrap();
