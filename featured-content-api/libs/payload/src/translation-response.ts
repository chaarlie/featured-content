export class TranslationResponse {
  constructor(public jsonOb: object) {
    Object.assign(this, { jsonOb });
  }
}
