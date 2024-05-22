import { IQuery } from '@nestjs/cqrs';

export class GetFeaturedTranslatedContentQuery implements IQuery {
  languageSource: string;
  languageTarget: string;
  year: string;
  month: string;
  day: string;
  qty: number;

  constructor(options: GetFeaturedTranslatedContentQuery) {
    Object.assign(this, options);
  }
}
