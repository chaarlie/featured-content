export class TranslationResponseDto {
  constructor(public jsonOb: object) {
    Object.assign(this, { jsonOb });
  }
}
