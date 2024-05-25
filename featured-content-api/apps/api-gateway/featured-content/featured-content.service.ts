import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FeaturedContentRequest } from '@app/dto';
import { FEATURED_CONTENT_SERVICE } from './featured-content.module';
import { ClientRMQ } from '@nestjs/microservices';
import { FeaturedTranslatedContentRequest } from '@app/dto';

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
