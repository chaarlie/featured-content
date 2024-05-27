import { createHash } from 'crypto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import * as moment from 'moment';

import { GetFeaturedContentQuery } from './get-featured-content.query';
import {
  PROXY_WIKIMEDIA_REQ,
  ProxyWikimediaRequest,
} from '@app/proxy-wikimedia-request/proxy-wikimedia-request.module';
import { FeaturedContentImpl } from '../domain/featured-content';
import { RedisClientManagerService } from '@app/redis-client-manager';

@QueryHandler(GetFeaturedContentQuery)
export class GetFeaturedContentQueryHandler implements IQueryHandler {
  @Inject(PROXY_WIKIMEDIA_REQ)
  private readonly proxyWikiMediaRequest: ProxyWikimediaRequest;

  constructor(
    private readonly redisClientManagerService: RedisClientManagerService,
  ) {}

  private async getContentList(query: GetFeaturedContentQuery) {
    const generatedIds: string[] = [];

    const paths = Array.from({ length: query.qty }).map((_val, i) => {
      const { year, month, day, language } = query;
      const dateString = `${year}/${month}/${day}`;

      const date = moment(dateString, 'YYYY/MM/DD');

      date.add(i, 'days');

      const formattedDate = date.format('YYYY/MM/DD');

      generatedIds[i] = createHash('sha256')
        .update(
          JSON.stringify({
            ...query,
            formattedDate: formattedDate.replace(/\//g, ''),
          }),
        )
        .digest('hex');

      return `${language}/featured/${formattedDate}`;
    });

    const result = await this.proxyWikiMediaRequest.getMany(paths);

    const featuredContentList = result.map((data, i) => {
      return new FeaturedContentImpl(null, { id: generatedIds[i], ...data });
    });

    return featuredContentList;
  }
  async execute(
    query: GetFeaturedContentQuery,
  ): Promise<FeaturedContentImpl[]> {
    let contentList: FeaturedContentImpl[] = [];

    const cacheKey = this.redisClientManagerService.generateCacheKey(query);
    const cacheData =
      await this.redisClientManagerService.cache.get<string>(cacheKey);

    if (cacheData) {
      try {
        contentList = JSON.parse(cacheData);
      } catch (error) {
        console.error(error);
      }

      return contentList as FeaturedContentImpl[];
    }

    contentList = await this.getContentList(query);

    this.redisClientManagerService.cache.set(
      cacheKey,
      JSON.stringify(contentList),
    );

    return contentList;
  }
}
