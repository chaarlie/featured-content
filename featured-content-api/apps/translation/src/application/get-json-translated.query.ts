import { IEvent, IQuery } from '@nestjs/cqrs';

export class GetJsonTranslatedQuery implements IQuery {
  jsonOb: Object;
  languageTarget: string;

  constructor(options: GetJsonTranslatedQuery) {
    Object.assign(this, options);
  }
}
