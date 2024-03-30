import { IEvent, IQuery } from '@nestjs/cqrs';

export class GetFeaturedContentQuery implements IQuery {
  language: string;
  year: string;
  month: string;
  day: string;
  qty: number;

  constructor(options: GetFeaturedContentQuery) {
    Object.assign(this, options);
  }
}
