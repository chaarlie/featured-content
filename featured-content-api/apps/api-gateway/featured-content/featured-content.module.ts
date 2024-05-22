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

export const FEATURED_CONTENT_SERVICE = 'FEATURED_CONTENT_SERVICE';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [RmqEnvConfigModule],
        name: FEATURED_CONTENT_SERVICE,
        useFactory: rmqEnvConfigFactory('FEATURED_CONTENT'),
        inject: [RmqEnvConfigService],
      },
    ]),
  ],
  controllers: [FeaturedContentController],
  providers: [SseNotificationService, FeaturedContentService],
})
export class FeaturedContentModule {}
