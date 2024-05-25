import { IQuery } from '@nestjs/cqrs';

export class GetJsonTranslatedQuery implements IQuery {
  jsonObArray: object[];
  languageTarget: string;

  constructor(options: GetJsonTranslatedQuery) {
    Object.assign(this, options);
  }
}
