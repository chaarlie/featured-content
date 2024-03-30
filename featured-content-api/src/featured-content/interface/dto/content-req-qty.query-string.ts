import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class ContentReqQtyQueryString {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly qty: number;
}
