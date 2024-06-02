import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import {
  FeaturedContentRequestDto,
  FeaturedTranslatedContentRequestDto,
} from '@app/dto';
import {
  FEATURED_CONTENT_MICROSERVICE_CLIENT,
  FEATURED_CONTENT_REQ_EVENT,
  FEATURED_CONTENT_TRANSLATION_REQ_EVENT,
} from '@app/token';

@Injectable()
export class FeaturedContentService {
  constructor(
    @Inject(forwardRef(() => FEATURED_CONTENT_MICROSERVICE_CLIENT))
    private readonly featuredContentMicroserviceClient: ClientRMQ,
  ) {}

  featuredContentSendContentRequest(
    featuredContentRequest: FeaturedContentRequestDto,
  ) {
    this.featuredContentMicroserviceClient.emit(
      FEATURED_CONTENT_REQ_EVENT,
      featuredContentRequest,
    );
  }

  featuredContentSendTranslatedContentRequest(
    featuredContentRequest: FeaturedTranslatedContentRequestDto,
  ) {
    this.featuredContentMicroserviceClient.emit(
      FEATURED_CONTENT_TRANSLATION_REQ_EVENT,
      featuredContentRequest,
    );
  }
}
