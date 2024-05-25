import { IsIn } from 'class-validator';

export class ContentLanguageSourceParam {
  @IsIn(['en'], {
    message: 'Invalid language. Use "en".',
  })
  languageSource: string;
}
