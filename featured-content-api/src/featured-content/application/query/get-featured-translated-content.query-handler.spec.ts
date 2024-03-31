import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MOCKED_WIKIMEDIA_API_DATA } from './__mocks__/wikimedia.mock';
import { GetFeaturedTranslatedContentQuery } from './get-featured-translated-content.query';
import { IQuery, QueryBus } from '@nestjs/cqrs';
import { GetFeaturedTranslatedContentQueryHandler } from './get-featured-translated-content.query-handler';
import { GetFeaturedContentQueryHandler } from './get-featured-content.query-handler';
import { PROXY_WIKIMEDIA_REQ } from '../../../../libs/proxy-wikimedia-request.module';
import { GetTranslatedTextQueryHandler } from './get-translated-text.query-handler';
import { LIBRE_TRANSLATE_MANAGER } from '../../../../libs/libretranslate-manager.module';
import {
  ContentData,
  FeaturedContentImpl,
} from '../../domain/featured-content';

describe('GetFeaturedTranslatedContentQueryHandler', () => {
  const featuredContentList = MOCKED_WIKIMEDIA_API_DATA.map(
    //@ts-ignore
    (el) => new FeaturedContentImpl(null, el as ContentData),
  );

  let getFeaturedTranslatedContentQueryHandler: GetFeaturedTranslatedContentQueryHandler;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const wikiMediaProxyProvider: Provider = {
      provide: PROXY_WIKIMEDIA_REQ,
      useValue: {},
    };

    const libreTranslateManagerProvider: Provider = {
      provide: LIBRE_TRANSLATE_MANAGER,
      useValue: {},
    };

    const queryBusProvider: Provider = {
      provide: QueryBus,
      useValue: {
        execute: (_query: IQuery) => featuredContentList,
      },
    };

    const providers: Provider[] = [
      GetFeaturedTranslatedContentQueryHandler,
      GetFeaturedContentQueryHandler,
      GetTranslatedTextQueryHandler,
      wikiMediaProxyProvider,
      libreTranslateManagerProvider,
      queryBusProvider,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    getFeaturedTranslatedContentQueryHandler = testModule.get(
      GetFeaturedTranslatedContentQueryHandler,
    );

    queryBus = testModule.get(QueryBus);
  });

  describe('execute', () => {
    it('should execute GetFeaturedTranslatedContentQueryHandler', async () => {
      const query = new GetFeaturedTranslatedContentQuery({
        languageSource: 'en',
        languageTarget: 'en',
        year: '2024',
        month: '03',
        day: '21',
        qty: 2,
      });

      const spyOnQueryBusExecute = jest.spyOn(queryBus, 'execute');

      const spyOnFeaturedTranslatedContentQueryHandlerExecute = jest.spyOn(
        getFeaturedTranslatedContentQueryHandler,
        'execute',
      );

      await getFeaturedTranslatedContentQueryHandler.execute(query);

      expect(
        spyOnFeaturedTranslatedContentQueryHandlerExecute,
      ).toHaveBeenCalledWith(query);

      // calls the other two queries
      expect(spyOnQueryBusExecute).toHaveBeenCalledTimes(2);
    });
  });
});
