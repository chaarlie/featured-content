import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import {
  FeaturedContentRequest,
  FeaturedTranslatedContentRequest,
} from '@app/payload';
import { FEATURED_CONTENT_SERVICE } from './featured-content.module';

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
