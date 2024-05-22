import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetTranslatedTextQuery } from './get-translated-text.query';

import {
  LIBRE_TRANSLATE_MANAGER,
  LibreTranslateManager,
} from '@app/libretranslate-manager/libretranslate-manager.module';
import { FeaturedContentImpl } from '../domain/featured-content';

@QueryHandler(GetTranslatedTextQuery)
export class GetTranslatedTextQueryHandler implements IQueryHandler {
  @Inject(LIBRE_TRANSLATE_MANAGER)
  private readonly libreTranslateManager: LibreTranslateManager;

  async execute(query: GetTranslatedTextQuery): Promise<FeaturedContentImpl> {
    const { jsonOb, languageTarget } = query;
    return this.libreTranslateManager.translate(jsonOb, languageTarget);
  }
}
