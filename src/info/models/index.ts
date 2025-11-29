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
  /*
    name: must be a string with a minimum length of 5 and a maximum length of 50
    age: number is a number between 0 and 150
    is_married: is an optional boolean -> if age is grather or equal to 18 must be a boolean otherwise is null
    birth_date: is a date
  */
  @IsNotEmpty()
  @IsString({ message: `Name inserted must be a string` })
  @MinLength(5, { message: `Name inserted must have at least 5 characters` })
  @MaxLength(50, { message: `Name inserted must have at most 50 characters` })
  name: string;

  @IsNotEmpty()
  @IsInt({ message: `Age inserted must be a number` })
  @Min(0, { message: `Age inserted must be greater than 0` })
  @Max(150, { message: `Age inserted must be less than 150` })
  age: number;

  // let's validate it only if age is grather or equal to 18
  @ValidateIf((o: UpdateInfoRequest) => o.age >= 18)
  @IsBoolean({ message: `Is married inserted must be a boolean` })
  is_married: boolean;

  @Type(() => Date)
  @IsDate({ message: `Birth date inserted must be a date` })
  @Validate(AgeMatchValidator) // apply custom validator to verify that age are conform to the birth date
  birth_date: Date;
}
