import { IsIn } from 'class-validator';

export class ContentLanguageTargetParam {
  @IsIn(['en', 'es', 'fr'], {
    message: 'Invalid language. Use "en", "es", or "fr".',
  })
  languageTarget: string;
}
