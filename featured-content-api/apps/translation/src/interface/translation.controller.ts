import { Controller, Inject, forwardRef } from '@nestjs/common';
import { ClientRMQ, EventPattern, Payload } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetJsonTranslatedQuery } from '../application/get-json-translated.query';
import {
  FeaturedContentResponse,
  FeaturedTranslatedContentRequest,
  TranslationRequest,
} from '@app/dto';
import { FEATURED_CONTENT_SERVICE } from '../translation.module';
import { TranslationImpl } from '../domain/translation';

@Controller()
export class TranslationController {
  constructor(
    @Inject(forwardRef(() => FEATURED_CONTENT_SERVICE))
    private readonly featuredContentService: ClientRMQ,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern('translation.request')
  async translationJsonContentRequest(@Payload() payload: TranslationRequest) {
    const featuredContentTranslated = await Promise.all(
      payload.featuredContentList.map((el: any) => {
        const jsonOb = JSON.parse(el);
        return this.queryBus.execute<GetJsonTranslatedQuery, TranslationImpl>(
          new GetJsonTranslatedQuery({
            jsonOb,
            languageTarget: payload.languageTarget,
          }),
        );
      }),
    );

    const contentTranslationList = featuredContentTranslated.map((el) =>
      JSON.stringify(el.toString()),
    );

    this.featuredContentService.emit(
      'translation.response',
      contentTranslationList,
    );
  }
}
