export type TranslationProperties = {
  jsonOb: object;
};

export interface Translation {}

export class TranslationImpl implements Translation {
  constructor(properties: TranslationProperties) {
    this.jsonOb = properties.jsonOb;
  }

  private jsonOb: object;
}
