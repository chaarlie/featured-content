export class FeaturedContentRequest {
  constructor(
    public language: string,
    public year: string,
    public month: string,
    public day: string,
    public qty: number,
  ) {
    Object.assign(this, { language, year, month, day, qty });
  }
}
