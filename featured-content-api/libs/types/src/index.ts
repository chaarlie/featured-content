export enum NotificationKeys {
  FEATURED_CONTENT = 'featured-content',
  PROCESS_STATUS = 'process-status',
}

export enum ProcessStatus {
  TRANSLATING = 'translating',
  FETCHING = 'fetching',
  COMPLETED = 'completed',
}

export interface SSMessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
