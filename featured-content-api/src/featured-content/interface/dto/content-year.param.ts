import { IsString, Matches } from 'class-validator';

export class ContentYearParam {
  @IsString({ message: 'Year must be a string.' })
  @Matches(/^[1-9]\d{3}$/, {
    message: 'Invalid year format. Please provide a four-digit year.',
  })
  year: string;
}
