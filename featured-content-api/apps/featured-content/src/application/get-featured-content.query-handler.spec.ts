import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { GetFeaturedContentQueryHandler } from './get-featured-content.query-handler';
 
import { GetFeaturedContentQuery } from './get-featured-content.query';
import { MOCKED_WIKIMEDIA_API_DATA } from './__mocks__/wikimedia.mock';
import { PROXY_WIKIMEDIA_REQ, ProxyWikimediaRequest } from '../../../../libs/proxy-wikimedia-request/src/proxy-wikimedia-request.module';

describe('GetFeaturedContentQueryHandler', () => {
  let handler: GetFeaturedContentQueryHandler;
  let proxyWikimediaRequest: ProxyWikimediaRequest;

  beforeEach(async () => {
    const wikiMediaProxyProvider: Provider = {
      provide: PROXY_WIKIMEDIA_REQ,
      useValue: {},
    };

    const providers: Provider[] = [
      GetFeaturedContentQueryHandler,
      wikiMediaProxyProvider,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(GetFeaturedContentQueryHandler);
    proxyWikimediaRequest = testModule.get(PROXY_WIKIMEDIA_REQ);
  });

  describe('execute', () => {
    it('should execute GetFeaturedContentQuery', async () => {
      proxyWikimediaRequest.getMany = jest
        .fn()
        .mockResolvedValue(MOCKED_WIKIMEDIA_API_DATA);

      const query = new GetFeaturedContentQuery({
        language: 'en',
        year: '2024',
        month: '03',
        day: '21',
        qty: 2,
      });

      const paths = ['en/featured/2024/03/21', 'en/featured/2024/03/22'];

      const spyOnExecute = jest.spyOn(handler, 'execute');

      await handler.execute(query);

      expect(spyOnExecute).toHaveBeenCalledWith(query);

      expect(proxyWikimediaRequest.getMany).toHaveBeenCalledTimes(1);
      expect(proxyWikimediaRequest.getMany).toHaveBeenCalledWith(paths);
    });
  });
});
