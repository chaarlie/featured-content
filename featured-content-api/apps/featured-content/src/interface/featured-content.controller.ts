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
} from '@app/dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeaturedContentQuery } from '../application/get-featured-content.query';
import { TRANSLATION_SERVICE } from '../featured-content.module';
import { TranslationResponse } from '../../../../libs/dto/src/translation-response';

@Controller()
export class FeaturedContentController {
  constructor(
    @Inject('API_GATEWAY')
    private readonly apiGateWayService: ClientTCP,
    @Inject(forwardRef(() => TRANSLATION_SERVICE))
    private readonly featuredContentTranslatedService: ClientRMQ,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern('translate.json.content.response')
  async translateJsonContentResponse(@Payload() payload: any) {
    console.log(payload);
  }

  @EventPattern('featured.content.request')
  async featuredContentProcessRequest(
    @Payload() payload: FeaturedContentRequest,
  ) {
    const response = await this.queryBus.execute<
      GetFeaturedContentQuery,
      FeaturedContentResponse[]
    >(new GetFeaturedContentQuery(payload));

    this.apiGateWayService.emit('featured.content.response', response);
  }

  @EventPattern('featured.content.translation.request')
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

    this.featuredContentTranslatedService.emit(
      'translation.request',
      new TranslationRequest(featuredContentList, payload.languageTarget),
    );
  }

  @EventPattern('translation.response')
  async translationResponse(@Payload() payload: string[]) {
    const featuredContentResponseList = payload.map((el) => {
      let parsed = {};
      try {
        parsed = JSON.parse(el);
      } catch (error) {
        console.error(error);
      }
      return parsed as FeaturedContentResponse;
    });

    this.apiGateWayService.emit(
      'featured.content.translation.response',
      featuredContentResponseList,
    );
  }
}