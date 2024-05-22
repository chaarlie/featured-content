import { Controller, Get, Param, Query, Sse } from '@nestjs/common';
import { FeaturedContentService } from './featured-content.service';
import {
  FeaturedContentRequest,
  FeaturedTranslatedContentRequest,
} from '@app/dto';
import { ContentDayParam } from './dto/content-day.param';
import { ContentLanguageSourceParam } from './dto/content-language-source.param';
import { ContentReqQtyQueryString } from './dto/content-req-qty.query-string';
import { ContentYearParam } from './dto/content-year.param';
import { ContentMonthParam } from './dto/content-month.param';
import { EventPattern } from '@nestjs/microservices';
import { FeaturedContentResponse, TranslationResponse } from '@app/dto';
import { ContentLanguageTargetParam } from './dto/content-language-target.param';
import { SseNotificationService } from './sse-notification.service';

export enum NotificationKeys {
  FEATURED_CONTENT = 'featured-content',
  FEATURED_CONTENT_TRANSLATED = 'featured-content-translated',
}

@Controller()
export class FeaturedContentController {
  constructor(
    private readonly featuredContentService: FeaturedContentService,
    private readonly sseNotificationService: SseNotificationService,
  ) {}

  @Get('feed/health')
  getHealth() {
    return 'OK';
  }

  @Get('feed/:languageSource/:year/:month/:day')
  async getFeaturedContentFeed(
    @Query() querystring: ContentReqQtyQueryString,
    @Param() param1: ContentLanguageSourceParam,
    @Param() param2: ContentYearParam,
    @Param() param3: ContentMonthParam,
    @Param() param4: ContentDayParam,
  ) {
    this.featuredContentService.featuredContentSendContentRequest(
      new FeaturedContentRequest(
        param1.languageSource,
        param2.year,
        param3.month,
        param4.day,
        querystring.qty,
      ),
    );
  }

  @Get('feed/translate/:languageSource/:languageTarget/:year/:month/:day')
  async getFeaturedTranslatedContentFeed(
    @Query() querystring: ContentReqQtyQueryString,
    @Param() param1: ContentLanguageSourceParam,
    @Param() param2: ContentLanguageTargetParam,
    @Param() param3: ContentYearParam,
    @Param() param4: ContentMonthParam,
    @Param() param5: ContentDayParam,
  ) {
    this.featuredContentService.featuredContentSendTranslatedContentRequest(
      new FeaturedTranslatedContentRequest(
        param1.languageSource,
        param2.languageTarget,
        param3.year,
        param4.month,
        param5.day,
        querystring.qty,
      ),
    );
  }

  @Sse('sse-notifications/:key')
  async featuredContentResponseNotification(
    @Param() { key }: Record<string, NotificationKeys>,
  ) {
    return this.sseNotificationService.getNotificationValue(key);
  }

  @EventPattern('featured.content.response')
  featuredContentSendContentResponse(payload: FeaturedContentResponse) {
    this.sseNotificationService.setNotificationValue(
      NotificationKeys.FEATURED_CONTENT,
      payload,
    );
  }

  @EventPattern('featured.content.translation.response')
  featuredContentGetTranslationResponse(payload: FeaturedContentResponse[]) {
    this.sseNotificationService.setNotificationValue(
      NotificationKeys.FEATURED_CONTENT,
      payload,
    );
  }
}