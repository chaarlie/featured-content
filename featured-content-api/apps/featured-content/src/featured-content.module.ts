import { CqrsModule } from '@nestjs/cqrs';

import { Module } from '@nestjs/common';

import { GetFeaturedContentQueryHandler } from './application/get-featured-content.query-handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProxyWikimediaRequestModule } from '@app/proxy-wikimedia-request/proxy-wikimedia-request.module';
import { FeaturedContentController } from './interface/featured-content.controller';
import {
  RmqEnvConfigModule,
  RmqEnvConfigService,
  rmqEnvConfigFactory,
} from '@app/rmq-env-config';
import { TranslationModule } from '../../translation/src/translation.module';
import {
  API_GATEWAY_MICROSERVICE_CLIENT,
  FEATURED_CONTENT_TRANSLATED_QUEUE,
  TRANSLATION_MICROSERVICE_CLIENT,
} from '@app/token';
import { RedisClientManagerModule } from '@app/redis-client-manager';

const application = [GetFeaturedContentQueryHandler];

@Module({
  imports: [
    TranslationModule,
    ProxyWikimediaRequestModule,
    CqrsModule,
    RedisClientManagerModule,
    ClientsModule.register([
      {
        name: API_GATEWAY_MICROSERVICE_CLIENT,
        transport: Transport.TCP,
        options: {
          port: Number(process.env.API_GATEWAY_PORT),
          host: process.env.API_GATEWAY_HOST,
        },
      },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [RmqEnvConfigModule],
        name: TRANSLATION_MICROSERVICE_CLIENT,
        useFactory: rmqEnvConfigFactory(FEATURED_CONTENT_TRANSLATED_QUEUE),
        inject: [RmqEnvConfigService],
      },
    ]),
  ],
  controllers: [FeaturedContentController],

  providers: [...application],
})
export class FeaturedContentModule {}
