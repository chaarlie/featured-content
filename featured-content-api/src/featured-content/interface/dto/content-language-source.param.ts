import { IsIn } from 'class-validator';

export class ContentLanguageSourceParam {
  @IsIn(['en', 'es', 'fr'], {
    message: 'Invalid language. Use "en", "es", or "fr".',
  })
  languageSource: string;
}
