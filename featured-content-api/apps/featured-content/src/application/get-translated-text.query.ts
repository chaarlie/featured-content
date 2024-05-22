import { IQuery } from '@nestjs/cqrs';

export class GetTranslatedTextQuery implements IQuery {
  jsonOb: string;
  languageTarget: string;

  constructor(properties: GetTranslatedTextQuery) {
    Object.assign(this, properties);
  }
}
