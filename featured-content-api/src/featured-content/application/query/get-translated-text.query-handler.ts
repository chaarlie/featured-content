import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  LIBRE_TRANSLATE_MANAGER,
  LibreTranslateManager,
} from '../../../../libs/libretranslate-manager.module';
import { GetTranslatedTextQuery } from './get-translated-text.query';
import { FeaturedContentImpl } from '../../domain/featured-content';

@QueryHandler(GetTranslatedTextQuery)
export class GetTranslatedTextQueryHandler implements IQueryHandler {
  @Inject(LIBRE_TRANSLATE_MANAGER)
  private readonly libreTranslateManager: LibreTranslateManager;

  async execute(query: GetTranslatedTextQuery): Promise<FeaturedContentImpl> {
    const { jsonOb, languageTarget } = query;
    return this.libreTranslateManager.translate(jsonOb, languageTarget);
  }
}
