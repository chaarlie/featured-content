export class FeaturedTranslatedContentRequest {
  constructor(
    public languageSource: string,
    public languageTarget: string,
    public year: string,
    public month: string,
    public day: string,
    public qty: number,
  ) {
    Object.assign(this, {
      languageSource,
      languageTarget,
      year,
      month,
      day,
      qty,
    });
  }
}
