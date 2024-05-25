import { Module } from '@nestjs/common';
import { FeaturedContentService } from './featured-content.service';
import { FeaturedContentController } from './fetured-content.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
  RmqEnvConfigModule,
  RmqEnvConfigService,
  rmqEnvConfigFactory,
} from '@app/rmq-env-config';
import { SseNotificationService } from './sse-notification.service';
import {
  FEATURED_CONTENT_MICROSERVICE_CLIENT,
  FEATURED_CONTENT_QUEUE,
} from '@app/token';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [RmqEnvConfigModule],
        name: FEATURED_CONTENT_MICROSERVICE_CLIENT,
        useFactory: rmqEnvConfigFactory(FEATURED_CONTENT_QUEUE),
        inject: [RmqEnvConfigService],
      },
    ]),
  ],
  controllers: [FeaturedContentController],
  providers: [SseNotificationService, FeaturedContentService],
})
export class FeaturedContentModule {}
