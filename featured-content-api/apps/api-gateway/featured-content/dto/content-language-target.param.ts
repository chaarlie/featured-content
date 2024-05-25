import { IsIn } from 'class-validator';

export class ContentLanguageTargetParam {
  @IsIn(['en', 'es', 'de'], {
    message: 'Invalid language. Use "en", "es", or "de".',
  })
  languageTarget: string;
}
