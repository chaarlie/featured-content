import { CqrsModule } from '@nestjs/cqrs';
import { ProxyWikimediaRequestModule } from 'libs/proxy-wikimedia-request.module';
import { FeaturedContentController } from './interface/featured-content.controller';

import { Module } from '@nestjs/common';
import { LibreTranslateManagerModule } from '../../libs/libretranslate-manager.module';

import { GetFeaturedContentQueryHandler } from './application/query/get-featured-content.query-handler';
import { GetFeaturedTranslatedContentQueryHandler } from './application/query/get-featured-translated-content.query-handler';
import { GetTranslatedTextQueryHandler } from './application/query/get-translated-text.query-handler';

const application = [
  GetFeaturedContentQueryHandler,
  GetFeaturedTranslatedContentQueryHandler,
  GetTranslatedTextQueryHandler,
];

@Module({
  imports: [
    CqrsModule,
    ProxyWikimediaRequestModule,
    LibreTranslateManagerModule,
  ],
  controllers: [FeaturedContentController],
  providers: [...application],
})
export class FeaturedContentModule {}
