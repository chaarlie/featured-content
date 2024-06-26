import { Controller, Inject, forwardRef } from '@nestjs/common';
import { ClientRMQ, EventPattern, Payload } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetJsonTranslatedQuery } from '../application/get-json-translated.query';
import { TranslationRequestDto } from 'libs/dto/src';
import {
  TRANSLATION_MICROSERVICE_CLIENT,
  TRANSLATION_REQ_EVENT,
  TRANSLATION_RES_EVENT,
} from '@app/token';

@Controller()
export class TranslationController {
  constructor(
    @Inject(forwardRef(() => TRANSLATION_MICROSERVICE_CLIENT))
    private readonly translationMicroserviceClient: ClientRMQ,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern(TRANSLATION_REQ_EVENT)
  async translationJsonContentRequest(
    @Payload() payload: TranslationRequestDto,
  ) {
    const contentTranslationList = await this.queryBus.execute(
      new GetJsonTranslatedQuery({
        jsonObArray: payload.featuredContentList,
        languageTarget: payload.languageTarget,
      }),
    );
    this.translationMicroserviceClient.emit(
      TRANSLATION_RES_EVENT,
      contentTranslationList,
    );
  }
}
