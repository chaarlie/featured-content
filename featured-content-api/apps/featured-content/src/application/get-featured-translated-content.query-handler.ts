import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';

import { GetFeaturedTranslatedContentQuery } from './get-featured-translated-content.query';
import { GetFeaturedContentQuery } from './get-featured-content.query';
import { GetTranslatedTextQuery } from './get-translated-text.query';
import { FeaturedContentImpl } from '../domain/featured-content';

@QueryHandler(GetFeaturedTranslatedContentQuery)
export class GetFeaturedTranslatedContentQueryHandler implements IQueryHandler {
  constructor(readonly queryBus: QueryBus) {}

  async execute(
    query: GetFeaturedTranslatedContentQuery,
  ): Promise<FeaturedContentImpl[]> {
    const {
      languageSource: language,
      languageTarget,
      year,
      month,
      day,
      qty,
    } = query;

    const featuredContentList: FeaturedContentImpl[] =
      await this.queryBus.execute(
        new GetFeaturedContentQuery({ language, year, month, day, qty }),
      );

    const translatedFeaturedContentList: FeaturedContentImpl[] =
      await Promise.all(
        featuredContentList.map((result) =>
          this.queryBus.execute(
            new GetTranslatedTextQuery({
              jsonOb: result.toJSON(),
              languageTarget,
            }),
          ),
        ),
      );

    return translatedFeaturedContentList;
  }
}
