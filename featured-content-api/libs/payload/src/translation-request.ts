import { FeaturedContentResponse } from './featured-content-response';

export class TranslationRequest {
  constructor(
    public featuredContentList: FeaturedContentResponse[],
    public languageTarget: string,
  ) {
    Object.assign(this, { featuredContentList, languageTarget });
  }
}
