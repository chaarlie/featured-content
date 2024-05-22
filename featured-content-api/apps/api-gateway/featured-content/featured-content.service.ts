import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  FeaturedContentRequest,
  FeaturedContentResponse,
  TranslationResponse,
} from '@app/dto';
import { FEATURED_CONTENT_SERVICE } from './featured-content.module';
import { ClientRMQ } from '@nestjs/microservices';
import { Subject } from 'rxjs/internal/Subject';
import { FeaturedTranslatedContentRequest } from '../../../libs/dto/src/featured-translated-content-request';

@Injectable()
export class FeaturedContentService {
  constructor(
    @Inject(forwardRef(() => FEATURED_CONTENT_SERVICE))
    private readonly featuredContentService: ClientRMQ,
  ) {}

  featuredContentSendContentRequest(
    featuredContentRequest: FeaturedContentRequest,
  ) {
    this.featuredContentService.emit(
      'featured.content.request',
      featuredContentRequest,
    );
  }

  featuredContentSendTranslatedContentRequest(
    featuredContentRequest: FeaturedTranslatedContentRequest,
  ) {
    this.featuredContentService.emit(
      'featured.content.translation.request',
      featuredContentRequest,
    );
  }
}
