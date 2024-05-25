import { Controller, Inject, forwardRef } from '@nestjs/common';
import {
  ClientRMQ,
  ClientTCP,
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import {
  FeaturedContentRequest,
  FeaturedContentResponse,
  FeaturedTranslatedContentRequest,
  TranslationRequest,
} from '@app/payload';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeaturedContentQuery } from '../application/get-featured-content.query';
import {
  API_GATEWAY_MICROSERVICE_CLIENT,
  TRANSLATION_MICROSERVICE_CLIENT,
} from '@app/token';
import {
  FEATURED_CONTENT_REQ_EVENT,
  FEATURED_CONTENT_RES_EVENT,
  FEATURED_CONTENT_TRANSLATION_REQ_EVENT,
  TRANSLATION_REQ_EVENT,
  TRANSLATION_RES_EVENT,
} from '@app/token';

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
    @Payload() payload: FeaturedContentRequest,
  ) {
    const response = await this.queryBus.execute<
      GetFeaturedContentQuery,
      FeaturedContentResponse[]
    >(new GetFeaturedContentQuery(payload));

    this.apiGatewayMicroserviceClient.emit(
      FEATURED_CONTENT_RES_EVENT,
      response,
    );
  }

  @EventPattern(FEATURED_CONTENT_TRANSLATION_REQ_EVENT)
  async featuredContentSendTranslatedContentRequest(
    @Payload() payload: FeaturedTranslatedContentRequest,
  ) {
    const featuredContentList = await this.queryBus.execute<
      GetFeaturedContentQuery,
      FeaturedContentResponse[]
    >(
      new GetFeaturedContentQuery({
        language: payload.languageSource,
        month: payload.month,
        year: payload.year,
        day: payload.day,
        qty: payload.qty,
      }),
    );

    this.translationMicroserviceClient.emit(
      TRANSLATION_REQ_EVENT,
      new TranslationRequest(featuredContentList, payload.languageTarget),
    );
  }

  @EventPattern(TRANSLATION_RES_EVENT)
  async translationResponse(@Payload() payload: FeaturedContentResponse[]) {
    this.apiGatewayMicroserviceClient.emit(FEATURED_CONTENT_RES_EVENT, payload);
  }
}
