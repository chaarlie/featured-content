import { Controller, Get, Param, Query } from '@nestjs/common';

import { ContentYearParam } from './dto/content-year.param';
import { ContentMonthParam } from './dto/content-month.param';
import { ContentDayParam } from './dto/content-day.param';
import { ContentReqQtyQueryString } from './dto/content-req-qty.query-string';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ContentLanguageTargetParam } from './dto/content-language-target.param';
import { ContentLanguageSourceParam } from './dto/content-language-source.param';
import { GetFeaturedContentQuery } from '../application/query/get-featured-content.query';
import { GetFeaturedTranslatedContentQuery } from '../application/query/get-featured-translated-content.query';

@Controller()
export class FeaturedContentController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('feed/:languageSource/:languageTarget/:year/:month/:day')
  async getFeaturedTranslatedContentFeed(
    @Query() querystring: ContentReqQtyQueryString,
    @Param() param1: ContentLanguageSourceParam,
    @Param() param2: ContentLanguageTargetParam,
    @Param() param3: ContentYearParam,
    @Param() param4: ContentMonthParam,
    @Param() param5: ContentDayParam,
  ) {
    return this.queryBus.execute(
      new GetFeaturedTranslatedContentQuery({
        languageSource: param1.languageSource,
        languageTarget: param2.languageTarget,
        year: param3.year,
        month: param4.month,
        day: param5.day,
        qty: querystring.qty,
      }),
    );
  }

  @Get('feed/:languageSource/:year/:month/:day')
  async getFeaturedContentFeed(
    @Query() querystring: ContentReqQtyQueryString,
    @Param() param1: ContentLanguageSourceParam,
    @Param() param2: ContentYearParam,
    @Param() param3: ContentMonthParam,
    @Param() param4: ContentDayParam,
  ) {
    return this.queryBus.execute(
      new GetFeaturedContentQuery({
        language: param1.languageSource,
        year: param2.year,
        month: param3.month,
        day: param4.day,
        qty: querystring.qty,
      }),
    );
  }
}
