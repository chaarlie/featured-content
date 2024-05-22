import { CqrsModule } from '@nestjs/cqrs';

import { Module } from '@nestjs/common';

import { GetFeaturedContentQueryHandler } from './application/get-featured-content.query-handler';
import { GetTranslatedTextQueryHandler } from './application/get-translated-text.query-handler';
import { GetFeaturedTranslatedContentQueryHandler } from './application/get-featured-translated-content.query-handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LibreTranslateManagerModule } from '../../../libs/libretranslate-manager/src/libretranslate-manager.module';
import { ProxyWikimediaRequestModule } from '../../../libs/proxy-wikimedia-request/src/proxy-wikimedia-request.module';
import { FeaturedContentController } from './interface/featured-content.controller';
import {
  RmqEnvConfigModule,
  RmqEnvConfigService,
  rmqEnvConfigFactory,
} from '@app/rmq-env-config';
import { TranslationModule } from '../../translation/src/translation.module';

export const TRANSLATION_SERVICE = 'TRANSLATION_SERVICE';

const application = [
  GetFeaturedContentQueryHandler,
  GetFeaturedTranslatedContentQueryHandler,
  GetTranslatedTextQueryHandler,
];

@Module({
  imports: [
    TranslationModule,
    LibreTranslateManagerModule,
    ProxyWikimediaRequestModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: 'API_GATEWAY',
        transport: Transport.TCP,
        options: {
          port: 8000,
          host: 'localhost',
        },
      },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [RmqEnvConfigModule],
        name: TRANSLATION_SERVICE,
        useFactory: rmqEnvConfigFactory('FEATURED_CONTENT_TRANSLATED'),
        inject: [RmqEnvConfigService],
      },
    ]),
  ],
  controllers: [FeaturedContentController],

  providers: [...application],
})
export class FeaturedContentModule {}
