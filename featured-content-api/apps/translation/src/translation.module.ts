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

export const FEATURED_CONTENT_SERVICE = 'FEATURED_CONTENT_SERVICE';

const application = [GetJsonTranslatedQuery, GetJsonTranslatedQueryHandler];

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        imports: [RmqEnvConfigModule],
        name: FEATURED_CONTENT_SERVICE,
        useFactory: rmqEnvConfigFactory('FEATURED_CONTENT'),
        inject: [RmqEnvConfigService],
      },
    ]),
  ],
  controllers: [TranslationController],
  providers: [...application],
})
export class TranslationModule {}
