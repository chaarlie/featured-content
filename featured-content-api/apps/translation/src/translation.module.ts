import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetJsonTranslatedQuery } from './application/get-json-translated.query';
import { GetJsonTranslatedQueryHandler } from './application/get-json-translated.query-handler';
import { TranslationController } from './interface/translation.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
  RmqEnvConfigModule,
  RmqEnvConfigService,
  rmqEnvConfigFactory,
} from '@app/rmq-env-config';
import { FEATURED_CONTENT_QUEUE, TRANSLATION_MICROSERVICE_CLIENT } from '@app/token';

const application = [GetJsonTranslatedQuery, GetJsonTranslatedQueryHandler];

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        imports: [RmqEnvConfigModule],
        name: TRANSLATION_MICROSERVICE_CLIENT,
        useFactory: rmqEnvConfigFactory(FEATURED_CONTENT_QUEUE),
        inject: [RmqEnvConfigService],
      },
    ]),
  ],
  controllers: [TranslationController],
  providers: [...application],
})
export class TranslationModule {}
