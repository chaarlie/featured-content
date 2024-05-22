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
import { NotificationKeys } from './fetured-content.controller';
import { Observable, firstValueFrom } from 'rxjs';

export interface SSMessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Injectable()
export class SseNotificationService {
  private readonly notificationEvents: Record<string, Subject<SSMessageEvent>> =
    {};

  constructor() {
    Object.values(NotificationKeys).forEach(
      (key) => (this.notificationEvents[key] = new Subject<SSMessageEvent>()),
    );
  }

  async setNotificationValue(key: NotificationKeys, value: string | object) {
    this.notificationEvents[key].next({ data: value });
  }

  async getNotificationValue(key: string) {
    return this.notificationEvents[key].asObservable();
  }
}
