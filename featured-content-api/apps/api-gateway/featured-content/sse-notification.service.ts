import { Injectable } from '@nestjs/common';

import { Subject } from 'rxjs/internal/Subject';
import { NotificationKeys, SSMessageEvent } from '@app/types';

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
