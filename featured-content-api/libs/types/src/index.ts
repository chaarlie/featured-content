export enum NotificationKeys {
  FEATURED_CONTENT = 'featured-content',
  FEATURED_CONTENT_TRANSLATED = 'featured-content-translated',
}


export interface SSMessageEvent {
    data: string | object;
    id?: string;
    type?: string;
    retry?: number;
}