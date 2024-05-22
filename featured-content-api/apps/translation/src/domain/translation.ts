export type TranslationProperties = {
  jsonOb: Object;
};

export interface Translation {}

export class TranslationImpl implements Translation {
  constructor(properties: TranslationProperties) {
    this.jsonOb = properties.jsonOb;
  }

  private jsonOb: Object;

  toString() {
    return JSON.stringify(this.jsonOb);
  }

  toJSON() {
    const ob = Object.assign({}, this);

    return JSON.stringify(ob);
  }
}
