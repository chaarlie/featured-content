import { Controller, Inject, forwardRef } from '@nestjs/common';
import {
  ClientRMQ,
  ClientTCP,
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import {
  FeaturedContentRequestDto,
  FeaturedContentResponseDto,
  FeaturedTranslatedContentRequestDto,
  TranslationRequestDto,
} from 'libs/dto/src';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeaturedContentQuery } from '../application/get-featured-content.query';
import {
  API_GATEWAY_MICROSERVICE_CLIENT,
  FEATURED_CONTENT_UPDATE_PROCESS_STATUS_EVENT,
  TRANSLATION_MICROSERVICE_CLIENT,
} from '@app/token';
import {
  FEATURED_CONTENT_REQ_EVENT,
  FEATURED_CONTENT_RES_EVENT,
  FEATURED_CONTENT_TRANSLATION_REQ_EVENT,
  TRANSLATION_REQ_EVENT,
  TRANSLATION_RES_EVENT,
} from '@app/token';
import { ProcessStatus } from '@app/types';

@Controller()
export class FeaturedContentController {
  constructor(
    @Inject(API_GATEWAY_MICROSERVICE_CLIENT)
    private readonly apiGatewayMicroserviceClient: ClientTCP,
    @Inject(forwardRef(() => TRANSLATION_MICROSERVICE_CLIENT))
    private readonly translationMicroserviceClient: ClientRMQ,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern(FEATURED_CONTENT_REQ_EVENT)
  async featuredContentProcessRequest(
    @Payload() payload: FeaturedContentRequestDto,
  ) {
    this.apiGatewayMicroserviceClient.emit(
      FEATURED_CONTENT_UPDATE_PROCESS_STATUS_EVENT,
      ProcessStatus.FETCHING,
    );

    const response = await this.queryBus.execute<
      GetFeaturedContentQuery,
      FeaturedContentResponseDto[]
    >(new GetFeaturedContentQuery(payload));

    this.apiGatewayMicroserviceClient.emit(
      FEATURED_CONTENT_RES_EVENT,
      response,
    );
  }

  @EventPattern(FEATURED_CONTENT_TRANSLATION_REQ_EVENT)
  async featuredContentSendTranslatedContentRequest(
    @Payload() payload: FeaturedTranslatedContentRequestDto,
  ) {
    this.apiGatewayMicroserviceClient.emit(
      FEATURED_CONTENT_UPDATE_PROCESS_STATUS_EVENT,
      ProcessStatus.FETCHING,
    );

    const featuredContentList = await this.queryBus.execute<
      GetFeaturedContentQuery,
      FeaturedContentResponseDto[]
    >(
      new GetFeaturedContentQuery({
        language: payload.languageSource,
        month: payload.month,
        year: payload.year,
        day: payload.day,
        qty: payload.qty,
      }),
    );

    this.apiGatewayMicroserviceClient.emit(
      FEATURED_CONTENT_UPDATE_PROCESS_STATUS_EVENT,
      ProcessStatus.TRANSLATING,
    );

    this.translationMicroserviceClient.emit(
      TRANSLATION_REQ_EVENT,
      new TranslationRequestDto(featuredContentList, payload.languageTarget),
    );
  }

  @EventPattern(TRANSLATION_RES_EVENT)
  async translationResponse(@Payload() payload: FeaturedContentResponseDto[]) {
    this.apiGatewayMicroserviceClient.emit(FEATURED_CONTENT_RES_EVENT, payload);
  }
}
