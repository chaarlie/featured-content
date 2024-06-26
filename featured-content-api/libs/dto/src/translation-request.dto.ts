import { FeaturedContentResponseDto } from './featured-content-response.dto';

export class TranslationRequestDto {
  constructor(
    public featuredContentList: FeaturedContentResponseDto[],
    public languageTarget: string,
  ) {
    Object.assign(this, { featuredContentList, languageTarget });
  }
}
