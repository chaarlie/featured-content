import { IsString, Matches } from 'class-validator';

export class ContentDayParam {
  @IsString({ message: 'Month must be a string.' })
  @Matches(/^(0[1-9]|[1-2][0-9]|3[0-1])$/, {
    message:
      'Invalid day format. Please provide a zero-padded day (01 through 31).',
  })
  day: string;
}
