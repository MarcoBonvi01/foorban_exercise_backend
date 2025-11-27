import { Optional } from '@nestjs/common';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from '../interfaces';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  MinLength,
  Min,
  IsBoolean,
  IsDate,
  ValidateIf,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AgeMatchValidator } from '../validators/age.validator';

export class UpdateInfoRequest implements UpdateInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @ValidateIf((o: UpdateInfoRequest) => o.age >= 18)
  @IsBoolean()
  is_married: boolean;

  @Type(() => Date)
  @IsDate()
  @Validate(AgeMatchValidator)
  birth_date: Date;
}
