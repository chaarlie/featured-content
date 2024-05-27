import axios from 'axios';

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetJsonTranslatedQuery } from './get-json-translated.query';
import { FeaturedContentResponse } from '@app/payload';
import { RedisClientManagerService } from '@app/redis-client-manager';

@QueryHandler(GetJsonTranslatedQuery)
export class GetJsonTranslatedQueryHandler implements IQueryHandler {
  constructor(
    private readonly redisClientManagerService: RedisClientManagerService,
  ) {}

  private async libreTranslateApiCall(q, target) {
    let resultText = '';

    try {
      const result = await axios.post(
        `http:///${process.env.TRANSLATION_SERVICE_HOST}:${process.env.TRANSLATION_SERVICE_PORT}/translate`,
        JSON.stringify({
          q,
          source: 'en',
          target,
          format: 'text',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (result.data && 'translatedText' in result.data) {
        resultText = result.data['translatedText'];
      }
    } catch (error) {
      console.error('Error translating text:', error);
    }

    return resultText;
  }

  private async translateObjectValues(ob, languageTarget) {
    const obCopy = Object.assign({}, ob);

    for (const key in obCopy) {
      let currentEl = obCopy[key];
      if (typeof currentEl === 'string' && currentEl.length) {
        currentEl = await this.libreTranslateApiCall(currentEl, languageTarget);
      }

      if (typeof currentEl === 'object' && currentEl !== null) {
        if (Array.isArray(currentEl)) {
          currentEl = await Promise.all(
            currentEl.map((el) =>
              this.translateObjectValues(el, languageTarget),
            ),
          );
        } else {
          currentEl = await this.translateObjectValues(
            currentEl,
            languageTarget,
          );
        }
      }

      obCopy[key] = currentEl;
    }
    return obCopy;
  }

  private async getTranslatedContentList(query: GetJsonTranslatedQuery) {
    const contentTranslationList = await Promise.all(
      query.jsonObArray.map((el: any) => {
        return this.translateObjectValues(el, query.languageTarget);
      }),
    );

    const contentTranslationListStringified = contentTranslationList.map(
      (el) => el as FeaturedContentResponse,
    );

    return contentTranslationListStringified;
  }

  async execute(
    query: GetJsonTranslatedQuery,
  ): Promise<FeaturedContentResponse[]> {
    let contentList: FeaturedContentResponse[] = [];

    const cacheKey = this.redisClientManagerService.generateCacheKey(query);
    const cacheData =
      await this.redisClientManagerService.cache.get<string>(cacheKey);

    if (cacheData) {
      try {
        contentList = JSON.parse(cacheData);
      } catch (error) {
        console.error(error);
      }

      return contentList as FeaturedContentResponse[];
    }

    contentList = await this.getTranslatedContentList(query);

    this.redisClientManagerService.cache.set(
      cacheKey,
      JSON.stringify(contentList),
    );

    return contentList;
  }
}
