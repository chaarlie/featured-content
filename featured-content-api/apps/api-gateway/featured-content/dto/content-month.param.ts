import { IsString, Matches } from 'class-validator';

export class ContentMonthParam {
  @IsString({ message: 'Month must be a string.' })
  @Matches(/^(0[1-9]|1[0-2]|0?1)$/, {
    message:
      'Invalid month format. Please provide a zero-padded month (01 through 12).',
  })
  month: string;
}
