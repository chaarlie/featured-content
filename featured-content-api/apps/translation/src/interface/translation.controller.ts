import { Controller, Inject, forwardRef } from '@nestjs/common';
import { ClientRMQ, EventPattern, Payload } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetJsonTranslatedQuery } from '../application/get-json-translated.query';
import { TranslationRequest } from '@app/payload';
import { FEATURED_CONTENT_SERVICE } from '../translation.module';

@Controller()
export class TranslationController {
  constructor(
    @Inject(forwardRef(() => FEATURED_CONTENT_SERVICE))
    private readonly featuredContentService: ClientRMQ,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern('translation.request')
  async translationJsonContentRequest(@Payload() payload: TranslationRequest) {
    const contentTranslationList = await this.queryBus.execute(
      new GetJsonTranslatedQuery({
        jsonObArray: payload.featuredContentList,
        languageTarget: payload.languageTarget,
      }),
    );
    this.featuredContentService.emit(
      'translation.response',
      contentTranslationList,
    );
  }
}
