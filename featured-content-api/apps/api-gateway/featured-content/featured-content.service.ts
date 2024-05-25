import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import {
  FeaturedContentRequest,
  FeaturedTranslatedContentRequest,
} from '@app/payload';
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
    featuredContentRequest: FeaturedContentRequest,
  ) {
    this.featuredContentMicroserviceClient.emit(
      FEATURED_CONTENT_REQ_EVENT,
      featuredContentRequest,
    );
  }

  featuredContentSendTranslatedContentRequest(
    featuredContentRequest: FeaturedTranslatedContentRequest,
  ) {
    this.featuredContentMicroserviceClient.emit(
      FEATURED_CONTENT_TRANSLATION_REQ_EVENT,
      featuredContentRequest,
    );
  }
}
