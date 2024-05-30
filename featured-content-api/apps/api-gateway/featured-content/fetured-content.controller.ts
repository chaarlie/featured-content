import { Controller, Get, Param, Query, Sse } from '@nestjs/common';
import { FeaturedContentService } from './featured-content.service';
import {
  FeaturedContentRequestDto,
  FeaturedTranslatedContentRequestDto,
  FeaturedContentResponseDto,
} from 'libs/dto/src';
import { ContentDayParam } from './dto/content-day.param';
import { ContentLanguageSourceParam } from './dto/content-language-source.param';
import { ContentReqQtyQueryString } from './dto/content-req-qty.query-string';
import { ContentYearParam } from './dto/content-year.param';
import { ContentMonthParam } from './dto/content-month.param';
import { EventPattern } from '@nestjs/microservices';
import { ContentLanguageTargetParam } from './dto/content-language-target.param';
import { SseNotificationService } from './sse-notification.service';
import {
  FEATURED_CONTENT_RES_EVENT,
  FEATURED_CONTENT_UPDATE_PROCESS_STATUS_EVENT,
} from '@app/token';
import { NotificationKeys, ProcessStatus } from '@app/types';

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
      new FeaturedContentRequestDto(
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
      new FeaturedTranslatedContentRequestDto(
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
  async featuredContentResponseDtoNotification(
    @Param() { key }: Record<string, NotificationKeys>,
  ) {
    return this.sseNotificationService.getNotificationValue(key);
  }

  @EventPattern(FEATURED_CONTENT_UPDATE_PROCESS_STATUS_EVENT)
  featuredContentProcessStatus(payload: ProcessStatus) {
    this.sseNotificationService.setNotificationValue(
      NotificationKeys.PROCESS_STATUS,
      payload,
    );
  }

  @EventPattern(FEATURED_CONTENT_RES_EVENT)
  featuredContentSendContentResponse(payload: FeaturedContentResponseDto[]) {
    this.sseNotificationService.setNotificationValue(
      NotificationKeys.PROCESS_STATUS,
      ProcessStatus.COMPLETED,
    );
    this.sseNotificationService.setNotificationValue(
      NotificationKeys.FEATURED_CONTENT,
      payload,
    );
  }
}
